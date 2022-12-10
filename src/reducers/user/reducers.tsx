import {InitialUser, UserAction} from "./interfaces"
import * as actionTypes from "./actions"


const initialState: InitialUser = {
  id: null
}


const setUser = (state: InitialUser, action: UserAction) => {
  return {
    ...state,
    id: action.entity.id
  }
}


export const reducer = (state: InitialUser = initialState, action: UserAction) => {
  switch (action.type){
    case actionTypes.SET_USER: return setUser(state, action)
    default: return state;
  }
}
