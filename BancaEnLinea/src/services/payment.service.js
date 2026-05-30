import { apiGet, apiPost, apiPut } from './http.service'

export const getMyPayments = () => {
  return apiGet('/allpagos')
}

export const getAllPayments = () => {
  return apiGet('/allpagos')
}

export const createLoanPayment = (payment) => {
  return apiPost('/createpago', payment)
}

export const updatePayment = (id, payment) => {
  return apiPut(`/editpago/${id}`, payment)
}

export const togglePayment = (id) => {
  return apiPut(`/togglepago/${id}`)
}