import {createSlice} from '@reduxjs/toolkit'

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
				if (state.favorites?.[payload.data.id]) {
					delete state.favorites[payload.data.id]
				} else {
					state.favorites = {
						...state.favorites,
						[payload.data.id]: payload.data
					}
				}
			}
		},
		clearFavorites: (state) => {
			Object.keys(state.favorites).forEach(key => delete state.favorites[key])
		}
	},
})

export const moviesReducer = moviesSlice.reducer
export const {toggleFavorites, initFavorites, clearFavorites} = moviesSlice.actions