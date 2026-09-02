import { z } from 'zod'
import { UserRole, ProjectStatus, EnquiryStatus } from '@prisma/client'

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2),
  phone: z.string().optional(),
  role: z.enum([UserRole.HOMEOWNER, UserRole.CONTRACTOR]).optional(),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8),
})

export const createProjectSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  projectType: z.string().default('RESIDENTIAL'),
  plotLength: z.number().positive().optional(),
  plotWidth: z.number().positive().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
})

export const updateProjectSchema = createProjectSchema.partial().extend({
  status: z.nativeEnum(ProjectStatus).optional(),
})

export const createMaterialSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().positive(),
  unit: z.string().default('units'),
  unitPrice: z.number().positive().optional(),
  supplier: z.string().optional(),
  category: z.string().optional(),
})

export const enquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
})

export const paymentIntentSchema = z.object({
  amount: z.number().int().positive(),
  projectId: z.string().optional(),
  description: z.string().optional(),
})

export const aiGenerateSchema = z.object({
  plotLength: z.number().positive(),
  plotWidth: z.number().positive(),
  projectType: z.string().default('RESIDENTIAL'),
  description: z.string().optional(),
  city: z.string().optional(),
})

export const emailReportSchema = aiGenerateSchema.extend({
  email: z.string().email(),
  name: z.string().min(2).optional(),
  projectLabel: z.string().optional(),
  plotAreaSqFt: z.number().positive().optional(),
  apartmentCount: z.number().int().positive().optional(),
})

export const idParamSchema = z.object({
  id: z.string().min(1),
})

export const updateEnquiryStatusSchema = z.object({
  status: z.nativeEnum(EnquiryStatus),
})

export const updateUserRoleSchema = z.object({
  role: z.nativeEnum(UserRole),
})

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})
