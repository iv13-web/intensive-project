import {createSlice} from '@reduxjs/toolkit'
import {toast} from 'react-toastify'

const initialState = {
	favorites: {},
}

const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		initFavorites: (state, {payload}) => {
			if (payload) {
				state.favorites = {...payload}
			}
			return state
		},
		toggleFavorites: (state, {payload}) => {
			if (payload.currentUser) {
				console.log(payload)
				if (state.favorites?.[payload.data.id]) {
					delete state.favorites[payload.data.id]
					toast.warn(`${payload.data.title} removed from favorites`)
				} else {
					state.favorites = {
						...state.favorites,
						[payload.data.id]: payload.data
					}
					toast.success(`${payload.data.title} added to favorites`)
				}
			}
		},
		clearFavorites: (state) => {
			Object.keys(state.favorites).forEach(key => {
				delete state.favorites[key]
			})
		},
	},
})

export const moviesReducer = moviesSlice.reducer
export const {toggleFavorites, initFavorites, clearFavorites, isInFavorites} = moviesSlice.actions