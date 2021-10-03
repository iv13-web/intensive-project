/**
 * @param cb : function - callback to be debounced
 * @param delay : number - time in ms before execution the function after last triggering
 * @returns {function}
 */

export function debounce(cb, delay) {
	let timeout
	return function(...args) {
		const context = this
		if (timeout) {
			clearTimeout(timeout)
		}
		timeout = setTimeout(() => {
			timeout = null
			cb.apply(context, args)
		}, delay)
	}
}
