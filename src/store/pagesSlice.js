import {createSlice} from '@reduxjs/toolkit'

const initialState = localStorage.getItem('pages')
	? JSON.parse(localStorage.getItem('pages'))
	: {
		'now_playing': 1,
		'popular': 1,
		'top_rated': 1,
		'upcoming': 1
	}


const pagesSlice = createSlice({
	name: 'pages',
	initialState,
	reducers: {
		storeCurrentPage: (state, {payload}) => {
			state[payload.list] = payload.page
		},
	}
})

export default pagesSlice.reducer
export const {storeCurrentPage} = pagesSlice.actions