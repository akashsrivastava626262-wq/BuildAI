const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? ''

export class ApiError extends Error {
  status: number
  code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
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
    throw new ApiError(message, response.status, body?.error?.code)
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
  data: {
    id: string
    name: string
    email: string
  }
}

export interface AIFullPlanPayload {
  plotLength: number
  plotWidth: number
  projectType: string
  city?: string
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

export function generateFullPlan(payload: AIFullPlanPayload) {
  return request<AIFullPlanResponse>('/api/ai/public/full-plan', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function isApiConfigured() {
  return Boolean(API_BASE)
}
