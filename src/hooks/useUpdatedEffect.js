import {useEffect, useRef} from "react"

export default function useUpdatedEffect(callback, dependencies) {
	const firstRenderRef = useRef(true)

	useEffect(() => {
		if (firstRenderRef.current) {
			firstRenderRef.current = false
			return
		}
		return callback()
	}, dependencies)
}
