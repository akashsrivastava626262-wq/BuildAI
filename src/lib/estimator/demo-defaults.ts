import type { ConstructionEstimateInput } from './construction-estimator'
import { MissingInputsError } from './errors'

/** Approximate built-up area by project type for demo estimates (sq.ft) */
const BHK_BUILT_UP_SQFT: Record<string, number> = {
  'Single Room': 350,
  '1 BHK': 650,
  '2 BHK': 950,
  '3 BHK': 1300,
  '4 BHK': 1800,
  'Plot / Land': 0, // derived from plot
  'Land to Apartment': 0, // derived from plot
}

function bathroomsForProject(label?: string): number {
  if (!label) return 1
  if (label.includes('4 BHK')) return 3
  if (label.includes('3 BHK')) return 2
  if (label.includes('2 BHK')) return 2
  return 1
}

/**
 * Fills missing structural / finishing inputs with standard demo approximations.
 * Only plot size, city, and project type are required from the user.
 */
export function fillDemoDefaults(
  input: Partial<ConstructionEstimateInput> & { projectLabel?: string; apartmentCount?: number },
): { filled: ConstructionEstimateInput; assumptions: string[] } {
  const assumptions: string[] = []
  const plotArea = (input.plotLengthFt ?? 0) * (input.plotBreadthFt ?? 0)
  const label = input.projectLabel ?? input.projectType ?? '1 BHK'

  let builtUp = input.builtUpAreaPerFloorSqFt
  if (!builtUp) {
    if (label === 'Plot / Land') {
      builtUp = Math.round(plotArea * 0.55)
      assumptions.push(`Built-up area approximated as 55% of plot area (${builtUp} sq.ft).`)
    } else if (label === 'Land to Apartment' && input.apartmentCount) {
      builtUp = Math.round((plotArea * 0.75) / input.apartmentCount)
      assumptions.push(
        `Per-unit built-up approximated as 75% plot coverage ÷ ${input.apartmentCount} apartments (${builtUp} sq.ft).`,
      )
    } else {
      builtUp = BHK_BUILT_UP_SQFT[label] ?? Math.round(plotArea * 0.6)
      assumptions.push(`Built-up area approximated for ${label} as ${builtUp} sq.ft (standard demo benchmark).`)
    }
  }

  const floors = input.numberOfFloors ?? 1
  if (!input.numberOfFloors) assumptions.push('Number of floors assumed: 1.')

  const floorHeight = input.floorHeightFt ?? 10
  if (!input.floorHeightFt) assumptions.push('Floor height assumed: 10 ft.')

  const side = Math.sqrt(builtUp)
  const perimeter = 4 * side
  const columnCount = input.columnCount ?? Math.max(4, Math.ceil(builtUp / 130))
  if (!input.columnCount) assumptions.push(`Column count approximated: ${columnCount} (1 per ~130 sq.ft).`)

  const filled: ConstructionEstimateInput = {
    plotLengthFt: input.plotLengthFt!,
    plotBreadthFt: input.plotBreadthFt!,
    city: input.city!,
    builtUpAreaPerFloorSqFt: builtUp,
    numberOfFloors: floors,
    floorHeightFt: floorHeight,
    foundationType: input.foundationType ?? 'isolated_footing',
    foundationDepthFt: input.foundationDepthFt ?? 5,
    footingLengthFt: input.footingLengthFt ?? 4,
    footingWidthFt: input.footingWidthFt ?? 4,
    columnCount,
    columnSizeInches: input.columnSizeInches ?? 9,
    slabThicknessMm: input.slabThicknessMm ?? 125,
    beamLengthPerFloorFt: input.beamLengthPerFloorFt ?? Math.round(perimeter * 1.2),
    beamWidthInches: input.beamWidthInches ?? 9,
    beamDepthInches: input.beamDepthInches ?? 12,
    totalMasonryWallAreaSqFt:
      input.totalMasonryWallAreaSqFt ?? Math.round(perimeter * floorHeight * floors * 0.9),
    wallThicknessInches: input.wallThicknessInches ?? 9,
    plasterThicknessMm: input.plasterThicknessMm ?? 12,
    concreteGradeFoundation: input.concreteGradeFoundation ?? 'M25',
    concreteGradeStructure: input.concreteGradeStructure ?? 'M20',
    numberOfBathrooms: input.numberOfBathrooms ?? bathroomsForProject(label),
    finishingLevel: input.finishingLevel ?? 'standard',
    pccThicknessMm: input.pccThicknessMm ?? 75,
    projectType: input.projectType,
  }

  if (!input.foundationType) assumptions.push('Foundation type assumed: isolated footing, 5 ft depth, 4×4 ft footings.')
  if (!input.beamLengthPerFloorFt) assumptions.push(`Beam length approximated as ${filled.beamLengthPerFloorFt} ft (1.2× perimeter).`)
  if (!input.totalMasonryWallAreaSqFt) {
    assumptions.push(`Masonry wall area approximated as ${filled.totalMasonryWallAreaSqFt} sq.ft (90% of external wall surface).`)
  }
  if (!input.numberOfBathrooms) assumptions.push(`Bathrooms assumed: ${filled.numberOfBathrooms}.`)
  if (!input.finishingLevel) assumptions.push('Finishing level assumed: standard.')

  assumptions.push('Slab 125 mm, columns 9", beams 9×12", wall 9", plaster 12 mm — typical residential demo specs.')

  return { filled, assumptions }
}

export function validateDemoInputs(
  input: Partial<ConstructionEstimateInput> & { projectLabel?: string },
): void {
  const missing: Array<{ field: string; label: string; reason: string }> = []

  if (!input.plotLengthFt || input.plotLengthFt <= 0) {
    missing.push({ field: 'plotLengthFt', label: 'Plot length (ft)', reason: 'Required for demo estimate.' })
  }
  if (!input.plotBreadthFt || input.plotBreadthFt <= 0) {
    missing.push({ field: 'plotBreadthFt', label: 'Plot breadth (ft)', reason: 'Required for demo estimate.' })
  }
  if (!input.city?.trim()) {
    missing.push({ field: 'city', label: 'City / location', reason: 'Required for regional material rates.' })
  }

  if (missing.length > 0) {
    throw new MissingInputsError(missing)
  }
}
