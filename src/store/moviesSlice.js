import {createSlice} from '@reduxjs/toolkit'

const initialState = localStorage.getItem('favorites')
	? {savedMovies: JSON.parse(localStorage.getItem('favorites'))}
	: {savedMovies: []}

const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		addToFavorite: (state, {payload}) => {
			state.savedMovies.push(payload)
		},
		removeFromFavorite: (state, {payload}) => {
			state.savedMovies = state.savedMovies.filter(el => el.id !== payload)
		}
	}
})

export default moviesSlice.reducer
export const {addToFavorite, removeFromFavorite} = moviesSlice.actions