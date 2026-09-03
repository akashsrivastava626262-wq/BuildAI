/**
 * Unit rates (INR) by city tier — user must provide city name.
 * Rates are applied after resolving city to a tier; custom overrides can be added later.
 */

export type CityTier = 'metro' | 'tier1' | 'tier2' | 'tier3'

export interface MaterialRates {
  cementPerBag: number // 50 kg bag
  sandPerCum: number // coarse sand, m³
  aggregatePerCum: number // 20mm, m³
  steelPerKg: number // TMT Fe500
  brickPerThousand: number // modular bricks
  laborConcretePerCum: number
  laborBrickworkPerCum: number
  laborSteelPerKg: number
  laborPlasterPerSqFt: number
  laborShutteringPerSqM: number
  electricalPerSqFt: number
  plumbingPerBathroom: number
  flooringBasicPerSqFt: number
  flooringStandardPerSqFt: number
  flooringPremiumPerSqFt: number
  paintingPerSqFt: number
}

export const RATES_BY_TIER: Record<CityTier, MaterialRates> = {
  metro: {
    cementPerBag: 410,
    sandPerCum: 2200,
    aggregatePerCum: 1800,
    steelPerKg: 68,
    brickPerThousand: 9500,
    laborConcretePerCum: 1500,
    laborBrickworkPerCum: 7500,
    laborSteelPerKg: 16,
    laborPlasterPerSqFt: 42,
    laborShutteringPerSqM: 520,
    electricalPerSqFt: 180,
    plumbingPerBathroom: 28000,
    flooringBasicPerSqFt: 120,
    flooringStandardPerSqFt: 220,
    flooringPremiumPerSqFt: 450,
    paintingPerSqFt: 35,
  },
  tier1: {
    cementPerBag: 390,
    sandPerCum: 1900,
    aggregatePerCum: 1650,
    steelPerKg: 65,
    brickPerThousand: 8800,
    laborConcretePerCum: 1350,
    laborBrickworkPerCum: 6800,
    laborSteelPerKg: 14,
    laborPlasterPerSqFt: 38,
    laborShutteringPerSqM: 480,
    electricalPerSqFt: 150,
    plumbingPerBathroom: 24000,
    flooringBasicPerSqFt: 100,
    flooringStandardPerSqFt: 190,
    flooringPremiumPerSqFt: 380,
    paintingPerSqFt: 30,
  },
  tier2: {
    cementPerBag: 370,
    sandPerCum: 1600,
    aggregatePerCum: 1500,
    steelPerKg: 62,
    brickPerThousand: 8200,
    laborConcretePerCum: 1200,
    laborBrickworkPerCum: 6200,
    laborSteelPerKg: 12,
    laborPlasterPerSqFt: 32,
    laborShutteringPerSqM: 420,
    electricalPerSqFt: 130,
    plumbingPerBathroom: 20000,
    flooringBasicPerSqFt: 85,
    flooringStandardPerSqFt: 160,
    flooringPremiumPerSqFt: 320,
    paintingPerSqFt: 26,
  },
  tier3: {
    cementPerBag: 350,
    sandPerCum: 1400,
    aggregatePerCum: 1350,
    steelPerKg: 60,
    brickPerThousand: 7500,
    laborConcretePerCum: 1050,
    laborBrickworkPerCum: 5500,
    laborSteelPerKg: 11,
    laborPlasterPerSqFt: 28,
    laborShutteringPerSqM: 380,
    electricalPerSqFt: 110,
    plumbingPerBathroom: 17000,
    flooringBasicPerSqFt: 70,
    flooringStandardPerSqFt: 140,
    flooringPremiumPerSqFt: 280,
    paintingPerSqFt: 22,
  },
}

const METRO_CITIES = new Set([
  'mumbai', 'delhi', 'bangalore', 'bengaluru', 'chennai', 'kolkata', 'hyderabad', 'pune',
])
const TIER1_CITIES = new Set([
  'ahmedabad', 'jaipur', 'lucknow', 'kanpur', 'nagpur', 'indore', 'bhopal', 'visakhapatnam',
  'patna', 'vadodara', 'ludhiana', 'agra', 'nashik', 'faridabad', 'meerut', 'rajkot',
  'varanasi', 'srinagar', 'aurangabad', 'dhanbad', 'amritsar', 'allahabad', 'prayagraj',
  'ranchi', 'coimbatore', 'jabalpur', 'gwalior', 'vijayawada', 'jodhpur', 'madurai',
  'raipur', 'kota', 'guwahati', 'chandigarh', 'noida', 'gurgaon', 'gurugram', 'ghaziabad',
])
const TIER2_CITIES = new Set([
  'dehradun', 'haridwar', 'rishikesh', 'bareilly', 'moradabad', 'aligarh', 'saharanpur',
  'gorakhpur', 'mathura', 'firozabad', 'muzaffarnagar', 'hapur', 'bulandshahr',
])

export function resolveCityTier(city: string): CityTier {
  const key = city.trim().toLowerCase()
  if (METRO_CITIES.has(key)) return 'metro'
  if (TIER1_CITIES.has(key)) return 'tier1'
  if (TIER2_CITIES.has(key)) return 'tier2'
  return 'tier3'
}

/** Cement consumption per m³ of concrete by grade (standard mix design tables) */
export const CEMENT_BAGS_PER_CUM: Record<string, number> = {
  M20: 8.0, // 1:1.5:3
  M25: 9.5, // 1:1:2
}

export const SAND_CUM_PER_CUM_CONCRETE = 0.42
export const AGGREGATE_CUM_PER_CUM_CONCRETE = 0.84

/** Steel density kg/m³ */
export const STEEL_DENSITY = 7850

/** Steel percentage of concrete volume for budgetary structural estimate (IS 456 min + typical) */
export const STEEL_RATIO = {
  foundation: 0.005, // 0.5%
  column: 0.01, // 1.0%
  beam: 0.008, // 0.8%
  slab: 0.007, // 0.7%
}

/** Brickwork: cement bags per m³ of masonry for 1:6 CM mortar */
export const CEMENT_BAGS_PER_CUM_BRICKWORK = 1.35
export const SAND_CUM_PER_CUM_BRICKWORK = 0.35
export const BRICKS_PER_CUM_MASONRY = 500 // modular brick with mortar

/** Plaster: cement bags per m² for 12mm thick 1:4 plaster */
export const CEMENT_BAGS_PER_SQM_PLASTER_12MM = 0.09
export const PLASTER_SAND_CUM_PER_SQM_12MM = 0.012
