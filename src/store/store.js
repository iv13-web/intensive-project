import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import pagesSlice, {storeCurrentPage} from './pagesSlice'
import moviesSlice, {addToFavorite, removeFromFavorite} from './moviesSlice'
import {moviesApi} from './moviesApi'

const localStorageMiddleware = store => next => action => {
	const result = next(action)
	if (storeCurrentPage.match(action)) {
		const pages = store.getState().pages
		localStorage.setItem('pages', JSON.stringify(pages))
	}
	if (addToFavorite.match(action) || removeFromFavorite.match(action)) {
		const favorites = store.getState().movies.savedMovies
		localStorage.setItem('favorites', JSON.stringify(favorites))
	}
	return result
}

export const store = configureStore({
	reducer: {
		auth: authSlice,
		pages: pagesSlice,
		movies: moviesSlice,
		[moviesApi.reducerPath]: moviesApi.reducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			moviesApi.middleware,
			localStorageMiddleware
		)
	}
})

