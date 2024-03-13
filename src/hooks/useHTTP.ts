import { useCallback, useState } from 'react'

import axios from 'axios'
import { ErrorRes } from 'shared/interfaces/fetch.interface'
axios.defaults.baseURL = 'https://purpleschool.ru/pizza-api-demo'

type LoadingStatus = 'idle' | 'loading' | 'error'
type HTTPRequestMethods = 'get' | 'post'

interface Headers {
  [key: string]: string
}

interface IRequestConfig {
  url: string
  method?: HTTPRequestMethods
  body?: string | object | null
  headers?: Headers
}

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
    }: IRequestConfig) => {
      setLoadingStatus('loading')
      setErrorMessage(null)

      try {
        const { data } = await axios<T>({
          url,
          method,
          data: body,
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
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
    []
  )

  return { request, loadingStatus, errorMessage }
}

export { useHTTP }
