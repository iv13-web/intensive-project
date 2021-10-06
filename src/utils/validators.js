/**
 *
 * @param value : number
 * @param minYear : number
 * @param maxYear : number - optional. Default value -current year
 * @returns {boolean}
 * example validateYear(2000, 1900) => true
 * example validateYear(2000, 2020) => false
 */
export function validateYear(value, minYear, maxYear = new Date().getFullYear()) {
	return !isNaN(value) && value > minYear && value < maxYear
}