import {ActionReducer} from "../../utils/genericInterfaces";

export interface InitialCompany {
  id: Number | null,
  name: string,
  key: string
}

export interface InitialUser {
  id: Number | null,
  firstName: string,
  lastName: string,
  email: string,
  company: InitialCompany
}

export interface Company extends InitialCompany {
  id: Number
}

export interface User extends InitialUser {
  id: Number,
  company: Company
}

export interface UserAction extends ActionReducer<User> { }
