import {setAuthModalOpened} from '../authSlice'

const authRequiredActionTypes = [
	'movies/toggleFavorites'
]

export const authRequiredMiddleware = store => next => action => {
	next(action)
	const notAuthenticated = store.getState().auth.isSignedIn === false
	const actionRequiresAuth = authRequiredActionTypes.includes(action.type)
	const shouldCatchAction = notAuthenticated && actionRequiresAuth

	if (shouldCatchAction) {
		if (action.type === 'movies/toggleFavorites') {
			store.dispatch(setAuthModalOpened(true))
		}
	}
}