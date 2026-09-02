import { config } from '../config/index.js'
import {
  calculateConstructionEstimate,
  getRequiredFieldsDocumentation,
  type ConstructionEstimateInput,
  type ConstructionEstimateResult,
} from './construction-estimator.service.js'
import { fillDemoDefaults, validateDemoInputs } from './demo-defaults.js'

const FEET_PER_METER = 3.28084

interface FloorPlanInput {
  plotLengthFt?: number
  plotBreadthFt?: number
  plotLength?: number
  plotWidth?: number
  builtUpAreaPerFloorSqFt?: number
  projectType?: string
  description?: string
}

export interface AIFloorPlanResult {
  rooms: Array<{ name: string; area: number; dimensions: string }>
  totalArea: number
  svgLayout: string
  generatedAt: string
  model: string
  source: 'engineering_formulas' | 'openai' | 'claude'
}

export interface AIBudgetResult {
  totalEstimate: number
  currency: string
  breakdown: Array<{ category: string; amount: number; percentage: number }>
  materials: Array<{ name: string; quantity: number; unit: string; estimatedCost: number }>
  estimate?: ConstructionEstimateResult
  generatedAt: string
  model: string
  source: 'engineering_formulas' | 'openai' | 'claude'
}

export interface AITimelineResult {
  totalWeeks: number
  phases: Array<{ name: string; weeks: number; status: string }>
  generatedAt: string
  model: string
  source: 'engineering_formulas' | 'openai' | 'claude'
}

export { getRequiredFieldsDocumentation }

function toEstimateInput(input: FloorPlanInput & Record<string, unknown>): ConstructionEstimateInput {
  const plotLengthFt =
    input.plotLengthFt ??
    (input.plotLength ? input.plotLength * FEET_PER_METER : undefined)
  const plotBreadthFt =
    input.plotBreadthFt ??
    (input.plotWidth ? input.plotWidth * FEET_PER_METER : undefined)

  return {
    plotLengthFt: plotLengthFt!,
    plotBreadthFt: plotBreadthFt!,
    builtUpAreaPerFloorSqFt: input.builtUpAreaPerFloorSqFt as number,
    numberOfFloors: input.numberOfFloors as number,
    floorHeightFt: input.floorHeightFt as number,
    foundationType: input.foundationType as ConstructionEstimateInput['foundationType'],
    foundationDepthFt: input.foundationDepthFt as number,
    footingLengthFt: input.footingLengthFt as number | undefined,
    footingWidthFt: input.footingWidthFt as number | undefined,
    columnCount: input.columnCount as number | undefined,
    columnSizeInches: input.columnSizeInches as number | undefined,
    stripFootingWidthFt: input.stripFootingWidthFt as number | undefined,
    raftThicknessMm: input.raftThicknessMm as number | undefined,
    slabThicknessMm: input.slabThicknessMm as number,
    beamLengthPerFloorFt: input.beamLengthPerFloorFt as number,
    beamWidthInches: input.beamWidthInches as number,
    beamDepthInches: input.beamDepthInches as number,
    totalMasonryWallAreaSqFt: input.totalMasonryWallAreaSqFt as number,
    wallThicknessInches: input.wallThicknessInches as 4.5 | 9,
    plasterThicknessMm: input.plasterThicknessMm as number,
    concreteGradeFoundation: input.concreteGradeFoundation as 'M20' | 'M25',
    concreteGradeStructure: input.concreteGradeStructure as 'M20' | 'M25',
    numberOfBathrooms: input.numberOfBathrooms as number,
    finishingLevel: input.finishingLevel as 'basic' | 'standard' | 'premium',
    city: input.city as string,
    pccThicknessMm: input.pccThicknessMm as number | undefined,
    projectType: input.projectType,
  }
}

export async function generateFloorPlan(input: FloorPlanInput): Promise<AIFloorPlanResult> {
  const lengthFt = input.plotLengthFt ?? (input.plotLength ? input.plotLength * FEET_PER_METER : 0)
  const breadthFt = input.plotBreadthFt ?? (input.plotWidth ? input.plotWidth * FEET_PER_METER : 0)
  const builtUp = input.builtUpAreaPerFloorSqFt ?? lengthFt * breadthFt * 0.6

  const areaSqM = builtUp * 0.092903

  return {
    rooms: [
      { name: 'Living / Hall', area: areaSqM * 0.3, dimensions: `${(Math.sqrt(builtUp) * 0.55).toFixed(1)} ft approx` },
      { name: 'Bedroom', area: areaSqM * 0.25, dimensions: `${(Math.sqrt(builtUp) * 0.5).toFixed(1)} ft approx` },
      { name: 'Kitchen', area: areaSqM * 0.15, dimensions: `${(Math.sqrt(builtUp) * 0.38).toFixed(1)} ft approx` },
      { name: 'Bathroom', area: areaSqM * 0.08, dimensions: `${(Math.sqrt(builtUp) * 0.28).toFixed(1)} ft approx` },
    ],
    totalArea: areaSqM,
    svgLayout: `<svg viewBox="0 0 100 80"><rect x="2" y="2" width="96" height="76" fill="none" stroke="#3b82f6" stroke-width="1.5"/><line x1="50" y1="2" x2="50" y2="78" stroke="#3b82f6"/><line x1="2" y1="40" x2="50" y2="40" stroke="#3b82f6"/></svg>`,
    generatedAt: new Date().toISOString(),
    model: 'buildflow-qs-v1',
    source: 'engineering_formulas',
  }
}

function estimateToBudget(estimate: ConstructionEstimateResult): AIBudgetResult {
  const { summary, materialQuantities, lineItems } = estimate

  const materialLineCost = lineItems
    .filter((item) =>
      ['Cement (50 kg bags)', 'Sand', 'Coarse aggregate (20mm)', 'TMT Steel Fe500', 'Modular bricks'].includes(
        item.material,
      ),
    )
    .reduce((sum, item) => sum + item.amount, 0)

  const laborLineCost = lineItems
    .filter((item) => item.component === 'Labor')
    .reduce((sum, item) => sum + item.amount, 0)

  const finishingLineCost = lineItems
    .filter((item) => item.component === 'Finishing' || item.component === 'MEP')
    .reduce((sum, item) => sum + item.amount, 0)

  const total = estimate.totalCost
  const pct = (amount: number) => (total > 0 ? Math.round((amount / total) * 100) : 0)

  return {
    totalEstimate: total,
    currency: 'INR',
    breakdown: [
      { category: 'Materials', amount: materialLineCost, percentage: pct(materialLineCost) },
      { category: 'Labour', amount: laborLineCost, percentage: pct(laborLineCost) },
      { category: 'Finishing & MEP', amount: finishingLineCost, percentage: pct(finishingLineCost) },
    ],
    materials: [
      {
        name: 'Cement (50 kg bags)',
        quantity: materialQuantities.cementBags,
        unit: 'bags',
        estimatedCost: lineItems.find((i) => i.material === 'Cement (50 kg bags)')?.amount ?? 0,
      },
      {
        name: 'Sand',
        quantity: materialQuantities.sandCum,
        unit: 'm³',
        estimatedCost: lineItems.find((i) => i.material === 'Sand')?.amount ?? 0,
      },
      {
        name: 'Coarse aggregate',
        quantity: materialQuantities.aggregateCum,
        unit: 'm³',
        estimatedCost: lineItems.find((i) => i.material === 'Coarse aggregate (20mm)')?.amount ?? 0,
      },
      {
        name: 'TMT Steel Fe500',
        quantity: parseFloat((materialQuantities.steelKg / 1000).toFixed(2)),
        unit: 'tons',
        estimatedCost: lineItems.find((i) => i.material === 'TMT Steel Fe500')?.amount ?? 0,
      },
      {
        name: 'Modular bricks',
        quantity: parseFloat((materialQuantities.bricks / 1000).toFixed(2)),
        unit: 'thousands',
        estimatedCost: lineItems.find((i) => i.material === 'Modular bricks')?.amount ?? 0,
      },
    ],
    estimate,
    generatedAt: estimate.generatedAt,
    model: 'buildflow-qs-v1',
    source: 'engineering_formulas',
  }
}

export async function generateBudget(
  input: FloorPlanInput & Record<string, unknown>,
): Promise<AIBudgetResult> {
  const payload = {
    ...input,
    projectLabel: (input.projectLabel as string) ?? (input.description as string),
  }
  validateDemoInputs(payload as Partial<ConstructionEstimateInput> & { projectLabel?: string })
  const { filled, assumptions } = fillDemoDefaults(
    payload as Partial<ConstructionEstimateInput> & { projectLabel?: string; apartmentCount?: number },
  )
  const estimate = calculateConstructionEstimate(filled, { demoAssumptions: assumptions })
  return estimateToBudget(estimate)
}

export async function generateTimeline(
  input: FloorPlanInput & { numberOfFloors?: number },
): Promise<AITimelineResult> {
  const floors = input.numberOfFloors ?? 1
  const builtUp = input.builtUpAreaPerFloorSqFt ?? 1000
  const baseWeeks = 8 + floors * 4 + Math.ceil(builtUp / 500)

  return {
    totalWeeks: baseWeeks,
    phases: [
      { name: 'Planning & Permits', weeks: 2, status: 'pending' },
      { name: 'Foundation & Earthwork', weeks: 3 + floors, status: 'pending' },
      { name: 'Structure (columns, beams, slabs)', weeks: Math.round(baseWeeks * 0.35), status: 'pending' },
      { name: 'Masonry & Plastering', weeks: Math.round(baseWeeks * 0.2), status: 'pending' },
      { name: 'Electrical & Plumbing', weeks: 3, status: 'pending' },
      { name: 'Finishing & Interiors', weeks: Math.round(baseWeeks * 0.2), status: 'pending' },
      { name: 'Final Inspection', weeks: 1, status: 'pending' },
    ],
    generatedAt: new Date().toISOString(),
    model: 'buildflow-qs-v1',
    source: 'engineering_formulas',
  }
}

export async function generateFullPlan(input: FloorPlanInput & Record<string, unknown>) {
  const budget = await generateBudget(input)
  const [floorPlan, timeline] = await Promise.all([
    generateFloorPlan(input),
    generateTimeline(input),
  ])
  return { floorPlan, budget, timeline }
}
