import axios from "axios";

import {BASE_API_URL, getAuthHeaders} from "../util";

import {CreateProjectFormData, Project} from "./forms"


export const createProject = async (data: CreateProjectFormData): Promise<Project> => {
  const url = `${BASE_API_URL}/v1/projects/create`
  const headers = {headers: {...getAuthHeaders()}}
  const promise = await axios.post(url, {...data}, headers)
  return {
    id: promise.data.id,
    title: promise.data.title,
    description: promise.data.description,
    key: promise.data.key,
  }
}
