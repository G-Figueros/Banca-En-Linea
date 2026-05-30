import { apiGet, apiPost, apiPut, apiPatch } from './http.service'

export const getUsers = () => {
  return apiGet('/api/users')
}

export const getUserById = (id) => {
  return apiGet(`/api/users/${id}`)
}

export const createUser = (user) => {
  return apiPost('/api/users', user)
}

export const updateUser = (id, user) => {
  return apiPut(`/api/users/${id}`, user)
}

export const updateUserStatus = (id, status) => {
  return apiPatch(`/api/users/${id}/status`, { status })
}

export const updateUserRole = (id, role) => {
  return apiPatch(`/api/users/${id}/role`, { role })
}