import {createSlice} from '@reduxjs/toolkit'
import {storage} from '../utils/utils'

const DEFAULT_STATE = {
	savedMovies: []
}

const initialState = storage('favorites')
	? {savedMovies: storage('favorites', null, DEFAULT_STATE.savedMovies)}
	: DEFAULT_STATE

const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		addToFavorite: (state, {payload}) => {
			state.savedMovies.push(payload)
		},
		removeFromFavorite: (state, {payload}) => {
			state.savedMovies = state.savedMovies.filter(el => el.id !== payload)
		},
		savedMoviesCount: (state) => state.savedMovies.length
	}
})

export default moviesSlice.reducer
export const {addToFavorite, removeFromFavorite, savedMoviesCount} = moviesSlice.actions