import { apiGet, apiPost, apiPatch } from './http.service'

export const getMyAccounts = () => {
  return apiGet('/allcuentas')
}

export const getAllAccounts = () => {
  return apiGet('/api/accounts')
}

export const getAccountById = (id) => {
  return apiGet(`/api/accounts/${id}`)
}

export const getAccountMovements = (id) => {
  return apiGet(`/api/accounts/${id}/movements`)
}

export const createAccount = (account) => {
  return apiPost('/api/accounts', account)
}

export const updateAccountStatus = (id, status) => {
  return apiPatch(`/api/accounts/${id}/status`, { status })
}