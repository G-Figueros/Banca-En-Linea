import { apiGet, apiPost, apiPatch } from './http.service'

export const getMyAccounts = () => {
  return apiGet('/allcuentas')
}

export const getAllAccounts = () => {
  return apiGet('/allcuentas')
}

export const getAccountById = (id) => {
  return apiGet(`/api/Cuentas/cuenta/${id}`)
}

export const getAccountMovements = () => {
  return apiGet('/allmovimientoscuenta')
}

export const createAccount = (account) => {
  return apiPost('/createcuenta', account)
}

export const updateAccountStatus = (id, status) => {
  return apiPatch(`/cuenta/${id}/status`, { status })
}