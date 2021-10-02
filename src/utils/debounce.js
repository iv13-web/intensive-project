/**
 * @param cb : function - function to be debounced
 * @param wait : number - time in ms for cooldown before function execution
 * @returns {function}
 */

export function debounce(cb, wait) {
	let timeout
	return function(...args) {
		const context = this
		if (timeout) {
			clearTimeout(timeout)
		}
		timeout = setTimeout(() => {
			timeout = null
			cb.apply(context, args)
		}, wait)
	}
}
