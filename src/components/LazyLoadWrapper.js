import {useEffect, useState} from 'react'

export default function LazyLoadWrapper({delay, component, children}) {
	const [show, setShow] = useState(false)

	useEffect(() => {
		const timeout = setTimeout(() => setShow(true), delay)
		return () => clearTimeout(timeout)
	}, [delay])

	return show ? component || children : null
}