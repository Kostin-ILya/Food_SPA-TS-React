import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { User, UserAuth, ErrorRes, SuccessfulAuthRes } from 'shared/interfaces'

export const loginUser = createAsyncThunk<User, UserAuth>(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<SuccessfulAuthRes>('/auth/login', {
        email,
        password,
      })

      const { data: userInfo } = await axios.get<User>('/user/profile', {
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
      return rejectWithValue(error)
    }
  }
)

export const registerUser = createAsyncThunk<User, UserAuth>(
  'user/register',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<SuccessfulAuthRes>('/auth/register', {
        email,
        password,
        name,
      })

      const { data: userInfo } = await axios.get<User>('/user/profile', {
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
      return rejectWithValue(error)
    }
  }
)
