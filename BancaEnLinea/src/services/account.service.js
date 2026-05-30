import { apiGet, apiPost, apiPut } from './http.service'

export const getMyAccounts = () => {
  return apiGet('/allcuentas')
}

export const getAllAccounts = () => {
  return apiGet('/allcuentas')
}

export const getAccountById = (id) => {
  return apiGet(`/api/Cuentas/cuenta/${id}`)
}

export const getAccountMovements = (id) => {
  return apiGet('/alltransferencias')
}

export const createAccount = (account) => {
  return apiPost('/createcuenta', account)
}

export const updateAccountStatus = (id) => {
  return apiPut(`/togglecuenta/${id}`)
}