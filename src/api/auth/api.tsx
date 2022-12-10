import axios from "axios";

import {BASE_API_URL, getAuthHeaders} from "../util";

import {AuthFormData, Token, AuthenticatedUser} from "./forms"


export const performAuthentication = async (data: AuthFormData): Promise<Token | null> => {
  const url = `${BASE_API_URL}/v1/account/perform-authentication`
  const token = await axios.post(url, {...data})
    .then(r => r.data.token)
    .catch(e => {
      console.log(e)
      return null
    })
  return token !== null ? {token: token} : null
}

export const getCsrfToken = async (): Promise<null> => {
  await axios.get(`${BASE_API_URL}/v1/account/get-csrf-token`)
  return null
}


export const getAuthenticatedUser = async (): Promise<AuthenticatedUser | null> => {
  const url = `${BASE_API_URL}/v1/account/get-authenticated-user`
  const headers = {headers: {...getAuthHeaders()}}
  if (headers.headers.Authorization === null && headers.headers["X-CSRFToken"] === null) throw Error()
  const promise = await axios.get(url, headers)
    .then(r => {
      return {
        id: r.data.id,
        firstName: r.data.first_name,
        lastName: r.data.last_name,
        email: r.data.email_address,
        company: {
          id: r.data.company.id,
          name: r.data.company.name,
          key: r.data.company.key
        }
      }
    })
    .catch(_ => null)

  return promise
}
