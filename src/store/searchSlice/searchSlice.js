import {createSlice} from '@reduxjs/toolkit'
import {validateYear} from '../../utils/validators'

const initialState = {
	query: '',
	isSearchFetching: false,
	searchResults: null,
	searchResultsCount: null,
	suggestResults: null,
	selectedGenres: [],
	enteredYear: '',
	filterQuery: {},
	isYearValid: true,
	history: {}
}

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		initHistory: (state, {payload}) => {
			if (payload) {
				state.history = payload
			}
			return state
		},
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
		},
		saveToHistory: (state, {payload}) => {
			const {
				id,
				path,
				currentUser,
				poster,
				genres,
				year,
				type,
				title
			} = payload

			if (currentUser) {
				if (state.history?.[currentUser]?.[id]) {
					return state
				}
				state.history = {
					...state.history,
					[id]: {id, path, poster, genres, year, type, title}
				}
			}
		},
		clearHistory: (state) => {
			Object.keys(state.history).forEach(key => {
				delete state.history[key]
			})
		},
		setSearchResultsCount: (state, {payload}) => {
			state.searchResultsCount = payload
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
	setYearValidity,
	saveToHistory,
	initHistory,
	clearHistory,
	setSearchResultsCount
} = searchSlice.actions
