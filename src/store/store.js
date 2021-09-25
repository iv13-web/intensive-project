import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import {moviesApi} from './moviesApi'

// const localStorageMiddleware = store => next => action => {
// 	const result = next(action)
// 	// condition for linksSlice.actions
// 	// if (setLinks.match(action)) {
// 	// 	const links = store.getState().links
// 	// 	localStorage.setItem('pages', JSON.stringify(links))
// 	// }
// 	return result
// }

export const store = configureStore({
	reducer: {
		auth: authSlice,
		[moviesApi.reducerPath]: moviesApi.reducer
	},
	// middleware: (getDefaultMiddleware) => {
	// 	return getDefaultMiddleware().concat(localStorageMiddleware)
	// }
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(moviesApi.middleware)
	}
})

