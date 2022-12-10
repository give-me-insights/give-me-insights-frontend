import {Project} from '../reducers/project/interfaces'
import {SET_PROJECT_IN_PROJECT_CONTEXT} from "../reducers/project/actions";


export const setProjectInProjectContext = (project: Project) => {
  return {
    type: SET_PROJECT_IN_PROJECT_CONTEXT,
    entity: project
  }
}
