import { apiGet, apiPost, apiPut } from './http.service'

export const getUsers = () => {
  return apiGet('/allusers')
}

export const getUserById = (id) => {
  return apiGet(`/user/${id}`)
}

export const createUser = (user) => {
  return apiPost('/createuser', user)
}

export const updateUser = (id, user) => {
  return apiPut(`/edituser/${id}`, user)
}

export const updateUserStatus = (id) => {
  return apiPut(`/toggleuser/${id}`)
}

export const updateUserRole = (id, role) => {
  return apiPut(`/edituser/${id}`, { role })
}