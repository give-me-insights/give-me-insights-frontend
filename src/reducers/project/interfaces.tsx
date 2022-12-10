import {ActionReducer} from "../../utils/genericInterfaces";

export interface InitialProject {
  id: Number | null,
  key: string,
  title: string,
  description: string,
  timestamp: string,
}

export interface Project extends InitialProject {
  id: Number,
}

export interface InitialProjectContext {
  project: InitialProject
}

export interface ProjectContext extends InitialProjectContext {
  project: Project
}

export interface ProjectAction extends ActionReducer<Project> {}
