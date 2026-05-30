import { apiGet, apiPost } from './http.service'

export const getMyPayments = () => {
  return apiGet('/api/loan-payments/my')
}

export const getAllPayments = () => {
  return apiGet('/api/loan-payments')
}

export const createLoanPayment = (payment) => {
  return apiPost('/api/loan-payments', payment)
}