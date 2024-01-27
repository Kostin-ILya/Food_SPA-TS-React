import { useState } from 'react'

import axios from 'axios'
axios.defaults.baseURL = 'https://purpleschool.ru/pizza-api-demo'

type LoadingStatus = 'idle' | 'loading' | 'error'
type HTTPRequestMethods = 'get' | 'post'

// interface IHTTPHeaders {
//   [key: string]: string
// }

interface IRequestConfig {
  url: string
  method?: HTTPRequestMethods
  body?: string | null
  // headers?: IHTTPHeaders
}

const useHTTP = () => {
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('idle')

  const request = async <T>({
    url,
    method = 'get',
    body = null,
  }: // headers = { 'Content-Type': 'application/json' },
  IRequestConfig) => {
    setLoadingStatus('loading')

    try {
      const { data } = await axios<T>({
        url,
        method,
        data: body,
        // headers,
      })

      setLoadingStatus('idle')
      return data
    } catch (error) {
      setLoadingStatus('error')
      console.error(error)
      throw error
    }
  }

  return { loadingStatus, request }
}

export { useHTTP }
