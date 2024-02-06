export interface SuccessfulAuthRes {
  access_token: string
}

export interface ErrorRes {
  message: string | string[]
  error: string
  statusCode: number
}

export interface FormInputs {
  email: HTMLInputElement
  password: HTMLInputElement
  name?: HTMLInputElement
}

export interface UserInfo {
  name: string
  email: string
}
