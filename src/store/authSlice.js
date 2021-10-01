import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	isSignedIn: false,
	isAuthModalOpened: false,
	users: {},
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		initAuth: (state, {payload}) => {
			state.users = payload.users || {}
			state.isSignedIn = payload.isSignedIn || false
		},
		signin: (state, {payload}) => {
			const email = state.users[payload.email]?.email
			const password = state.users[payload.email]?.password
			if (email === payload.email && password === payload.password) {
				state.isSignedIn = true
			}
		},
		signout: (state) => {
			state.isSignedIn = false
		},
		setAuthModalOpened: (state, {payload}) => {
			state.isAuthModalOpened = payload
		},
		signup: (state, {payload}) => {
			if (!state.users[payload.email]) {
				state.users[payload.email] = payload
			}
		},
	}
})

export const authReducer =  authSlice.reducer
export const {signin, signout, setAuthModalOpened, signup, initAuth} = authSlice.actions