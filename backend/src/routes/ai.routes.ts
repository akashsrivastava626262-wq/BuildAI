import { Router, Request, Response, NextFunction } from 'express'
import rateLimit from 'express-rate-limit'
import * as aiService from '../services/ai.service.js'
import * as emailService from '../services/email.service.js'
import { authenticate } from '../middleware/auth.js'
import { validateBody } from '../middleware/validate.js'
import { aiGenerateSchema, emailReportSchema } from '../validators/schemas.js'
import { AppError } from '../utils/errors.js'

const router = Router()

const publicAiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { code: 'RATE_LIMIT', message: 'Too many AI requests. Try again later.' } },
})

router.get('/public/required-fields', (_req: Request, res: Response) => {
  res.json({ success: true, data: aiService.getRequiredFieldsDocumentation() })
})

// Public demo endpoint for the landing page — no auth required
router.post(
  '/public/full-plan',
  publicAiLimiter,
  validateBody(aiGenerateSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await aiService.generateFullPlan(req.body)
      res.json({ success: true, data: result })
    } catch (err) {
      next(err)
    }
  },
)

router.post(
  '/public/email-report',
  publicAiLimiter,
  validateBody(emailReportSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!emailService.isEmailConfigured()) {
        throw new AppError(
          503,
          'Email service is not configured yet. Your report was generated but cannot be emailed. Please contact us directly.',
          'EMAIL_NOT_CONFIGURED',
        )
      }

      const { email, name, projectLabel, plotAreaSqFt, apartmentCount, ...planInput } = req.body
      const plan = await aiService.generateFullPlan(planInput)

      await emailService.sendAIReportEmail(email, name ?? 'Customer', {
        projectLabel,
        plotAreaSqFt,
        apartmentCount,
        floorPlan: plan.floorPlan,
        budget: plan.budget,
        timeline: plan.timeline,
      })

      res.json({
        success: true,
        message: `Your AI construction report has been sent to ${email}.`,
      })
    } catch (err) {
      next(err)
    }
  },
)

router.post(
  '/floor-plan',
  authenticate,
  validateBody(aiGenerateSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await aiService.generateFloorPlan(req.body)
      res.json({ success: true, data: result })
    } catch (err) {
      next(err)
    }
  },
)

router.post(
  '/budget',
  authenticate,
  validateBody(aiGenerateSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await aiService.generateBudget(req.body)
      res.json({ success: true, data: result })
    } catch (err) {
      next(err)
    }
  },
)

router.post(
  '/timeline',
  authenticate,
  validateBody(aiGenerateSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await aiService.generateTimeline(req.body)
      res.json({ success: true, data: result })
    } catch (err) {
      next(err)
    }
  },
)

router.post(
  '/full-plan',
  authenticate,
  validateBody(aiGenerateSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await aiService.generateFullPlan(req.body)
      res.json({ success: true, data: result })
    } catch (err) {
      next(err)
    }
  },
)

export default router
