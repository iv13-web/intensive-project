import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import pagesSlice, {storeCurrentPage} from './pagesSlice'
import moviesSlice, {addToFavorite, removeFromFavorite} from './moviesSlice'
import {moviesApi} from './moviesApi'
import {storage} from '../utils/utils'

const localStorageMiddleware = ({getState}) => next => action => {
	next(action)
	if (storeCurrentPage.match(action)) {
		storage('pages', getState().pages)
	}
	if (addToFavorite.match(action) || removeFromFavorite.match(action)) {
		const favorites = store.getState().movies.savedMovies
		localStorage.setItem('favorites', JSON.stringify(favorites))
	}
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

