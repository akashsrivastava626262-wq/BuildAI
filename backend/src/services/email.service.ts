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

export async function sendAIReportEmail(
  to: string,
  name: string,
  data: {
    projectLabel?: string
    plotAreaSqFt?: number
    apartmentCount?: number
    floorPlan: {
      rooms: Array<{ name: string; area: number; dimensions: string }>
      totalArea: number
    }
    budget: {
      totalEstimate: number
      currency: string
      breakdown: Array<{ category: string; amount: number; percentage: number }>
    }
    timeline: {
      totalWeeks: number
      phases: Array<{ name: string; weeks: number }>
    }
  },
): Promise<void> {
  const roomRows = data.floorPlan.rooms
    .map(
      (room) =>
        `<tr><td style="padding:8px;border:1px solid #ddd;">${room.name}</td><td style="padding:8px;border:1px solid #ddd;">${room.dimensions}</td><td style="padding:8px;border:1px solid #ddd;">${room.area.toFixed(1)} sq.m</td></tr>`,
    )
    .join('')

  const budgetRows = data.budget.breakdown
    .map(
      (item) =>
        `<tr><td style="padding:8px;border:1px solid #ddd;">${item.category}</td><td style="padding:8px;border:1px solid #ddd;">₹${item.amount.toLocaleString('en-IN')}</td><td style="padding:8px;border:1px solid #ddd;">${item.percentage}%</td></tr>`,
    )
    .join('')

  const phaseRows = data.timeline.phases
    .map(
      (phase) =>
        `<tr><td style="padding:8px;border:1px solid #ddd;">${phase.name}</td><td style="padding:8px;border:1px solid #ddd;">${phase.weeks} weeks</td></tr>`,
    )
    .join('')

  const summary = [
    data.projectLabel ? `<p><strong>Project:</strong> ${data.projectLabel}</p>` : '',
    data.plotAreaSqFt
      ? `<p><strong>Plot area:</strong> ${data.plotAreaSqFt.toLocaleString('en-IN')} sq.ft</p>`
      : '',
    data.apartmentCount
      ? `<p><strong>Apartments:</strong> ${data.apartmentCount}</p>`
      : '',
  ].join('')

  await sendMail({
    to,
    subject: 'Your BuildFlow AI Construction Report',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#111;">
        <h2>Your BuildFlow AI Report</h2>
        <p>Hi ${name},</p>
        <p>Thank you for using BuildFlow. Here is your AI-generated construction intelligence report.</p>
        ${summary}
        <h3>Floor Plan Summary</h3>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr style="background:#f5f5f5;"><th style="padding:8px;border:1px solid #ddd;text-align:left;">Room</th><th style="padding:8px;border:1px solid #ddd;text-align:left;">Dimensions</th><th style="padding:8px;border:1px solid #ddd;text-align:left;">Area</th></tr>
          ${roomRows}
        </table>
        <h3>Budget Estimate — ₹${data.budget.totalEstimate.toLocaleString('en-IN')}</h3>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr style="background:#f5f5f5;"><th style="padding:8px;border:1px solid #ddd;text-align:left;">Category</th><th style="padding:8px;border:1px solid #ddd;text-align:left;">Amount</th><th style="padding:8px;border:1px solid #ddd;text-align:left;">Share</th></tr>
          ${budgetRows}
        </table>
        <h3>Project Timeline — ${data.timeline.totalWeeks} weeks</h3>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr style="background:#f5f5f5;"><th style="padding:8px;border:1px solid #ddd;text-align:left;">Phase</th><th style="padding:8px;border:1px solid #ddd;text-align:left;">Duration</th></tr>
          ${phaseRows}
        </table>
        <p>Want a detailed consultation? Reply to this email or book a demo on our website.</p>
        <p>— The BuildFlow Team</p>
      </div>
    `,
  })

  await sendMail({
    to: config.email.adminEmail,
    subject: `AI Report requested by ${name}`,
    html: `
      <h2>AI Report Email Sent</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${to}</p>
      ${summary}
      <p><strong>Estimated budget:</strong> ₹${data.budget.totalEstimate.toLocaleString('en-IN')}</p>
      <p><strong>Timeline:</strong> ${data.timeline.totalWeeks} weeks</p>
    `,
  })
}

export function isEmailConfigured(): boolean {
  return Boolean(config.email.host && config.email.user && config.email.pass)
}
