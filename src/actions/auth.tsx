import {User} from '../reducers/user/interfaces'
import {SET_USER} from "../reducers/user/actions";

export const setUser = (user: User) => {
  return {
    type: SET_USER,
    entity: user
  }
}
