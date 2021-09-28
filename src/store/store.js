import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import {moviesApi} from './moviesApi'
import pagesSlice, {storeCurrentPage} from './pagesSlice'
import {storage} from '../utils/utils'

const localStorageMiddleware = ({getState}) => next => action => {
	next(action)
	if (storeCurrentPage.match(action)) {
		storage('pages', getState().pages)
	}
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

