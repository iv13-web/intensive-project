import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	isLoggedIn: false,
	isAuthModalOpened: false
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
		},
		setAuthModalOpened: (state, {payload}) => {
			state.isAuthModalOpened = payload
		}
	}
})

export const authReducer =  authSlice.reducer
export const {login, logout, setAuthModalOpened} = authSlice.actions