export interface SuccessfulAuthRes {
  access_token: string
}

export interface ErrorRes {
  message: string
  error: string
  statusCode: number
}

export interface FormInputs {
  email: HTMLInputElement
  password: HTMLInputElement
  name?: HTMLInputElement
}