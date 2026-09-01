import { EnquiryStatus } from '@prisma/client'
import { prisma } from '../lib/prisma.js'
import { NotFoundError } from '../utils/errors.js'
import * as emailService from './email.service.js'

export async function createEnquiry(data: {
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
}) {
  const enquiry = await prisma.enquiry.create({ data })

  await Promise.all([
    emailService.sendEnquiryNotification(data),
    emailService.sendEnquiryConfirmation(data.email, data.name),
  ]).catch(console.error)

  return enquiry
}

export async function getEnquiries(status?: EnquiryStatus) {
  return prisma.enquiry.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: 'desc' },
  })
}

export async function getEnquiryById(id: string) {
  const enquiry = await prisma.enquiry.findUnique({ where: { id } })
  if (!enquiry) throw new NotFoundError('Enquiry not found')
  return enquiry
}

export async function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  await getEnquiryById(id)
  return prisma.enquiry.update({ where: { id }, data: { status } })
}
