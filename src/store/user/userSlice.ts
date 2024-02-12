import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  createSelector,
} from '@reduxjs/toolkit'

import { loginUser, registerUser } from 'store/user/asyncUserThunk'
import { User } from 'shared/interfaces'

export interface UserState extends User {
  isLoading: boolean
  errorMsg: string | null
}
const initialState: UserState = {
  name: '',
  email: '',
  isLoading: false,
  errorMsg: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.name = action.payload.name
        state.email = action.payload.email
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.name = action.payload.name
        state.email = action.payload.email
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
        if (typeof action.payload === 'string') {
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
  },
})

export const { getUserInfo, getFetchStatus } = userSlice.selectors
export const SelectUserSlice = userSlice.selectSlice

export default userSlice.reducer
