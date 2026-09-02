const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? ''

export interface MissingField {
  field: string
  label: string
  reason: string
}

export class ApiError extends Error {
  status: number
  code?: string
  missingFields?: MissingField[]

  constructor(message: string, status: number, code?: string, missingFields?: MissingField[]) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.missingFields = missingFields
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = API_BASE ? `${API_BASE}${path}` : path

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  const body = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message =
      body?.error?.message ?? body?.message ?? `Request failed (${response.status})`
    throw new ApiError(
      message,
      response.status,
      body?.error?.code,
      body?.error?.missingFields,
    )
  }

  return body as T
}

export interface EnquiryPayload {
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
}

export interface EnquiryResponse {
  success: boolean
  message: string
  emailSent?: boolean
  data: {
    id: string
    name: string
    email: string
  }
}

export type ConstructionEstimatePayload = {
  plotLengthFt?: number
  plotBreadthFt?: number
  builtUpAreaPerFloorSqFt?: number
  numberOfFloors?: number
  floorHeightFt?: number
  foundationType?: 'isolated_footing' | 'strip_footing' | 'raft'
  foundationDepthFt?: number
  footingLengthFt?: number
  footingWidthFt?: number
  columnCount?: number
  columnSizeInches?: number
  stripFootingWidthFt?: number
  raftThicknessMm?: number
  slabThicknessMm?: number
  beamLengthPerFloorFt?: number
  beamWidthInches?: number
  beamDepthInches?: number
  totalMasonryWallAreaSqFt?: number
  wallThicknessInches?: 4.5 | 9
  plasterThicknessMm?: number
  concreteGradeFoundation?: 'M20' | 'M25'
  concreteGradeStructure?: 'M20' | 'M25'
  numberOfBathrooms?: number
  finishingLevel?: 'basic' | 'standard' | 'premium'
  city?: string
  projectLabel?: string
  projectType?: string
  apartmentCount?: number
}

export interface EstimateLineItem {
  component: string
  material: string
  formula: string
  quantity: number
  unit: string
  unitRate: number
  amount: number
}

export interface AIFullPlanResult {
  floorPlan: {
    rooms: Array<{ name: string; area: number; dimensions: string }>
    totalArea: number
    svgLayout: string
  }
  budget: {
    totalEstimate: number
    currency: string
    breakdown: Array<{ category: string; amount: number; percentage: number }>
    materials: Array<{ name: string; quantity: number; unit: string; estimatedCost: number }>
    estimate?: {
      lineItems: EstimateLineItem[]
      materialQuantities: {
        cementBags: number
        sandCum: number
        aggregateCum: number
        steelKg: number
        bricks: number
      }
      summary: {
        materialCost: number
        laborCost: number
        finishingCost: number
        totalBuiltUpAreaSqFt: number
        costPerSqFt: number
      }
      methodology: string[]
      demoAssumptions?: string[]
      cityTier: string
      city: string
    }
  }
  timeline: {
    totalWeeks: number
    phases: Array<{ name: string; weeks: number; status: string }>
  }
}

export interface AIFullPlanResponse {
  success: boolean
  data: AIFullPlanResult
}

export function submitEnquiry(payload: EnquiryPayload) {
  return request<EnquiryResponse>('/api/enquiries', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function generateFullPlan(payload: ConstructionEstimatePayload) {
  return request<AIFullPlanResponse>('/api/ai/public/full-plan', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export interface EmailReportPayload extends ConstructionEstimatePayload {
  email: string
  name?: string
  projectLabel?: string
  plotAreaSqFt?: number
}

export interface EmailReportResponse {
  success: boolean
  message: string
}

export function emailAIReport(payload: EmailReportPayload) {
  return request<EmailReportResponse>('/api/ai/public/email-report', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function isApiConfigured() {
  return Boolean(API_BASE)
}
