/**
 * @param number - number to transform
 * @param separator - numbers will be separated by this. Default separator - space
 * @returns {string}
 * @type {(number : number, separator : string) => string}
 * example: 1000000 => 1 000 000
 * example: 1000000.45 => 1 000 000.45
 **/
export function numberWithSeparator(number, separator = ' ') {
	const parts = number.toString().split('.')
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
	return parts.join('.')
}
