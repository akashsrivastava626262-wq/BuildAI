import {
  AGGREGATE_CUM_PER_CUM_CONCRETE,
  BRICKS_PER_CUM_MASONRY,
  CEMENT_BAGS_PER_CUM,
  CEMENT_BAGS_PER_CUM_BRICKWORK,
  CEMENT_BAGS_PER_SQM_PLASTER_12MM,
  PLASTER_SAND_CUM_PER_SQM_12MM,
  RATES_BY_TIER,
  SAND_CUM_PER_CUM_BRICKWORK,
  SAND_CUM_PER_CUM_CONCRETE,
  STEEL_DENSITY,
  STEEL_RATIO,
  resolveCityTier,
} from './material-rates'
import { MissingInputsError } from './errors'

const FT_TO_M = 0.3048
const SQFT_TO_SQM = 0.092903
const INCH_TO_M = 0.0254
const MM_TO_M = 0.001

export interface ConstructionEstimateInput {
  plotLengthFt: number
  plotBreadthFt: number
  builtUpAreaPerFloorSqFt: number
  numberOfFloors: number
  floorHeightFt: number
  foundationType: 'isolated_footing' | 'strip_footing' | 'raft'
  foundationDepthFt: number
  footingLengthFt?: number
  footingWidthFt?: number
  columnCount?: number
  columnSizeInches?: number
  stripFootingWidthFt?: number
  raftThicknessMm?: number
  slabThicknessMm: number
  beamLengthPerFloorFt?: number
  beamWidthInches?: number
  beamDepthInches?: number
  totalMasonryWallAreaSqFt: number
  wallThicknessInches: 4.5 | 9
  plasterThicknessMm: number
  concreteGradeFoundation: 'M20' | 'M25'
  concreteGradeStructure: 'M20' | 'M25'
  numberOfBathrooms: number
  finishingLevel: 'basic' | 'standard' | 'premium'
  city: string
  projectType?: string
  pccThicknessMm?: number
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

export interface ConstructionEstimateResult {
  totalCost: number
  currency: 'INR'
  cityTier: string
  city: string
  summary: {
    materialCost: number
    laborCost: number
    finishingCost: number
    totalBuiltUpAreaSqFt: number
    costPerSqFt: number
  }
  lineItems: EstimateLineItem[]
  materialQuantities: {
    cementBags: number
    sandCum: number
    aggregateCum: number
    steelKg: number
    bricks: number
  }
  concreteVolumes: {
    foundationCum: number
    columnCum: number
    beamCum: number
    slabCum: number
    totalCum: number
  }
  methodology: string[]
  demoAssumptions?: string[]
  generatedAt: string
  source: 'engineering_formulas' | 'demo_formulas'
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}

function round0(n: number) {
  return Math.round(n)
}

export function getRequiredFieldsDocumentation(): Array<{
  field: string
  label: string
  unit: string
  required: boolean
  condition?: string
}> {
  return [
    { field: 'plotLengthFt', label: 'Plot length', unit: 'ft', required: true },
    { field: 'plotBreadthFt', label: 'Plot breadth', unit: 'ft', required: true },
    { field: 'city', label: 'City / location', unit: 'text', required: true },
    { field: 'projectLabel', label: 'Project type (e.g. 1 BHK)', unit: 'text', required: false },
    { field: 'numberOfFloors', label: 'Number of floors', unit: 'count', required: false, condition: 'Defaults to 1 in demo mode' },
    { field: 'builtUpAreaPerFloorSqFt', label: 'Built-up area per floor', unit: 'sq.ft', required: false, condition: 'Approximated from project type if omitted' },
  ]
}

export function validateConstructionInputs(input: Partial<ConstructionEstimateInput>): void {
  const missing: Array<{ field: string; label: string; reason: string }> = []

  const requireField = (field: keyof ConstructionEstimateInput, label: string) => {
    const value = input[field]
    if (value === undefined || value === null || value === '') {
      missing.push({ field, label, reason: 'This field is required for accurate cost estimation.' })
    }
  }

  requireField('plotLengthFt', 'Plot length (ft)')
  requireField('plotBreadthFt', 'Plot breadth (ft)')
  requireField('builtUpAreaPerFloorSqFt', 'Built-up area per floor (sq.ft)')
  requireField('numberOfFloors', 'Number of floors')
  requireField('floorHeightFt', 'Floor-to-floor height (ft)')
  requireField('foundationType', 'Foundation type')
  requireField('foundationDepthFt', 'Foundation depth (ft)')
  requireField('slabThicknessMm', 'RCC slab thickness (mm)')
  requireField('beamLengthPerFloorFt', 'Total beam length per floor (ft)')
  requireField('beamWidthInches', 'Beam width (inches)')
  requireField('beamDepthInches', 'Beam depth (inches)')
  requireField('totalMasonryWallAreaSqFt', 'Total masonry wall area (sq.ft)')
  requireField('wallThicknessInches', 'Wall thickness (inches)')
  requireField('plasterThicknessMm', 'Plaster thickness (mm)')
  requireField('concreteGradeFoundation', 'Foundation concrete grade')
  requireField('concreteGradeStructure', 'Structure concrete grade')
  requireField('numberOfBathrooms', 'Number of bathrooms')
  requireField('finishingLevel', 'Finishing level')
  requireField('city', 'City / location')

  if (input.foundationType === 'isolated_footing') {
    requireField('footingLengthFt', 'Footing length (ft)')
    requireField('footingWidthFt', 'Footing width (ft)')
    requireField('columnCount', 'Number of columns')
    requireField('columnSizeInches', 'Column size (inches)')
  }

  if (input.foundationType === 'strip_footing') {
    requireField('stripFootingWidthFt', 'Strip footing width (ft)')
    requireField('columnCount', 'Number of columns')
    requireField('columnSizeInches', 'Column size (inches)')
  }

  if (input.foundationType === 'raft') {
    requireField('raftThicknessMm', 'Raft thickness (mm)')
    requireField('columnCount', 'Number of columns')
    requireField('columnSizeInches', 'Column size (inches)')
  }

  if (missing.length > 0) {
    throw new MissingInputsError(missing)
  }
}

function addLine(
  items: EstimateLineItem[],
  component: string,
  material: string,
  formula: string,
  quantity: number,
  unit: string,
  unitRate: number,
): number {
  const amount = round0(quantity * unitRate)
  items.push({ component, material, formula, quantity: round2(quantity), unit, unitRate, amount })
  return amount
}

export function calculateConstructionEstimate(
  input: ConstructionEstimateInput,
  options?: { demoAssumptions?: string[] },
): ConstructionEstimateResult {
  validateConstructionInputs(input)

  const tier = resolveCityTier(input.city)
  const rates = RATES_BY_TIER[tier]
  const lineItems: EstimateLineItem[] = []
  const methodology: string[] = []

  const builtUpSqFt = input.builtUpAreaPerFloorSqFt
  const builtUpSqM = builtUpSqFt * SQFT_TO_SQM
  const totalBuiltUpSqFt = builtUpSqFt * input.numberOfFloors
  const floorHeightM = input.floorHeightFt * FT_TO_M
  const slabThicknessM = input.slabThicknessMm * MM_TO_M
  const wallThicknessM = input.wallThicknessInches * INCH_TO_M
  const plasterThicknessM = input.plasterThicknessMm * MM_TO_M
  const pccThicknessM = (input.pccThicknessMm ?? 75) * MM_TO_M

  methodology.push('All quantities derived from user-provided dimensions — no assumed plot coverage or BHK-based area.')
  methodology.push(`City "${input.city}" mapped to ${tier} tier for unit rates.`)

  // ─── 1. Earthwork excavation (methodology only; volume not priced separately) ─
  if (input.foundationType === 'isolated_footing') {
    methodology.push(
      `Excavation = column_count × footing_L × footing_W × depth × 1.10 (10% side dressing)`,
    )
  } else if (input.foundationType === 'strip_footing') {
    methodology.push(`Strip excavation = perimeter × footing_width × depth × 1.10`)
  } else {
    methodology.push(`Raft excavation = built_up_area × foundation_depth × 1.10`)
  }

  // ─── 2. PCC ───────────────────────────────────────────────────────────────
  let pccAreaSqM = builtUpSqM
  if (input.foundationType === 'isolated_footing') {
    pccAreaSqM =
      input.columnCount! *
      (input.footingLengthFt! * FT_TO_M) *
      (input.footingWidthFt! * FT_TO_M)
  }
  const pccVolumeCum = pccAreaSqM * pccThicknessM
  const pccCementBags = pccVolumeCum * CEMENT_BAGS_PER_CUM.M20
  const pccSandCum = pccVolumeCum * SAND_CUM_PER_CUM_CONCRETE
  const pccAggregateCum = pccVolumeCum * AGGREGATE_CUM_PER_CUM_CONCRETE

  // ─── 3. Foundation RCC ───────────────────────────────────────────────────
  let foundationConcreteCum = 0
  if (input.foundationType === 'isolated_footing') {
    const footingL = input.footingLengthFt! * FT_TO_M
    const footingW = input.footingWidthFt! * FT_TO_M
    const depth = input.foundationDepthFt * FT_TO_M
    foundationConcreteCum = input.columnCount! * footingL * footingW * depth
    methodology.push(`Foundation RCC = column_count × footing_L × footing_W × depth`)
  } else if (input.foundationType === 'strip_footing') {
    const perimeterFt = 2 * (input.plotLengthFt + input.plotBreadthFt)
    foundationConcreteCum =
      perimeterFt * FT_TO_M * input.stripFootingWidthFt! * FT_TO_M * input.foundationDepthFt * FT_TO_M
    methodology.push(`Strip foundation RCC = perimeter × width × depth`)
  } else {
    foundationConcreteCum = builtUpSqM * (input.raftThicknessMm! * MM_TO_M)
    methodology.push(`Raft RCC = built_up_area × raft_thickness`)
  }

  // ─── 4. Columns ───────────────────────────────────────────────────────────
  const columnSizeM = (input.columnSizeInches ?? 9) * INCH_TO_M
  const columnHeightTotalM = floorHeightM * input.numberOfFloors
  const columnCount = input.columnCount!
  const columnConcreteCum = columnCount * columnSizeM * columnSizeM * columnHeightTotalM
  methodology.push(`Column RCC = column_count × column_size² × floor_height × floors`)

  // ─── 5. Beams ─────────────────────────────────────────────────────────────
  const beamLengthM = input.beamLengthPerFloorFt! * FT_TO_M
  const beamWidthM = input.beamWidthInches! * INCH_TO_M
  const beamDepthM = input.beamDepthInches! * INCH_TO_M
  const beamConcreteCum = beamLengthM * beamWidthM * beamDepthM * input.numberOfFloors
  methodology.push(`Beam RCC = beam_length × beam_width × beam_depth × floors`)

  // ─── 6. Slab ────────────────────────────────────────────────────────────
  const slabConcreteCum = builtUpSqM * slabThicknessM * input.numberOfFloors
  methodology.push(`Slab RCC = built_up_area × slab_thickness × floors`)

  const totalConcreteCum =
    pccVolumeCum + foundationConcreteCum + columnConcreteCum + beamConcreteCum + slabConcreteCum

  // ─── 7. Cement, sand, aggregate for concrete ─────────────────────────────
  const structGrade = input.concreteGradeStructure
  const foundGrade = input.concreteGradeFoundation
  const structCementBags =
    (columnConcreteCum + beamConcreteCum + slabConcreteCum) * CEMENT_BAGS_PER_CUM[structGrade]
  const foundCementBags = foundationConcreteCum * CEMENT_BAGS_PER_CUM[foundGrade]
  const pccCement = pccCementBags
  const concreteSandCum =
    (foundationConcreteCum + columnConcreteCum + beamConcreteCum + slabConcreteCum) *
      SAND_CUM_PER_CUM_CONCRETE +
    pccSandCum
  const concreteAggregateCum =
    (foundationConcreteCum + columnConcreteCum + beamConcreteCum + slabConcreteCum) *
      AGGREGATE_CUM_PER_CUM_CONCRETE +
    pccAggregateCum

  // ─── 8. Steel (IS 456 budgetary percentages by member type) ──────────────
  const steelKg =
    foundationConcreteCum * STEEL_DENSITY * STEEL_RATIO.foundation +
    columnConcreteCum * STEEL_DENSITY * STEEL_RATIO.column +
    beamConcreteCum * STEEL_DENSITY * STEEL_RATIO.beam +
    slabConcreteCum * STEEL_DENSITY * STEEL_RATIO.slab
  methodology.push(
    `Steel (kg) = Σ (member_concrete_volume × 7850 × steel_ratio); ratios: footing 0.5%, column 1.0%, beam 0.8%, slab 0.7%`,
  )

  // ─── 9. Brickwork ────────────────────────────────────────────────────────
  const wallAreaSqM = input.totalMasonryWallAreaSqFt * SQFT_TO_SQM
  const masonryVolumeCum = wallAreaSqM * wallThicknessM
  const brickCount = masonryVolumeCum * BRICKS_PER_CUM_MASONRY
  const brickworkCementBags = masonryVolumeCum * CEMENT_BAGS_PER_CUM_BRICKWORK
  const brickworkSandCum = masonryVolumeCum * SAND_CUM_PER_CUM_BRICKWORK
  methodology.push(
    `Bricks = wall_area × wall_thickness × 500 bricks/m³; cement for 1:6 mortar = 1.35 bags/m³`,
  )

  // ─── 10. Plaster (both faces) ─────────────────────────────────────────────
  const plasterAreaSqM = wallAreaSqM * 2
  const plasterScale = plasterThicknessM / 0.012
  const plasterCementBags = plasterAreaSqM * CEMENT_BAGS_PER_SQM_PLASTER_12MM * plasterScale
  const plasterSandCum = plasterAreaSqM * PLASTER_SAND_CUM_PER_SQM_12MM * plasterScale
  methodology.push(`Plaster (both faces) = wall_area × 2 × (thickness/12mm) × cement 0.09 bags/m²`)

  const totalCementBags =
    pccCement + foundCementBags + structCementBags + brickworkCementBags + plasterCementBags
  const totalSandCum = concreteSandCum + brickworkSandCum + plasterSandCum

  // ─── Cost line items ─────────────────────────────────────────────────────
  let materialCost = 0
  let laborCost = 0

  materialCost += addLine(
    lineItems,
    'Concrete',
    'Cement (50 kg bags)',
    `Σ(volume × bags/m³) for PCC M20, foundation ${foundGrade}, structure ${structGrade}, brickwork & plaster`,
    totalCementBags,
    'bags',
    rates.cementPerBag,
  )
  materialCost += addLine(
    lineItems,
    'Concrete & Mortar',
    'Sand',
    `Concrete: ${round2(concreteSandCum)} m³ + brickwork: ${round2(brickworkSandCum)} m³ + plaster: ${round2(plasterSandCum)} m³`,
    totalSandCum,
    'm³',
    rates.sandPerCum,
  )
  materialCost += addLine(
    lineItems,
    'Concrete',
    'Coarse aggregate (20mm)',
    `RCC + PCC volume × 0.84 m³/m³`,
    concreteAggregateCum,
    'm³',
    rates.aggregatePerCum,
  )
  materialCost += addLine(
    lineItems,
    'Structure',
    'TMT Steel Fe500',
    `Σ(member_volume × 7850 × steel_ratio)`,
    steelKg,
    'kg',
    rates.steelPerKg,
  )
  materialCost += addLine(
    lineItems,
    'Masonry',
    'Modular bricks',
    `wall_area × thickness × 500 bricks/m³`,
    brickCount,
    'nos',
    rates.brickPerThousand / 1000,
  )

  laborCost += addLine(
    lineItems,
    'Labor',
    'Concrete work',
    `Total RCC ${round2(foundationConcreteCum + columnConcreteCum + beamConcreteCum + slabConcreteCum)} m³ × rate`,
    foundationConcreteCum + columnConcreteCum + beamConcreteCum + slabConcreteCum,
    'm³',
    rates.laborConcretePerCum,
  )
  laborCost += addLine(
    lineItems,
    'Labor',
    'Brickwork',
    `${round2(masonryVolumeCum)} m³ × rate`,
    masonryVolumeCum,
    'm³',
    rates.laborBrickworkPerCum,
  )
  laborCost += addLine(
    lineItems,
    'Labor',
    'Steel fixing',
    `${round2(steelKg)} kg × rate`,
    steelKg,
    'kg',
    rates.laborSteelPerKg,
  )
  laborCost += addLine(
    lineItems,
    'Labor',
    'Plastering',
    `${round2(plasterAreaSqM / SQFT_TO_SQM)} sq.ft × rate`,
    plasterAreaSqM / SQFT_TO_SQM,
    'sq.ft',
    rates.laborPlasterPerSqFt,
  )

  const shutteringAreaSqM =
    (beamLengthM * beamDepthM + builtUpSqM) * input.numberOfFloors * 2
  laborCost += addLine(
    lineItems,
    'Labor',
    'Shuttering / formwork',
    `(beam_contact + slab_soffit) × 2 × floors`,
    shutteringAreaSqM,
    'm²',
    rates.laborShutteringPerSqM,
  )

  // ─── Finishing ───────────────────────────────────────────────────────────
  let finishingCost = 0
  const flooringRate =
    input.finishingLevel === 'premium'
      ? rates.flooringPremiumPerSqFt
      : input.finishingLevel === 'standard'
        ? rates.flooringStandardPerSqFt
        : rates.flooringBasicPerSqFt

  finishingCost += addLine(
    lineItems,
    'Finishing',
    `Flooring (${input.finishingLevel})`,
    `built_up_area × floors × rate`,
    totalBuiltUpSqFt,
    'sq.ft',
    flooringRate,
  )
  finishingCost += addLine(
    lineItems,
    'Finishing',
    'Painting',
    `wall_area × 2 faces × rate`,
    input.totalMasonryWallAreaSqFt * 2,
    'sq.ft',
    rates.paintingPerSqFt,
  )
  finishingCost += addLine(
    lineItems,
    'MEP',
    'Electrical',
    `built_up_area × floors × rate`,
    totalBuiltUpSqFt,
    'sq.ft',
    rates.electricalPerSqFt,
  )
  finishingCost += addLine(
    lineItems,
    'MEP',
    'Plumbing',
    `bathrooms × rate`,
    input.numberOfBathrooms,
    'bathrooms',
    rates.plumbingPerBathroom,
  )

  const totalCost = materialCost + laborCost + finishingCost

  return {
    totalCost: round0(totalCost),
    currency: 'INR',
    cityTier: tier,
    city: input.city,
    summary: {
      materialCost: round0(materialCost),
      laborCost: round0(laborCost),
      finishingCost: round0(finishingCost),
      totalBuiltUpAreaSqFt: round0(totalBuiltUpSqFt),
      costPerSqFt: round0(totalCost / totalBuiltUpSqFt),
    },
    lineItems,
    materialQuantities: {
      cementBags: round0(totalCementBags),
      sandCum: round2(totalSandCum),
      aggregateCum: round2(concreteAggregateCum),
      steelKg: round0(steelKg),
      bricks: round0(brickCount),
    },
    concreteVolumes: {
      foundationCum: round2(foundationConcreteCum),
      columnCum: round2(columnConcreteCum),
      beamCum: round2(beamConcreteCum),
      slabCum: round2(slabConcreteCum),
      totalCum: round2(totalConcreteCum),
    },
    methodology,
    demoAssumptions: options?.demoAssumptions,
    generatedAt: new Date().toISOString(),
    source: options?.demoAssumptions ? 'demo_formulas' : 'engineering_formulas',
  }
}
