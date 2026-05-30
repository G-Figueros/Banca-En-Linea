import { apiGet, apiPost } from './http.service'

export const getSummaryReport = () => {
  return apiGet('/api/reports/summary')
}

export const getLoansReport = () => {
  return apiGet('/api/reports/loans')
}

export const getArrearsReport = () => {
  return apiGet('/api/reports/arrears')
}

export const getTransfersReport = () => {
  return apiGet('/api/reports/transfers')
}

export const getPaymentsReport = () => {
  return apiGet('/api/reports/payments')
}

export const calculateArrears = () => {
  return apiPost('/api/arrears/calculate', {})
}

export const getArrears = () => {
  return apiGet('/api/arrears')
}