import {initPages, storeCurrentPage} from '../pagesSlice'
import {storage} from '../../utils/storage'
import {initFavorites, toggleFavorites} from '../moviesSlice'
import {init} from '../appSlice'
import {initAuth, signin, signout, signup} from '../authSlice'

export const localStorageMiddleware = store => next => action => {
	next(action)
	const authenticated = store.getState().auth.isSignedIn === true
	if (storeCurrentPage.match(action)) {
		storage('pages', store.getState().pages)
	}
	if (toggleFavorites.match(action) && authenticated) {
		const favorites = store.getState().movies.favorites
		storage('favorites', favorites)
	}
	if (init.match(action)) {
		const storedPages = storage('pages')
		const storedFavorites = storage('favorites')
		const storedUsers = storage('users')
		const storedIsSignedIn = storage('isSignedIn')
		const storedCurrentUser = storage('currentUser')
		store.dispatch(initPages(storedPages))
		store.dispatch(initFavorites(storedFavorites))
		store.dispatch(initAuth({
			users: storedUsers,
			isSignedIn: storedIsSignedIn,
			currentUser: storedCurrentUser
		}))
	}
	if (signup.match(action)) {
		const users = store.getState().auth.users
		storage('users', users)
	}
	if (signin.match(action) || signout.match(action)) {
		const isSignedIn = store.getState().auth.isSignedIn
		const currentUser = store.getState().auth.currentUser
		localStorage.setItem('isSignedIn', JSON.stringify(isSignedIn))
		localStorage.setItem('currentUser', JSON.stringify(currentUser))
	}
}