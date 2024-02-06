import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {
  ErrorRes,
  SuccessfulAuthRes,
  UserInfo,
} from 'shared/interfaces/fetch.interface'

export interface UserInitState {
  name: string | null
  email: string | null
  error: string | null
}
const initialState: UserInitState = {
  name: null,
  email: null,
  error: null,
}

// export const fetchUser = createAsyncThunk(
//   'user/fetchUser',
//   async (jwt: string) => {
//     const { data } = await axios<UserInfo>('/user/profile', {
//       headers: { Authorization: `Bearer ${jwt}` },
//     })

//     console.log(data)

//     return data
//   }
// )

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

      const res = await axios.get('/user/profile', {
        headers: { Authorization: `Bearer ${data.access_token}` },
      })

      return res.data
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
      .addCase(loginUser.pending, (state) => {
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.name = action.payload.name
        state.email = action.payload.email
      })
      .addCase(loginUser.rejected, (state, action) => {
        if (typeof action.payload === 'string') {
          state.error = action.payload
        }
      })
  },
  selectors: {
    selectUserInfo: (state) => state,
  },
})

export const { selectUserInfo } = userSlice.selectors

export default userSlice.reducer
