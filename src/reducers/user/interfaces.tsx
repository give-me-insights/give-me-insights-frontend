import {ActionReducer} from "../../utils/genericInterfaces";

export interface InitialUser {
  id: Number | null,
  firstName: string,
  lastName: string,
  email: string,
}

export interface User extends InitialUser {
  id: Number
}

export interface UserAction extends ActionReducer<User> { }
