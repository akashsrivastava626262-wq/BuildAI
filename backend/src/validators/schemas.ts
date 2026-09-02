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

export const constructionEstimateSchema = z.object({
  plotLengthFt: z.number().positive().optional(),
  plotBreadthFt: z.number().positive().optional(),
  builtUpAreaPerFloorSqFt: z.number().positive().optional(),
  numberOfFloors: z.number().int().positive().optional(),
  floorHeightFt: z.number().positive().optional(),
  foundationType: z.enum(['isolated_footing', 'strip_footing', 'raft']).optional(),
  foundationDepthFt: z.number().positive().optional(),
  footingLengthFt: z.number().positive().optional(),
  footingWidthFt: z.number().positive().optional(),
  columnCount: z.number().int().positive().optional(),
  columnSizeInches: z.number().positive().optional(),
  stripFootingWidthFt: z.number().positive().optional(),
  raftThicknessMm: z.number().positive().optional(),
  slabThicknessMm: z.number().positive().optional(),
  beamLengthPerFloorFt: z.number().positive().optional(),
  beamWidthInches: z.number().positive().optional(),
  beamDepthInches: z.number().positive().optional(),
  totalMasonryWallAreaSqFt: z.number().positive().optional(),
  wallThicknessInches: z.union([z.literal(4.5), z.literal(9)]).optional(),
  plasterThicknessMm: z.number().positive().optional(),
  concreteGradeFoundation: z.enum(['M20', 'M25']).optional(),
  concreteGradeStructure: z.enum(['M20', 'M25']).optional(),
  numberOfBathrooms: z.number().int().positive().optional(),
  finishingLevel: z.enum(['basic', 'standard', 'premium']).optional(),
  city: z.string().min(2).optional(),
  pccThicknessMm: z.number().positive().optional(),
  projectType: z.string().optional(),
  description: z.string().optional(),
  apartmentCount: z.number().int().positive().optional(),
})

export const aiGenerateSchema = constructionEstimateSchema.extend({
  plotLength: z.number().positive().optional(),
  plotWidth: z.number().positive().optional(),
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
