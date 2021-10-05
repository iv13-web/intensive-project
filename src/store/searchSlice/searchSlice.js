import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	query: '',
	isSearchFetching: false,
	searchResults: null,
	suggestResults: null,
	selectedGenres: [],
	filterQuery: {}
}

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setInputQuery: (state, {payload}) => {
			state.query = payload
		},
		setSearchFetching: (state, {payload}) => {
			state.isSearchFetching = payload
		},
		setSearchResults: (state, {payload}) => {
			state.searchResults = payload
		},
		setSuggestResults: (state, {payload}) => {
			state.suggestResults = payload
		},
		setGenres: (state, {payload}) => {
			state.selectedGenres = payload
		},
		setFilterQuery: (state) => {
			state.filterQuery.genres = state.genres.join(',')
		},
	}
})

export const searchReducer =  searchSlice.reducer
export const {
	setInputQuery,
	setSearchFetching,
	setSearchResults,
	setSuggestResults,
	setGenres,
	setFilterQuery
} = searchSlice.actions