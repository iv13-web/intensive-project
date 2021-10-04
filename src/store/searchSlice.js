import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	query: '',
	isSearchFetching: false,
	searchResults: null,
	suggestResults: null,
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
		}
	}
})

export const searchReducer =  searchSlice.reducer
export const {setInputQuery, setSearchFetching, setSearchResults, setSuggestResults} = searchSlice.actions