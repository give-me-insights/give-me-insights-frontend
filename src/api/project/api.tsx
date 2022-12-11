import axios from "axios";

import {BASE_API_URL, getAuthHeaders} from "../util";

import {CreateProjectFormData, CreateSourceFormData} from "./forms"

import {Project, Source} from "../../reducers/project/interfaces"


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


export const getAllSourcesForProject = async (projectKey: string): Promise<Source[]> => {
  const url = `${BASE_API_URL}/v1/projects/retrieve/${projectKey}/sources/all`
  const headers = {headers: {...getAuthHeaders()}}
  const promise = await axios.get(url, headers)
  // lol - that sucks!
  // thanks IDE for taking that job for me. I will change that soon.
  return promise.data.map((entity: { id: any; title: any; description: any; key: any; timestamp: any; project: any; inbound_topic: any; }) => {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      key: entity.key,
      timestamp: entity.timestamp,
      projectId: entity.project,
      inboundTopic: entity.inbound_topic,
    }
  })
}


export const deleteSource = async (projectKey: string, sourceKey: string) => {
  const url = `${BASE_API_URL}/v1/projects/retrieve/${projectKey}/sources/delete/${sourceKey}`
  const headers = {headers: {...getAuthHeaders()}}
  return await axios.delete(url, headers)
}


export const createSource = async (projectKey: string, data: CreateSourceFormData): Promise<Source> => {
  const url = `${BASE_API_URL}/v1/projects/retrieve/${projectKey}/sources/create`
  const headers = {headers: {...getAuthHeaders()}}
  const promise = await axios.post(url, {...data}, headers)
  return {
    id: promise.data.id,
    title: promise.data.title,
    description: promise.data.description,
    key: promise.data.key,
    timestamp: promise.data.timestamp,
    projectId: promise.data.project,
    inboundTopic: promise.data.inbound_topic,
  }
}
