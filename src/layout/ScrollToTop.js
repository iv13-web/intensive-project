import {useEffect} from 'react'

export default function ScrollToTop({deps}) {

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		})
	}, [...deps])

	return null
}