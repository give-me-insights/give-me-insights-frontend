import { User } from '../../reducers/user/interfaces'


export interface AuthFormData {
  email: string,
  password: string
}


export interface Token {
  token: string
}


export interface AuthenticatedUser extends User {}

