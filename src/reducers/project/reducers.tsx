import {InitialProjectContext, ProjectAction} from "./interfaces";
import * as actionTypes from "./actions"


const initialState = {
  project: {
    id: null,
    key: "",
    title: "",
    description: "",
    timestamp: "",
  }
}


const setProjectContext = (state: InitialProjectContext = initialState, action: ProjectAction) => {
  return {...state, project: {...state.project, ...action.entity}}
}


export const reducer = (state: InitialProjectContext = initialState, action: ProjectAction) => {
  switch (action.type){
    case actionTypes.SET_PROJECT_IN_PROJECT_CONTEXT: return setProjectContext(state, action)
    default: return state;
  }
}
