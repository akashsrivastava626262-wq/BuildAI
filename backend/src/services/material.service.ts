import { prisma } from '../lib/prisma.js'
import { ForbiddenError, NotFoundError } from '../utils/errors.js'
import { UserRole } from '@prisma/client'

export async function addMaterial(
  projectId: string,
  userId: string,
  role: UserRole,
  data: {
    name: string
    quantity: number
    unit?: string
    unitPrice?: number
    supplier?: string
    category?: string
  },
) {
  const project = await prisma.project.findUnique({ where: { id: projectId } })
  if (!project) throw new NotFoundError('Project not found')
  if (role !== UserRole.ADMIN && project.userId !== userId) {
    throw new ForbiddenError('Access denied')
  }

  return prisma.material.create({ data: { ...data, projectId } })
}

export async function getMaterials(projectId: string, userId: string, role: UserRole) {
  const project = await prisma.project.findUnique({ where: { id: projectId } })
  if (!project) throw new NotFoundError('Project not found')
  if (role !== UserRole.ADMIN && project.userId !== userId) {
    throw new ForbiddenError('Access denied')
  }
  return prisma.material.findMany({ where: { projectId }, orderBy: { createdAt: 'desc' } })
}

export async function updateMaterial(
  id: string,
  userId: string,
  role: UserRole,
  data: Partial<{
    name: string
    quantity: number
    unit: string
    unitPrice: number
    supplier: string
    category: string
  }>,
) {
  const material = await prisma.material.findUnique({
    where: { id },
    include: { project: true },
  })
  if (!material) throw new NotFoundError('Material not found')
  if (role !== UserRole.ADMIN && material.project.userId !== userId) {
    throw new ForbiddenError('Access denied')
  }
  return prisma.material.update({ where: { id }, data })
}

export async function deleteMaterial(id: string, userId: string, role: UserRole) {
  const material = await prisma.material.findUnique({
    where: { id },
    include: { project: true },
  })
  if (!material) throw new NotFoundError('Material not found')
  if (role !== UserRole.ADMIN && material.project.userId !== userId) {
    throw new ForbiddenError('Access denied')
  }
  await prisma.material.delete({ where: { id } })
}
