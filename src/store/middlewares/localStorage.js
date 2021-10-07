import {initPages, storeCurrentPage} from '../pagesSlice'
import {storage} from '../../utils/storage'
import {clearFavorites, initFavorites, toggleFavorites} from '../moviesSlice'
import {init} from '../appSlice'
import {initAuth, signin, signout, signup} from '../authSlice'
import {clearHistory, initHistory, saveToHistory} from '../searchSlice/searchSlice'

export const localStorageMiddleware = store => next => action => {
	next(action)
	const authenticated = store.getState().auth.isSignedIn === true
	const currentUser = store.getState().auth.currentUser

	if (storeCurrentPage.match(action)) {
		storage('pages', store.getState().pages)
	}
	if (toggleFavorites.match(action) && authenticated) {
		const favorites = store.getState().movies.favorites
		const personalFavorites = {
			...storage('favorites'),
			[currentUser]: favorites
		}
		storage('favorites', personalFavorites)
	}
	if (init.match(action)) {
		const storedPages = storage('pages')
		const storedUsers = storage('users')
		const storedIsSignedIn = storage('isSignedIn')
		const storedCurrentUser = storage('currentUser')
		store.dispatch(initAuth({
			users: storedUsers,
			isSignedIn: storedIsSignedIn,
			currentUser: storedCurrentUser
		}))
		store.dispatch(initPages(storedPages))
		const currentUser = store.getState().auth.currentUser
		const storedFavorites = storage('favorites')?.[currentUser]
		const storedHistory = storage('history')?.[currentUser]
		store.dispatch(initFavorites(storedFavorites))
		store.dispatch(initHistory(storedHistory))
	}
	if (signup.match(action)) {
		const users = store.getState().auth.users
		storage('users', users)
	}
	if (signin.match(action) || signout.match(action)) {
		const isSignedIn = store.getState().auth.isSignedIn
		localStorage.setItem('isSignedIn', JSON.stringify(isSignedIn))
		localStorage.setItem('currentUser', JSON.stringify(currentUser))
		const storedFavorites = storage('favorites')?.[currentUser]
		const storedHistory = storage('history')?.[currentUser]
		store.dispatch(initFavorites(storedFavorites))
		store.dispatch(initHistory(storedHistory))
	}
	if (signout.match(action)) {
		store.dispatch(clearFavorites())
		store.dispatch(clearHistory())
	}
	if (saveToHistory.match(action) && authenticated) {
		const historyItems = store.getState().search.history
		const personalHistory = {
			...storage('favorites'),
			[currentUser]: historyItems
		}
		storage('history', personalHistory)
	}
}
