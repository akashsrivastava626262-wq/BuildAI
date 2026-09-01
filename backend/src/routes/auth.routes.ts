import { Router, Request, Response, NextFunction } from 'express'
import * as authService from '../services/auth.service.js'
import { validateBody } from '../middleware/validate.js'
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../validators/schemas.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

router.post(
  '/register',
  validateBody(registerSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.register(req.body)
      res.status(201).json({ success: true, data: result })
    } catch (err) {
      next(err)
    }
  },
)

router.post(
  '/login',
  validateBody(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.login(req.body.email, req.body.password)
      res.json({ success: true, data: result })
    } catch (err) {
      next(err)
    }
  },
)

router.post('/logout', (_req, res) => {
  // JWT is stateless — client discards token
  res.json({ success: true, message: 'Logged out successfully' })
})

router.get('/me', authenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await authService.getProfile(req.user!.id)
    res.json({ success: true, data: profile })
  } catch (err) {
    next(err)
  }
})

router.patch(
  '/me',
  authenticate,
  validateBody(updateProfileSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profile = await authService.updateProfile(req.user!.id, req.body)
      res.json({ success: true, data: profile })
    } catch (err) {
      next(err)
    }
  },
)

router.post(
  '/forgot-password',
  validateBody(forgotPasswordSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authService.requestPasswordReset(req.body.email)
      res.json({ success: true, message: 'If the email exists, a reset link has been sent' })
    } catch (err) {
      next(err)
    }
  },
)

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authService.resetPassword(req.body.token, req.body.password)
      res.json({ success: true, message: 'Password reset successfully' })
    } catch (err) {
      next(err)
    }
  },
)

export default router
