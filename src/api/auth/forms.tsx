export interface AuthFormData {
  email: string,
  password: string
}


export interface Token {
  token: string
}


export interface AuthenticatedUser {
  id: Number,
  firstName: string,
  lastName: string,
  email: string
}
