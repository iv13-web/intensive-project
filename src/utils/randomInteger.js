/**
 * @param min - minimum number
 * @param max - maximum number
 * @returns {number}
 * example randomInteger(1, 3) => randomly returns numbers 1 || 2 || 3
 */

export function randomInteger(min, max) {
	let rand = min + Math.random() * (max + 1 - min)
	return Math.floor(rand)
}
