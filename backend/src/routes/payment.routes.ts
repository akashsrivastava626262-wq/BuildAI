import { Router, Request, Response, NextFunction } from 'express'
import * as paymentService from '../services/payment.service.js'
import { authenticate } from '../middleware/auth.js'
import { validateBody } from '../middleware/validate.js'
import { paymentIntentSchema } from '../validators/schemas.js'

const router = Router()

router.post(
  '/create-intent',
  authenticate,
  validateBody(paymentIntentSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await paymentService.createPaymentIntent(
        req.user!.id,
        req.body.amount,
        req.body.projectId,
        req.body.description,
      )
      res.json({ success: true, data: result })
    } catch (err) {
      next(err)
    }
  },
)

router.post(
  '/create-checkout',
  authenticate,
  validateBody(paymentIntentSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await paymentService.createCheckoutSession(
        req.user!.id,
        req.body.amount,
        req.body.projectId,
        req.body.description,
      )
      res.json({ success: true, data: result })
    } catch (err) {
      next(err)
    }
  },
)

router.get(
  '/history',
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payments = await paymentService.getPaymentHistory(req.user!.id)
      res.json({ success: true, data: payments })
    } catch (err) {
      next(err)
    }
  },
)

export default router
