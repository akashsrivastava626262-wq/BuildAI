import { config } from '../config/index.js'
import { NotFoundError } from '../utils/errors.js'

/**
 * AI Service — Integration point for OpenAI, Claude, or specialized construction APIs.
 *
 * Replace `generateWithAI` with real API calls when keys are configured.
 * Current implementation returns realistic mock data showing the integration pattern.
 */

interface FloorPlanInput {
  plotLength: number
  plotWidth: number
  projectType: string
  description?: string
}

interface BudgetInput extends FloorPlanInput {
  city?: string
}

export interface AIFloorPlanResult {
  rooms: Array<{ name: string; area: number; dimensions: string }>
  totalArea: number
  svgLayout: string
  generatedAt: string
  model: string
  source: 'mock' | 'openai' | 'claude'
}

export interface AIBudgetResult {
  totalEstimate: number
  currency: string
  breakdown: Array<{ category: string; amount: number; percentage: number }>
  materials: Array<{ name: string; quantity: number; unit: string; estimatedCost: number }>
  generatedAt: string
  model: string
  source: 'mock' | 'openai' | 'claude'
}

export interface AITimelineResult {
  totalWeeks: number
  phases: Array<{ name: string; weeks: number; status: string }>
  generatedAt: string
  model: string
  source: 'mock' | 'openai' | 'claude'
}

async function generateWithAI(prompt: string): Promise<string | null> {
  if (!config.ai.apiKey) return null

  // INTEGRATION POINT: Uncomment and configure for real OpenAI/Claude calls
  /*
  const response = await fetch(`${config.ai.apiUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.ai.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: config.ai.model,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    }),
  })
  const data = await response.json()
  return data.choices[0].message.content
  */

  console.log('[AI] Would call API with prompt:', prompt.slice(0, 100) + '...')
  return null
}

export async function generateFloorPlan(input: FloorPlanInput): Promise<AIFloorPlanResult> {
  const area = input.plotLength * input.plotWidth
  const aiResponse = await generateWithAI(
    `Generate a floor plan JSON for a ${input.projectType} building on a ${input.plotLength}m x ${input.plotWidth}m plot.`,
  )

  if (aiResponse) {
    // Parse real AI response here
    return JSON.parse(aiResponse) as AIFloorPlanResult
  }

  // Mock response — realistic structure for frontend consumption
  return {
    rooms: [
      { name: 'Living Room', area: area * 0.25, dimensions: `${(input.plotLength * 0.5).toFixed(1)}m × ${(input.plotWidth * 0.5).toFixed(1)}m` },
      { name: 'Master Bedroom', area: area * 0.2, dimensions: `${(input.plotLength * 0.4).toFixed(1)}m × ${(input.plotWidth * 0.5).toFixed(1)}m` },
      { name: 'Bedroom 2', area: area * 0.15, dimensions: `${(input.plotLength * 0.35).toFixed(1)}m × ${(input.plotWidth * 0.43).toFixed(1)}m` },
      { name: 'Kitchen', area: area * 0.12, dimensions: `${(input.plotLength * 0.3).toFixed(1)}m × ${(input.plotWidth * 0.4).toFixed(1)}m` },
      { name: 'Bathroom', area: area * 0.08, dimensions: `${(input.plotLength * 0.2).toFixed(1)}m × ${(input.plotWidth * 0.4).toFixed(1)}m` },
    ],
    totalArea: area,
    svgLayout: `<svg viewBox="0 0 100 80"><rect x="2" y="2" width="96" height="76" fill="none" stroke="#3b82f6" stroke-width="1.5"/><line x1="50" y1="2" x2="50" y2="78" stroke="#3b82f6"/><line x1="2" y1="40" x2="50" y2="40" stroke="#3b82f6"/></svg>`,
    generatedAt: new Date().toISOString(),
    model: config.ai.model,
    source: 'mock',
  }
}

export async function generateBudget(input: BudgetInput): Promise<AIBudgetResult> {
  const area = input.plotLength * input.plotWidth
  const costPerSqM = input.projectType === 'COMMERCIAL' ? 35000 : 28000
  const total = Math.round(area * costPerSqM)

  const aiResponse = await generateWithAI(
    `Generate a construction budget breakdown for a ${input.projectType} project, ${area} sqm, in ${input.city ?? 'India'}.`,
  )

  if (aiResponse) {
    return JSON.parse(aiResponse) as AIBudgetResult
  }

  const breakdown = [
    { category: 'Structure & Foundation', amount: Math.round(total * 0.35), percentage: 35 },
    { category: 'Materials', amount: Math.round(total * 0.30), percentage: 30 },
    { category: 'Labour', amount: Math.round(total * 0.20), percentage: 20 },
    { category: 'Finishing & Interiors', amount: Math.round(total * 0.10), percentage: 10 },
    { category: 'Permits & Misc', amount: Math.round(total * 0.05), percentage: 5 },
  ]

  return {
    totalEstimate: total,
    currency: 'INR',
    breakdown,
    materials: [
      { name: 'Cement (50kg bags)', quantity: Math.round(area * 8), unit: 'bags', estimatedCost: Math.round(area * 8 * 380) },
      { name: 'TMT Steel', quantity: parseFloat((area * 0.12).toFixed(1)), unit: 'tons', estimatedCost: Math.round(area * 0.12 * 62000) },
      { name: 'Red Bricks', quantity: parseFloat((area * 0.8).toFixed(1)), unit: 'thousands', estimatedCost: Math.round(area * 0.8 * 8500) },
      { name: 'Sand', quantity: Math.round(area * 2), unit: 'trucks', estimatedCost: Math.round(area * 2 * 4500) },
    ],
    generatedAt: new Date().toISOString(),
    model: config.ai.model,
    source: 'mock',
  }
}

export async function generateTimeline(input: FloorPlanInput): Promise<AITimelineResult> {
  const area = input.plotLength * input.plotWidth
  const baseWeeks = area > 150 ? 24 : area > 100 ? 20 : 16

  return {
    totalWeeks: baseWeeks,
    phases: [
      { name: 'Planning & Permits', weeks: 2, status: 'pending' },
      { name: 'Foundation', weeks: 3, status: 'pending' },
      { name: 'Structure', weeks: Math.round(baseWeeks * 0.35), status: 'pending' },
      { name: 'Roofing', weeks: 2, status: 'pending' },
      { name: 'Electrical & Plumbing', weeks: 3, status: 'pending' },
      { name: 'Interiors & Finishing', weeks: Math.round(baseWeeks * 0.25), status: 'pending' },
      { name: 'Final Inspection', weeks: 1, status: 'pending' },
    ],
    generatedAt: new Date().toISOString(),
    model: config.ai.model,
    source: 'mock',
  }
}

export async function generateFullPlan(input: FloorPlanInput & { city?: string }) {
  const [floorPlan, budget, timeline] = await Promise.all([
    generateFloorPlan(input),
    generateBudget(input),
    generateTimeline(input),
  ])
  return { floorPlan, budget, timeline }
}
