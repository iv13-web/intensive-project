import {createSlice} from '@reduxjs/toolkit'
import {validateYear} from '../../utils/validators'

const initialState = {
	query: '',
	isSearchFetching: false,
	searchResults: null,
	suggestResults: null,
	selectedGenres: [],
	enteredYear: '',
	filterQuery: {},
	isYearValid: true
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
		setYear: (state, {payload}) => {
			state.enteredYear = payload
		},
		setYearValidity: (state, {payload}) => {
			state.isYearValid = validateYear(payload, 1959)
			if (payload === '') {
				state.isYearValid = true
			}
		},
		setFilterQuery: (state) => {
			state.filterQuery.genres = state.selectedGenres.join(',')
			state.filterQuery.year = state.enteredYear
		},
		clearFilters: (state) => {
			state.selectedGenres = []
			state.enteredYear = ''
			state.filterQuery = {}
			state.isYearValid = true
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
	setYear,
	setYearValidity
} = searchSlice.actions