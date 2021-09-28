import {createSlice} from '@reduxjs/toolkit'
import {storage} from '../utils/utils'

const DEFAULT_STATE = {
	'now_playing': 1,
	'popular': 1,
	'top_rated': 1,
	'upcoming': 1
}

const initialState = storage('pages')
	? storage('pages', null, DEFAULT_STATE)
	: DEFAULT_STATE

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
