import nodemailer from 'nodemailer'
import { config } from '../config/index.js'

// Nodemailer with SMTP — swap SMTP_* env vars for SendGrid, Mailgun, Gmail, etc.
let transporter: nodemailer.Transporter | null = null

function getTransporter(): nodemailer.Transporter | null {
  if (!config.email.host || !config.email.user) {
    console.warn('[EMAIL] SMTP not configured — emails will be logged to console')
    return null
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.secure,
      auth: { user: config.email.user, pass: config.email.pass },
    })
  }
  return transporter
}

async function sendMail(options: {
  to: string
  subject: string
  html: string
  text?: string
}): Promise<void> {
  const transport = getTransporter()
  const mailOptions = {
    from: config.email.from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text ?? options.html.replace(/<[^>]*>/g, ''),
  }

  if (!transport) {
    console.log('[EMAIL:DEV]', JSON.stringify(mailOptions, null, 2))
    return
  }

  await transport.sendMail(mailOptions)
}

export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  await sendMail({
    to,
    subject: 'Welcome to BuildFlow',
    html: `
      <h2>Welcome, ${name}!</h2>
      <p>Your BuildFlow account has been created. Start planning your dream home with AI-powered tools.</p>
      <p><a href="${config.frontendUrl}">Get Started →</a></p>
    `,
  })
}

export async function sendEnquiryNotification(data: {
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
}): Promise<void> {
  await sendMail({
    to: config.email.adminEmail,
    subject: `New Demo Request from ${data.name}`,
    html: `
      <h2>New Enquiry / Demo Request</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone ?? 'N/A'}</p>
      <p><strong>Company:</strong> ${data.company ?? 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message ?? 'No message'}</p>
    `,
  })
}

export async function sendEnquiryConfirmation(to: string, name: string): Promise<void> {
  await sendMail({
    to,
    subject: 'We received your BuildFlow demo request',
    html: `
      <h2>Thank you, ${name}!</h2>
      <p>We've received your demo request and will get back to you within 24 hours.</p>
      <p>— The BuildFlow Team</p>
    `,
  })
}

export async function sendPasswordResetEmail(
  to: string,
  name: string,
  resetUrl: string,
): Promise<void> {
  await sendMail({
    to,
    subject: 'Reset your BuildFlow password',
    html: `
      <h2>Password Reset</h2>
      <p>Hi ${name},</p>
      <p>Click the link below to reset your password (expires in 1 hour):</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
    `,
  })
}

export async function sendPaymentConfirmation(
  to: string,
  name: string,
  amount: number,
  currency: string,
): Promise<void> {
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100)

  await sendMail({
    to,
    subject: 'Payment confirmed — BuildFlow',
    html: `
      <h2>Payment Confirmed</h2>
      <p>Hi ${name},</p>
      <p>Your payment of <strong>${formatted}</strong> has been successfully processed.</p>
      <p>— The BuildFlow Team</p>
    `,
  })
}
