import axios from "axios";

import {BASE_API_URL, getAuthHeaders} from "../util";

import {CreateEventFormData, CreateProjectFormData, CreateSourceFormData} from "./forms"
import {Event, ProjectLink} from "../../reducers/project/interfaces";

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


export const getAllEventsForProject = async (projectKey: string): Promise<Event[]> => {
  const url = `${BASE_API_URL}/v1/projects/retrieve/${projectKey}/events/all`
  const headers = {headers: {...getAuthHeaders()}}
  const promise = await axios.get(url, headers)
  // lol - that sucks!
  // thanks IDE for taking that job for me. I will change that soon.
  return promise.data.map((entity: { id: any; title: any; description: any; key: any; timestamp: any; project: any; start_date: any; duration: any; is_expected: any; duration_unit: any; }) => {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      key: entity.key,
      timestamp: entity.timestamp,
      projectId: entity.project,
      startDate: entity.start_date,
      duration: entity.duration,
      isExpected: entity.is_expected,
      durationUnit: entity.duration_unit,
    }
  })
}


export const deleteEvent = async (projectKey: string, eventKey: string) => {
  const url = `${BASE_API_URL}/v1/projects/retrieve/${projectKey}/events/delete/${eventKey}`
  const headers = {headers: {...getAuthHeaders()}}
  return await axios.delete(url, headers)
}


export const createEvent = async (projectKey: string, data: CreateEventFormData): Promise<Event> => {
  const url = `${BASE_API_URL}/v1/projects/retrieve/${projectKey}/events/create`
  const headers = {headers: {...getAuthHeaders()}}
  const payload = {
    title: data.title,
    description: data.description,
    start_date: data.startDate,
    duration: data.duration,
    is_expected: data.isExpected,
    duration_unit: data.durationUnit,
  }
  const promise = await axios.post(url, payload, headers)
  return {
    id: promise.data.id,
    title: promise.data.title,
    description: promise.data.description,
    key: promise.data.key,
    timestamp: promise.data.timestamp,
    projectId: promise.data.project,
    startDate: promise.data.start_date,
    duration: promise.data.duration,
    isExpected: promise.data.is_expected,
    durationUnit: promise.data.duration_unit,
  }
}


export const getAllProjectLinksForProject = async (projectKey: string): Promise<ProjectLink[]> => {
  const url = `${BASE_API_URL}/v1/projects/retrieve/${projectKey}/project-links/all`
  const headers = {headers: {...getAuthHeaders()}}
  const promise = await axios.get(url, headers)
  // lol - that sucks!
  // thanks IDE for taking that job for me. I will change that soon.
  return promise.data.map((entity: { id: any; title: any; description: any; key: any; timestamp: any; project: any; url: any; }) => {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      key: entity.key,
      timestamp: entity.timestamp,
      projectId: entity.project,
      url: entity.url,
    }
  })
}


export const deleteProjectLink = async (projectKey: string, projectLinkKey: string) => {
  const url = `${BASE_API_URL}/v1/projects/retrieve/${projectKey}/project-links/delete/${projectLinkKey}`
  const headers = {headers: {...getAuthHeaders()}}
  return await axios.delete(url, headers)
}


export const createProjectLink = async (projectKey: string, data: CreateSourceFormData): Promise<ProjectLink> => {
  const url = `${BASE_API_URL}/v1/projects/retrieve/${projectKey}/project-links/create`
  const headers = {headers: {...getAuthHeaders()}}
  const promise = await axios.post(url, {...data}, headers)
  return {
    id: promise.data.id,
    title: promise.data.title,
    description: promise.data.description,
    key: promise.data.key,
    timestamp: promise.data.timestamp,
    projectId: promise.data.project,
    url: promise.data.url,
  }
}
