import axios from "axios";

import {BASE_API_URL, getAuthHeaders} from "../util";

import {CreateProjectFormData} from "./forms"

import {Project} from "../../reducers/project/interfaces"


export const createProject = async (data: CreateProjectFormData): Promise<Project> => {
  const url = `${BASE_API_URL}/v1/projects/create`
  const headers = {headers: {...getAuthHeaders()}}
  const promise = await axios.post(url, {...data}, headers)
  return {
    id: promise.data.id,
    title: promise.data.title,
    description: promise.data.description,
    key: promise.data.key,
    timestamp: promise.data.timestamp
  }
}


export const getAllProjects = async (): Promise<Project[]> => {
  const url = `${BASE_API_URL}/v1/projects/all`
  const headers = {headers: {...getAuthHeaders()}}
  const promise = await axios.get(url, headers)
  return promise.data.map((entity: Project) => {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      key: entity.key,
      timestamp: entity.timestamp,
    }
  })
}


export const retrieveProjectByKey = async (key: string): Promise<Project> => {
  const url = `${BASE_API_URL}/v1/projects/retrieve/${key}`
  const headers = {headers: {...getAuthHeaders()}}
  const promise = await axios.get(url, headers)
  return {
    id: promise.data.id,
    title: promise.data.title,
    description: promise.data.description,
    key: promise.data.key,
    timestamp: promise.data.timestamp
  }
}
