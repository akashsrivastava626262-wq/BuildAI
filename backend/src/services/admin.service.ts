import { UserRole } from '@prisma/client'
import { prisma } from '../lib/prisma.js'
import { NotFoundError } from '../utils/errors.js'

export async function getDashboardMetrics() {
  const [users, projects, enquiries, payments, recentLogs] = await Promise.all([
    prisma.user.groupBy({ by: ['role'], _count: true }),
    prisma.project.groupBy({ by: ['status'], _count: true }),
    prisma.enquiry.groupBy({ by: ['status'], _count: true }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      _count: true,
      where: { status: 'SUCCEEDED' },
    }),
    prisma.adminLog.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      include: { admin: { select: { name: true, email: true } } },
    }),
  ])

  return {
    users: {
      total: users.reduce((s, u) => s + u._count, 0),
      byRole: users,
    },
    projects: {
      total: projects.reduce((s, p) => s + p._count, 0),
      byStatus: projects,
    },
    enquiries: {
      total: enquiries.reduce((s, e) => s + e._count, 0),
      byStatus: enquiries,
    },
    payments: {
      totalTransactions: payments._count,
      totalRevenue: payments._sum.amount ?? 0,
    },
    recentAdminLogs: recentLogs,
  }
}

export async function getAllUsers(page = 1, limit = 20) {
  const skip = (page - 1) * limit
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        isVerified: true,
        createdAt: true,
        _count: { select: { projects: true } },
      },
    }),
    prisma.user.count(),
  ])
  return { users, total, page, limit, pages: Math.ceil(total / limit) }
}

export async function updateUserRole(userId: string, role: UserRole) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new NotFoundError('User not found')
  return prisma.user.update({
    where: { id: userId },
    data: { role },
    select: { id: true, email: true, name: true, role: true },
  })
}

export async function getAdminLogs(page = 1, limit = 50) {
  const skip = (page - 1) * limit
  const [logs, total] = await Promise.all([
    prisma.adminLog.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { admin: { select: { name: true, email: true } } },
    }),
    prisma.adminLog.count(),
  ])
  return { logs, total, page, limit }
}
