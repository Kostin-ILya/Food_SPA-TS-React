import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { authApi } from 'hooks/useHTTP'

import { User, UserAuth, ErrorRes, AuthRes } from 'shared/interfaces'
import { RootState } from 'store'

export const loginUser = createAsyncThunk<AuthRes, UserAuth>(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await authApi.post<AuthRes>('/auth/login', {
        email,
        password,
      })

      return data
    } catch (error) {
      if (axios.isAxiosError<ErrorRes>(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      }
      return rejectWithValue(error)
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
      if (axios.isAxiosError<ErrorRes>(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      }
      return rejectWithValue(error)
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
      if (axios.isAxiosError<ErrorRes>(error) && error.response) {
        return rejectWithValue(error.response.data.message)
      }
      return rejectWithValue(error)
    }
  }
)
