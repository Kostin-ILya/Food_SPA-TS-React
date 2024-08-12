import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from 'hooks/useHTTP'

import { User, UserAuth, ErrorRes, AuthRes } from 'shared/interfaces'
import { RootState } from 'store'

const handleFetchError = (error: unknown) => {
  if (axios.isAxiosError<ErrorRes>(error) && error.response) {
    return error.response.data.message
  }
  return error
}

export const loginUser = createAsyncThunk<AuthRes, UserAuth>(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await authApi.post('/auth/login', {
        email,
        password,
      })

      return data
    } catch (error) {
      return rejectWithValue(handleFetchError(error))
    }
  }
)

export const registerUser = createAsyncThunk<AuthRes, UserAuth>(
  'user/register',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const { data } = await authApi.post<AuthRes>('/auth/register', {
        email,
        password,
        name,
      })

      return data
    } catch (error) {
      return rejectWithValue(handleFetchError(error))
    }
  }
)

export const userProfile = createAsyncThunk<User, void, { state: RootState }>(
  'user/profile',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { data } = await authApi<User>('/user/profile', {
        headers: { Authorization: `Bearer ${getState().user.jwt}` },
      })
      return data
    } catch (error) {
      return rejectWithValue(handleFetchError(error))
    }
  }
)
