import {createSlice} from '@reduxjs/toolkit'
import {toast} from 'react-toastify'

const initialState = {
	isSignedIn: false,
	isAuthModalOpened: false,
	currentUser: null,
	users: {},
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		initAuth: (state, {payload}) => {
			state.users = payload.users || {}
			state.isSignedIn = payload.isSignedIn || false
			state.currentUser = payload.currentUser || null
		},
		signin: (state, {payload}) => {
			const email = state.users[payload.email]?.email
			const password = state.users[payload.email]?.password
			if (email === payload.email && password === payload.password) {
				state.isSignedIn = true
				state.currentUser = email
			}
		},
		signout: (state) => {
			state.isSignedIn = false
			state.currentUser = null
		},
		setAuthModalOpened: (state, {payload}) => {
			state.isAuthModalOpened = payload
		},
		signup: (state, {payload}) => {
			if (!state.users[payload.email]) {
				state.users[payload.email] = payload
				toast.success('Account created successfully')
			}
		},
	}
})

export const authReducer =  authSlice.reducer
export const {signin, signout, setAuthModalOpened, signup, initAuth} = authSlice.actions