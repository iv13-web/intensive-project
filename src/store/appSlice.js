import {createSlice} from '@reduxjs/toolkit'

const appSlice = createSlice({
	name: 'app',
	initialState: {
		init: false
	},
	reducers: {
		init: (state) => {
			state.init = true
		}
	}
})

export const appReducer = appSlice.reducer
export const {init} = appSlice.actions