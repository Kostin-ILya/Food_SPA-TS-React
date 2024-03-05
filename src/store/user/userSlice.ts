import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  createSelector,
} from '@reduxjs/toolkit'

import { loginUser, registerUser, userProfile } from 'store/user/asyncUserThunk'
import { User } from 'shared/interfaces'

export interface UserState extends User {
  jwt: string | null
  isLoading: boolean
  errorMsg: string | string[] | null
}
const initialState: UserState = {
  name: '',
  email: '',
  jwt: '',
  isLoading: false,
  errorMsg: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null
      state.name = ''
      state.email = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.fulfilled, (state, action) => {
        state.name = action.payload.name
        state.email = action.payload.email
      })
      .addMatcher(isFulfilled(loginUser, registerUser), (state, action) => {
        state.jwt = action.payload.access_token
      })
      .addMatcher(isPending, (state) => {
        state.isLoading = true
        state.errorMsg = null
      })
      .addMatcher(isFulfilled, (state) => {
        state.isLoading = false
      })
      .addMatcher(isRejected, (state, action) => {
        state.isLoading = false
        if (
          typeof action.payload === 'string' ||
          Array.isArray(action.payload)
        ) {
          state.errorMsg = action.payload
        }
      })
  },
  selectors: {
    getUserInfo: createSelector(
      [(state: UserState) => state.name, (state: UserState) => state.email],
      (name, email) => ({ name, email })
    ),
    getFetchStatus: createSelector(
      [
        (state: UserState) => state.isLoading,
        (state: UserState) => state.errorMsg,
      ],
      (isLoading, errorMsg) => ({ isLoading, errorMsg })
    ),
    getJwt: (state) => state.jwt,
  },
})

export const { getUserInfo, getFetchStatus, getJwt } = userSlice.selectors
export const { logout } = userSlice.actions

export default userSlice.reducer
