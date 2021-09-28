import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import {moviesApi} from './moviesApi'
import pagesSlice, {storeCurrentPage} from './pagesSlice'

const localStorageMiddleware = store => next => action => {
	const result = next(action)
	if (storeCurrentPage.match(action)) {
		const pages = store.getState().pages
		localStorage.setItem('pages', JSON.stringify(pages))
	}
	return result
}

export const store = configureStore({
	reducer: {
		auth: authSlice,
		pages: pagesSlice,
		[moviesApi.reducerPath]: moviesApi.reducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			moviesApi.middleware,
			localStorageMiddleware
		)
	}
})

