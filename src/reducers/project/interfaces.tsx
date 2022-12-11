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

export interface InitialProjectPlugin {
  id: null | Number,
  key: string,
  projectId: null | Number,
  title: string,
  description: string,
  timestamp: string
}


export interface InitialSource extends InitialProjectPlugin {
  inboundTopic: string
}

export interface Source extends InitialSource {
  id: Number,
  projectId: Number
}


export interface InitialEvent extends InitialProjectPlugin {
  startDate: string,
  duration: Number,
  isExpected: boolean,
  durationUnit: "h" | "d" | "m"
}

export interface Event extends InitialEvent {
  id: Number,
  projectId: Number
}


export interface InitialProjectLink extends InitialProjectPlugin {
  url: string
}

export interface ProjectLink extends InitialProjectLink {
  id: Number,
  projectId: Number
}


export interface InitialProjectContext {
  project: InitialProject
}

export interface ProjectContext extends InitialProjectContext {
  project: Project
}

export interface ProjectAction extends ActionReducer<Project> {}
