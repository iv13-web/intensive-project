import {initPages, storeCurrentPage} from '../pagesSlice'
import {storage} from '../../utils/storage'
import {initFavorites, toggleFavorites} from '../moviesSlice'
import {init} from '../appSlice'
import {initAuth, signin, signout, signup} from '../authSlice'

export const localStorageMiddleware = store => next => action => {
	next(action)
	if (storeCurrentPage.match(action)) {
		storage('pages', store.getState().pages)
	}
	if (toggleFavorites.match(action)) {
		const favorites = store.getState().movies.favorites
		storage('favorites', favorites)
	}
	if (init.match(action)) {
		const storedPages = storage('pages')
		const storedFavorites = storage('favorites')
		const storedUsers = storage('users')
		const storedIsSignedIn = storage('isSignedIn')
		store.dispatch(initPages(storedPages))
		store.dispatch(initFavorites(storedFavorites))
		store.dispatch(initAuth({users: storedUsers, isSignedIn: storedIsSignedIn}))
	}
	if (signup.match(action)) {
		const users = store.getState().auth.users
		storage('users', users)
	}
	if (signin.match(action) || signout.match(action)) {
		const isSignedIn = store.getState().auth.isSignedIn
		localStorage.setItem('isSignedIn', JSON.stringify(isSignedIn))
	}
}