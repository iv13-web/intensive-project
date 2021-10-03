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
				if (state.favorites[payload.currentUser]?.[payload.data.id]) {
					delete state.favorites[payload.currentUser][payload.data.id]
				} else {
					state.favorites[payload.currentUser] = {
						...state.favorites[payload.currentUser],
						[payload.data.id]: payload.data
					}
				}
			}
		},
	},
})

export const moviesReducer = moviesSlice.reducer
export const {toggleFavorites, initFavorites} = moviesSlice.actions