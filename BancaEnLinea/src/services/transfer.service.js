import { apiGet, apiPost } from './http.service'

export const getMyTransfers = () => {
  return apiGet('/api/transfers/my')
}

export const getTransferById = (id) => {
  return apiGet(`/api/transfers/${id}`)
}

export const createTransfer = (transfer) => {
  return apiPost('/api/transfers', transfer)
}