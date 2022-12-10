import axios from "axios";
import {AuthFormData} from "./forms"


const BASE_API_URL = process.env.REACT_APP_BASE_API_URL


export const postSignIn = async (data: AuthFormData) => {
  const url = `${BASE_API_URL}/auth`
  return await axios.post(url, {...data})
}
