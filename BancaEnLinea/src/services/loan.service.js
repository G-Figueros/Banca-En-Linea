import { apiGet, apiPost, apiPut } from './http.service'

export const createLoanRequest = (loanRequest) => {
  return apiPost('/createsolicitudprestamo', loanRequest)
}

export const getMyLoanRequests = () => {
  return apiGet('/allsolicitudprestamos')
}

export const getLoanRequests = () => {
  return apiGet('/allsolicitudprestamos')
}

export const getLoanRequestById = (id) => {
  return apiGet(`/solicitudprestamo/${id}`)
}

export const approveLoanRequest = (id) => {
  return apiPut(`/togglesolicitudprestamo/${id}`)
}

export const rejectLoanRequest = (id) => {
  return apiPut(`/togglesolicitudprestamo/${id}`)
}

export const getMyLoans = () => {
  return apiGet('/allprestamos')
}

export const getAllLoans = () => {
  return apiGet('/allprestamos')
}

export const getLoanById = (id) => {
  return apiGet(`/prestamo/${id}`)
}

export const getLoanInstallments = () => {
  throw new Error('No hay endpoint backend definido para cuotas de préstamo')
}

export const disburseLoan = () => {
  throw new Error('No hay endpoint backend definido para desembolso de préstamos')
}