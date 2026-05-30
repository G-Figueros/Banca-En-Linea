import { apiGet, apiPost } from './http.service'

export const getMyTransfers = () => {
  return apiGet('/alltransferencias')
}

export const getTransferById = (id) => {
  return apiGet(`/transferencia/${id}`)
}

export const createTransfer = (transfer) => {
  return apiPost('/createtransferencia', transfer)
}