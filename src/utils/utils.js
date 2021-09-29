export function storage (key, data, fallback) {
	if (!data) {
		try {
			return JSON.parse(localStorage.getItem(key))
		} catch (e) {
			return fallback || e
		}
	}
	localStorage.setItem(key, JSON.stringify(data))
}

export function numberWithSeparator(number, separator = ' ') {
	const parts = number.toString().split('.')
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
	return parts.join('.')
}