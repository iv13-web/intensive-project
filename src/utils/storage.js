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
