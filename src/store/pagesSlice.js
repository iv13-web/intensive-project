import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	'now_playing': 1,
	'popular': 1,
	'top_rated': 1,
	'upcoming': 1
}

const pagesSlice = createSlice({
	name: 'pages',
	initialState,
	reducers: {
		initPages: (state, {payload}) => {
			if (payload) {
				return Object.keys(payload).forEach(key => {
					state[key] = payload[key]
				})
			}
			return state
		},
		storeCurrentPage: (state, {payload}) => {
			state[payload.list] = payload.page
		},
	}
})

export const pagesReducer = pagesSlice.reducer
export const {storeCurrentPage, initPages} = pagesSlice.actions
