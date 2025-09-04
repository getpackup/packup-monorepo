export type WeightUnit = 'g' | 'kg' | 'oz' | 'lb'

// Conversion factors to grams (base unit)
const CONVERSION_TO_GRAMS: Record<WeightUnit, number> = {
  g: 1,
  kg: 1000,
  oz: 28.3495,
  lb: 453.592,
}

// Conversion factors from grams
const CONVERSION_FROM_GRAMS: Record<WeightUnit, number> = {
  g: 1,
  kg: 0.001,
  oz: 0.035274,
  lb: 0.00220462,
}

/**
 * Converts weight from one unit to another
 * @param weight - The weight value to convert
 * @param fromUnit - The source unit
 * @param toUnit - The target unit
 * @returns The converted weight value
 */
export function convertWeight(weight: number, fromUnit: WeightUnit, toUnit: WeightUnit): number {
  if (fromUnit === toUnit) {
    return weight
  }

  // Convert to grams first, then to target unit
  const weightInGrams = weight * CONVERSION_TO_GRAMS[fromUnit]
  const convertedWeight = weightInGrams * CONVERSION_FROM_GRAMS[toUnit]

  // Round to 2 decimal places
  return Math.round(convertedWeight * 100) / 100
}

/**
 * Formats weight display with proper precision based on unit
 * @param weight - The weight value
 * @param unit - The weight unit
 * @returns Formatted weight string
 */
export function formatWeight(weight: number | string, unit: WeightUnit): string {
  // Convert to number if it's a string
  const numericWeight = typeof weight === 'string' ? parseFloat(weight) : weight
  
  // Handle invalid numbers
  if (Number.isNaN(numericWeight)) {
    return `0 ${unit}`
  }

  // Use appropriate precision based on unit
  let precision = 1
  if (unit === 'kg' || unit === 'lb') {
    precision = 2 // More precision for larger units
  } else if (unit === 'g' || unit === 'oz') {
    precision = numericWeight < 10 ? 1 : 0 // More precision for small values
  }

  const roundedWeight = parseFloat(numericWeight.toFixed(precision))
  return `${roundedWeight} ${unit}`
}

/**
 * Converts and formats weight to user's preferred unit
 * @param weight - The weight value
 * @param currentUnit - The current unit of the weight
 * @param preferredUnit - The user's preferred unit
 * @returns Formatted weight string in preferred unit
 */
export function convertAndFormatWeight(
  weight: number,
  currentUnit: WeightUnit,
  preferredUnit: WeightUnit
): string {
  const convertedWeight = convertWeight(weight, currentUnit, preferredUnit)
  return formatWeight(convertedWeight, preferredUnit)
}

/**
 * Gets the display label for a weight unit
 * @param unit - The weight unit
 * @returns Display label for the unit
 */
export function getWeightUnitLabel(unit: WeightUnit): string {
  const labels: Record<WeightUnit, string> = {
    g: 'Grams',
    kg: 'Kilograms',
    oz: 'Ounces',
    lb: 'Pounds',
  }
  return labels[unit]
}
