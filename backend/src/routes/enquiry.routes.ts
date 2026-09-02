import { Router, Request, Response, NextFunction } from 'express'
import * as enquiryService from '../services/enquiry.service.js'
import * as emailService from '../services/email.service.js'
import { validateBody } from '../middleware/validate.js'
import { enquirySchema } from '../validators/schemas.js'

const router = Router()

// Public endpoint — no auth required
router.post(
  '/',
  validateBody(enquirySchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const enquiry = await enquiryService.createEnquiry(req.body)
      const emailSent = emailService.isEmailConfigured()
      res.status(201).json({
        success: true,
        data: enquiry,
        emailSent,
        message: emailSent
          ? 'Enquiry submitted successfully. Check your email for confirmation.'
          : 'Enquiry submitted successfully. We have saved your details and will contact you within 24 hours.',
      })
    } catch (err) {
      next(err)
    }
  },
)

export default router
