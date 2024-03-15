import { useCallback, useState } from 'react'

import axios from 'axios'
import { ErrorRes } from 'shared/interfaces/fetch.interface'
// axios.defaults.baseURL = 'https://purpleschool.ru/pizza-api-demo'

type LoadingStatus = 'idle' | 'loading' | 'error'
type HTTPRequestMethods = 'get' | 'post'

interface Headers {
  [key: string]: string
}
interface Params {
  [key: string]: string | number
}
interface IRequestConfig {
  url: string
  method?: HTTPRequestMethods
  body?: string | object | null
  headers?: Headers
  params?: Params
}

const api = axios.create({
  baseURL: 'https://65fb0bd414650eb210092ef1.mockapi.io/',
})
const authApi = axios.create({
  baseURL: 'https://purpleschool.ru/pizza-api-demo',
})

const useHTTP = () => {
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | string[] | null>(
    null
  )

  const request = useCallback(
    async <T>({
      url,
      method = 'get',
      body = null,
      headers = {},
      params = {},
    }: IRequestConfig) => {
      setLoadingStatus('loading')
      setErrorMessage(null)

      try {
        const { data } = await api<T>({
          url,
          method,
          data: body,
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          params,
        })

        setLoadingStatus('idle')
        return data
      } catch (error) {
        setLoadingStatus('error')
        if (axios.isAxiosError<ErrorRes>(error) && error.response) {
          setErrorMessage(error.response.data.message)

          console.log(error.response?.data.message)
        }
        throw error
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return { request, loadingStatus, errorMessage }
}

export { useHTTP, authApi }
