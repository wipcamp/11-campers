import axios from 'axios'
import Cookies from 'js-cookie'


const createInstance = (headers) => {
  return axios.create({
    baseURL: process.env.REACT_APP_PATH_REGISTANCE,
    headers: {
      'Authorization': `Bearer ${Cookies.get('JWT')}`,
      'Content-Type': 'application/json'
    }
  })
}

const handleResponse = res => !res.data.error ? Promise.resolve(res) : Promise.reject(new Error(res.data.error))

const catchError = err => Promise.reject(err.message)

export default {
  get: (path, headers = {}) => (
    createInstance(headers)
      .get(path)
      .then(handleResponse)
      .catch(catchError)
  ),
  post: (path, body = {}, headers = {}) => (
    createInstance(headers)
      .request({
        url: path,
        method: 'POST',
        data: body
      })
      .then(handleResponse)
      .catch(catchError)
  ),
  put: (path, body = {}, headers = {}) => (
    createInstance(headers)
      .request({
        url: path,
        method: 'PUT',
        data: body
      })
      .then(handleResponse)
      .catch(catchError)
  )
}
