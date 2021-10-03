import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	query: '',
	isSearchFetching: false,
	searchResults: null
}

const searchSlice = createSlice({
	name: 'auth',
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
		}
	}
})

export const searchReducer =  searchSlice.reducer
export const {setInputQuery, setSearchFetching, setSearchResults} = searchSlice.actions