import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	favorites: {}
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
			state.favorites[payload.id]
				? delete state.favorites[payload.id]
				: state.favorites[payload.id] = payload
		}
	},
})

export const moviesReducer = moviesSlice.reducer
export const {toggleFavorites, initFavorites} = moviesSlice.actions