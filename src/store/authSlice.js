import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	isLoggedIn: false
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state) => {
			state.isLoggedIn = true
		},
		logout: (state) => {
			state.isLoggedIn = false
		}
	}
})

export const authReducer =  authSlice.reducer
export const {login, logout} = authSlice.actions