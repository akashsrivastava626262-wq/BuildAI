import type { AIFullPlanResult } from '../api'
import type { ConstructionEstimatePayload } from '../api'
import { calculateConstructionEstimate } from './construction-estimator'
import { fillDemoDefaults, validateDemoInputs } from './demo-defaults'

const SQFT_PER_SQM = 0.092903

function generateFloorPlan(builtUp: number) {
  const areaSqM = builtUp * SQFT_PER_SQM
  return {
    rooms: [
      { name: 'Living / Hall', area: areaSqM * 0.3, dimensions: `${(Math.sqrt(builtUp) * 0.55).toFixed(1)} ft approx` },
      { name: 'Bedroom', area: areaSqM * 0.25, dimensions: `${(Math.sqrt(builtUp) * 0.5).toFixed(1)} ft approx` },
      { name: 'Kitchen', area: areaSqM * 0.15, dimensions: `${(Math.sqrt(builtUp) * 0.38).toFixed(1)} ft approx` },
      { name: 'Bathroom', area: areaSqM * 0.08, dimensions: `${(Math.sqrt(builtUp) * 0.28).toFixed(1)} ft approx` },
    ],
    totalArea: areaSqM,
    svgLayout:
      '<svg viewBox="0 0 100 80"><rect x="2" y="2" width="96" height="76" fill="none" stroke="#3b82f6" stroke-width="1.5"/><line x1="50" y1="2" x2="50" y2="78" stroke="#3b82f6"/><line x1="2" y1="40" x2="50" y2="40" stroke="#3b82f6"/></svg>',
  }
}

function generateTimeline(floors: number, builtUp: number) {
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
  }
}

function estimateToBudget(estimate: ReturnType<typeof calculateConstructionEstimate>) {
  const { materialQuantities, lineItems } = estimate

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
    estimate: {
      lineItems: estimate.lineItems,
      materialQuantities: estimate.materialQuantities,
      summary: estimate.summary,
      methodology: estimate.methodology,
      demoAssumptions: estimate.demoAssumptions,
      cityTier: estimate.cityTier,
      city: estimate.city,
    },
  }
}

/** Run the QS engine entirely in the browser — no backend required for demo estimates. */
export function generateLocalFullPlan(payload: ConstructionEstimatePayload): AIFullPlanResult {
  const input = {
    ...payload,
    projectLabel: payload.projectLabel ?? payload.projectType,
  }

  validateDemoInputs(input)
  const { filled, assumptions } = fillDemoDefaults(input)
  const estimate = calculateConstructionEstimate(filled, { demoAssumptions: assumptions })
  const budget = estimateToBudget(estimate)
  const floorPlan = generateFloorPlan(filled.builtUpAreaPerFloorSqFt)
  const timeline = generateTimeline(filled.numberOfFloors, filled.builtUpAreaPerFloorSqFt)

  return { floorPlan, budget, timeline }
}
