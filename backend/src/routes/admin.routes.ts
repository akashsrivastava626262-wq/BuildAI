import { Router, Request, Response, NextFunction } from 'express'
import { UserRole } from '@prisma/client'
import * as adminService from '../services/admin.service.js'
import * as enquiryService from '../services/enquiry.service.js'
import { authenticate, requireRoles, logAdminAction } from '../middleware/auth.js'
import { validateBody, validateParams, validateQuery } from '../middleware/validate.js'
import {
  idParamSchema,
  updateEnquiryStatusSchema,
  updateUserRoleSchema,
  paginationSchema,
} from '../validators/schemas.js'
import { prisma } from '../lib/prisma.js'

const router = Router()

router.use(authenticate, requireRoles(UserRole.ADMIN))

router.get('/dashboard', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const metrics = await adminService.getDashboardMetrics()
    res.json({ success: true, data: metrics })
  } catch (err) {
    next(err)
  }
})

router.get(
  '/users',
  validateQuery(paginationSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = req.query as unknown as { page: number; limit: number }
      const result = await adminService.getAllUsers(page, limit)
      res.json({ success: true, data: result })
    } catch (err) {
      next(err)
    }
  },
)

router.patch(
  '/users/:id/role',
  validateParams(idParamSchema),
  validateBody(updateUserRoleSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await adminService.updateUserRole(req.params.id as string, req.body.role)
      await logAdminAction(
        req.user!.id,
        'UPDATE_USER_ROLE',
        'User',
        req.params.id as string,
        { newRole: req.body.role },
        req.ip,
      )
      res.json({ success: true, data: user })
    } catch (err) {
      next(err)
    }
  },
)

router.get('/enquiries', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const enquiries = await enquiryService.getEnquiries()
    res.json({ success: true, data: enquiries })
  } catch (err) {
    next(err)
  }
})

router.patch(
  '/enquiries/:id/status',
  validateParams(idParamSchema),
  validateBody(updateEnquiryStatusSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const enquiry = await enquiryService.updateEnquiryStatus(req.params.id as string, req.body.status)
      await logAdminAction(
        req.user!.id,
        'UPDATE_ENQUIRY_STATUS',
        'Enquiry',
        req.params.id as string,
        { status: req.body.status },
        req.ip,
      )
      res.json({ success: true, data: enquiry })
    } catch (err) {
      next(err)
    }
  },
)

router.get('/payments', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        project: { select: { title: true } },
      },
    })
    res.json({ success: true, data: payments })
  } catch (err) {
    next(err)
  }
})

router.get(
  '/logs',
  validateQuery(paginationSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = req.query as unknown as { page: number; limit: number }
      const logs = await adminService.getAdminLogs(page, limit)
      res.json({ success: true, data: logs })
    } catch (err) {
      next(err)
    }
  },
)

export default router
