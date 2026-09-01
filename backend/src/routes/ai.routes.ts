import { Router, Request, Response, NextFunction } from 'express'
import rateLimit from 'express-rate-limit'
import * as aiService from '../services/ai.service.js'
import { authenticate } from '../middleware/auth.js'
import { validateBody } from '../middleware/validate.js'
import { aiGenerateSchema } from '../validators/schemas.js'

const router = Router()

const publicAiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { code: 'RATE_LIMIT', message: 'Too many AI requests. Try again later.' } },
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
