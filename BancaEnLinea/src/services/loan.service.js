import { apiGet, apiPost } from './http.service'

export const createLoanRequest = (loanRequest) => {
  return apiPost('/api/loan-requests', loanRequest)
}

export const getMyLoanRequests = () => {
  return apiGet('/api/loan-requests/my')
}

export const getLoanRequests = (status = '') => {
  const query = status ? `?status=${status}` : ''
  return apiGet(`/api/loan-requests${query}`)
}

export const getLoanRequestById = (id) => {
  return apiGet(`/api/loan-requests/${id}`)
}

export const approveLoanRequest = (id, data) => {
  return apiPost(`/api/loan-requests/${id}/approve`, data)
}

export const rejectLoanRequest = (id, observaciones) => {
  return apiPost(`/api/loan-requests/${id}/reject`, { observaciones })
}

export const getMyLoans = () => {
  return apiGet('/api/loans/my')
}

export const getAllLoans = () => {
  return apiGet('/api/loans')
}

export const getLoanById = (id) => {
  return apiGet(`/api/loans/${id}`)
}

export const getLoanInstallments = (id) => {
  return apiGet(`/api/loans/${id}/installments`)
}

export const disburseLoan = (id, data) => {
  return apiPost(`/api/loans/${id}/disburse`, data)
}