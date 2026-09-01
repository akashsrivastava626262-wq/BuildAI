import Stripe from 'stripe'
import { PaymentStatus } from '@prisma/client'
import { config } from '../config/index.js'
import { prisma } from '../lib/prisma.js'
import { AppError, NotFoundError } from '../utils/errors.js'
import * as emailService from './email.service.js'

let stripe: Stripe | null = null

function getStripe(): Stripe {
  if (!config.stripe.secretKey) {
    throw new AppError(503, 'Payment processing is not configured', 'STRIPE_NOT_CONFIGURED')
  }
  if (!stripe) {
    stripe = new Stripe(config.stripe.secretKey)
  }
  return stripe
}

export async function createPaymentIntent(
  userId: string,
  amount: number,
  projectId?: string,
  description?: string,
) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new NotFoundError('User not found')

  const payment = await prisma.payment.create({
    data: {
      userId,
      projectId,
      amount,
      currency: config.stripe.currency,
      status: PaymentStatus.PENDING,
      description,
    },
  })

  try {
    const stripeClient = getStripe()
    const intent = await stripeClient.paymentIntents.create({
      amount,
      currency: config.stripe.currency,
      metadata: { paymentId: payment.id, userId, projectId: projectId ?? '' },
      description: description ?? 'BuildFlow payment',
    })

    await prisma.payment.update({
      where: { id: payment.id },
      data: { stripePaymentIntentId: intent.id, status: PaymentStatus.PROCESSING },
    })

    return {
      paymentId: payment.id,
      clientSecret: intent.client_secret,
      amount,
      currency: config.stripe.currency,
    }
  } catch (err) {
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: PaymentStatus.FAILED },
    })
    throw err
  }
}

export async function createCheckoutSession(
  userId: string,
  amount: number,
  projectId?: string,
  description?: string,
) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new NotFoundError('User not found')

  const payment = await prisma.payment.create({
    data: {
      userId,
      projectId,
      amount,
      currency: config.stripe.currency,
      status: PaymentStatus.PENDING,
      description,
    },
  })

  const stripeClient = getStripe()
  const session = await stripeClient.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: config.stripe.currency,
          product_data: { name: description ?? 'BuildFlow Service' },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    success_url: `${config.frontendUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.frontendUrl}/payment/cancel`,
    metadata: { paymentId: payment.id, userId },
    customer_email: user.email,
  })

  await prisma.payment.update({
    where: { id: payment.id },
    data: { stripeSessionId: session.id, status: PaymentStatus.PROCESSING },
  })

  return { sessionId: session.id, url: session.url, paymentId: payment.id }
}

export async function handleWebhook(rawBody: Buffer, signature: string) {
  if (!config.stripe.webhookSecret) {
    throw new AppError(503, 'Webhook secret not configured', 'WEBHOOK_NOT_CONFIGURED')
  }

  const stripeClient = getStripe()
  const event = stripeClient.webhooks.constructEvent(
    rawBody,
    signature,
    config.stripe.webhookSecret,
  )

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const intent = event.data.object as Stripe.PaymentIntent
      await handlePaymentSuccess(intent.metadata.paymentId, intent.id)
      break
    }
    case 'payment_intent.payment_failed': {
      const intent = event.data.object as Stripe.PaymentIntent
      await handlePaymentFailure(intent.metadata.paymentId)
      break
    }
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      await handlePaymentSuccess(session.metadata?.paymentId ?? '', session.id)
      break
    }
  }

  return { received: true }
}

async function handlePaymentSuccess(paymentId: string, stripeRef: string) {
  if (!paymentId) return

  const payment = await prisma.payment.update({
    where: { id: paymentId },
    data: { status: PaymentStatus.SUCCEEDED, stripePaymentIntentId: stripeRef },
    include: { user: true },
  })

  await emailService
    .sendPaymentConfirmation(
      payment.user.email,
      payment.user.name,
      payment.amount,
      payment.currency,
    )
    .catch(console.error)
}

async function handlePaymentFailure(paymentId: string) {
  if (!paymentId) return
  await prisma.payment.update({
    where: { id: paymentId },
    data: { status: PaymentStatus.FAILED },
  })
}

export async function getPaymentHistory(userId: string) {
  return prisma.payment.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: { project: { select: { id: true, title: true } } },
  })
}
