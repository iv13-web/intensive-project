import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	query: '',
	isSearchFetching: false,
	searchResults: null,
	suggestResults: null,
	selectedGenres: [],
	filterQuery: {},
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
			state.genres = payload
		},
		setFilterQuery: (state) => {
			state.filterQuery.genres = state.genres?.length && state.genres.join(',')
		},
		clearFilters: (state) => {
			state.genres = []
		}
	}
})

export const searchReducer =  searchSlice.reducer
export const {
	setInputQuery,
	setSearchFetching,
	setSearchResults,
	setSuggestResults,
	setGenres,
	setFilterQuery,
	clearFilters,
	searchBtnDisability
} = searchSlice.actions