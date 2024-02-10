import {
  createSlice,
  createAsyncThunk,
  isFulfilled,
  isPending,
  isRejected,
  createSelector,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { UserInfo } from 'shared/interfaces'
import { ErrorRes, SuccessfulAuthRes } from 'shared/interfaces/fetch.interface'

export interface UserState extends UserInfo {
  isLoading: boolean
  errorMsg: string | null
}
const initialState: UserState = {
  name: '',
  email: '',
  isLoading: false,
  errorMsg: null,
}

export const loginUser = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post<SuccessfulAuthRes>('/auth/login', {
        email,
        password,
      })

      const { data: userInfo } = await axios.get<UserInfo>('/user/profile', {
        headers: { Authorization: `Bearer ${data.access_token}` },
      })

      localStorage.setItem('jwt', data.access_token)

      return userInfo
    } catch (error) {
      if (axios.isAxiosError<ErrorRes>(error) && error.response) {
        if (typeof error.response.data.message === 'string') {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.response.data.message[0])
        }
      }
      console.error(error)
      return rejectWithValue(error)
    }
  }
)

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
      [(state) => state.name, (state) => state.email],
      (name, email) => ({ name, email })
    ),
    getFetchStatus: createSelector(
      [(state) => state.isLoading, (state) => state.errorMsg],
      (isLoading, errorMsg) => ({ isLoading, errorMsg })
    ),
  },
})

export const { getUserInfo, getFetchStatus } = userSlice.selectors
export const SelectUserSlice = userSlice.selectSlice

export default userSlice.reducer
