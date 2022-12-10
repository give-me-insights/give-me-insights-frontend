import {ActionReducer} from "../../utils/genericInterfaces";

export interface InitialUser {
  id: string | null
}

export interface User extends InitialUser {
  id: string
}

export interface UserAction extends ActionReducer<User> { }
