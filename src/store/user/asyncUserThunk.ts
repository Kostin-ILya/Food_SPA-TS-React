import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { User, UserAuth, ErrorRes, AuthRes } from 'shared/interfaces'
import { RootState } from 'store'
import { setLocalStorage } from 'utils/localStorage'

export const loginUser = createAsyncThunk<AuthRes, UserAuth>(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<AuthRes>('/auth/login', {
        email,
        password,
      })
      setLocalStorage('jwt', data.access_token)

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
      const { data } = await axios.post<AuthRes>('/auth/register', {
        email,
        password,
        name,
      })
      setLocalStorage('jwt', data.access_token)

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
      const { data } = await axios.get<User>('/user/profile', {
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