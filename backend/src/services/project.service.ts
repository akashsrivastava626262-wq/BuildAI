import { ProjectStatus, UserRole } from '@prisma/client'
import { prisma } from '../lib/prisma.js'
import { ForbiddenError, NotFoundError } from '../utils/errors.js'
import * as aiService from './ai.service.js'

export async function createProject(
  userId: string,
  data: {
    title: string
    description?: string
    projectType?: string
    plotLength?: number
    plotWidth?: number
    address?: string
    city?: string
  },
) {
  return prisma.project.create({
    data: { ...data, userId, status: ProjectStatus.DRAFT },
    include: { materials: true },
  })
}

export async function getProjects(userId: string, role: UserRole) {
  if (role === UserRole.ADMIN) {
    return prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true } },
        _count: { select: { materials: true } },
      },
    })
  }
  return prisma.project.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { materials: true } } },
  })
}

export async function getProjectById(id: string, userId: string, role: UserRole) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: { materials: true, user: { select: { id: true, name: true, email: true } } },
  })
  if (!project) throw new NotFoundError('Project not found')
  if (role !== UserRole.ADMIN && project.userId !== userId) {
    throw new ForbiddenError('Access denied')
  }
  return project
}

export async function updateProject(
  id: string,
  userId: string,
  role: UserRole,
  data: Partial<{
    title: string
    description: string
    projectType: string
    status: ProjectStatus
    plotLength: number
    plotWidth: number
    address: string
    city: string
  }>,
) {
  await getProjectById(id, userId, role)
  return prisma.project.update({
    where: { id },
    data,
    include: { materials: true },
  })
}

export async function deleteProject(id: string, userId: string, role: UserRole) {
  await getProjectById(id, userId, role)
  await prisma.project.delete({ where: { id } })
}

export async function runAIGeneration(projectId: string, userId: string, role: UserRole) {
  const project = await getProjectById(projectId, userId, role)

  if (!project.plotLength || !project.plotWidth) {
    throw new ForbiddenError('Plot dimensions required for AI generation')
  }

  const result = await aiService.generateFullPlan({
    plotLength: project.plotLength,
    plotWidth: project.plotWidth,
    projectType: project.projectType,
    description: project.description ?? undefined,
    city: project.city ?? undefined,
  })

  const updated = await prisma.project.update({
    where: { id: projectId },
    data: {
      aiFloorPlan: result.floorPlan as object,
      aiBudget: result.budget as object,
      aiTimeline: result.timeline as object,
      aiMaterials: result.budget.materials as object,
      status: ProjectStatus.PLANNING,
    },
    include: { materials: true },
  })

  // Auto-populate materials from AI budget
  if (result.budget.materials.length > 0) {
    await prisma.material.deleteMany({ where: { projectId } })
    await prisma.material.createMany({
      data: result.budget.materials.map((m) => ({
        projectId,
        name: m.name,
        quantity: m.quantity,
        unit: m.unit,
        unitPrice: m.estimatedCost / m.quantity,
        category: 'AI Generated',
      })),
    })
  }

  return prisma.project.findUnique({
    where: { id: projectId },
    include: { materials: true },
  })
}
