import {configureStore} from '@reduxjs/toolkit'
import {authReducer} from './authSlice'
import {pagesReducer} from './pagesSlice'
import {moviesReducer} from './moviesSlice'
import {moviesApi} from './moviesApi'
import {localStorageMiddleware} from './middlewares/localStorage'
import {authRequiredMiddleware} from './middlewares/authRequired'
import {appReducer} from './appSlice'
import {searchReducer} from './searchSlice/searchSlice'

export const store = configureStore({
	reducer: {
		app: appReducer,
		auth: authReducer,
		pages: pagesReducer,
		movies: moviesReducer,
		search: searchReducer,
		[moviesApi.reducerPath]: moviesApi.reducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			moviesApi.middleware,
			authRequiredMiddleware,
			localStorageMiddleware
		)
	}
})

