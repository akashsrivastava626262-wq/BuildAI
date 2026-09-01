/**
 * BuildFlow API Server
 *
 * Stack choice: Node.js + Express + TypeScript + Prisma + PostgreSQL
 *
 * Why Node/Express over FastAPI:
 * - Same language (TypeScript) as the React frontend — shared types possible
 * - Mature Stripe SDK and Nodemailer ecosystem
 * - Prisma provides type-safe PostgreSQL access with migrations
 * - Express is battle-tested for REST APIs with extensive middleware
 *
 * Why PostgreSQL over MongoDB:
 * - Strong relational integrity for users → projects → materials → payments
 * - ACID transactions for payment processing
 * - Complex queries for admin dashboard analytics
 */

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { config } from './config/index.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import * as paymentService from './services/payment.service.js'

import authRoutes from './routes/auth.routes.js'
import projectRoutes from './routes/project.routes.js'
import materialRoutes from './routes/material.routes.js'
import enquiryRoutes from './routes/enquiry.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import aiRoutes from './routes/ai.routes.js'
import adminRoutes from './routes/admin.routes.js'

const app = express()

// Security headers
app.use(helmet())

// CORS
app.use(
  cors({
    origin: [config.frontendUrl, 'http://localhost:5173', 'https://akashsrivastava626262-wq.github.io'],
    credentials: true,
  }),
)

// Logging
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'))

// Rate limiting on public endpoints
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { code: 'RATE_LIMIT', message: 'Too many requests' } },
})
app.use('/api/', limiter)

// Stripe webhook needs raw body — must be before express.json()
app.post(
  '/api/payments/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res, next) => {
    try {
      const signature = req.headers['stripe-signature'] as string
      const result = await paymentService.handleWebhook(req.body as Buffer, signature)
      res.json(result)
    } catch (err) {
      next(err)
    }
  },
)

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      service: 'buildflow-api',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    },
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/projects/:projectId/materials', materialRoutes)
app.use('/api/enquiries', enquiryRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/admin', adminRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
