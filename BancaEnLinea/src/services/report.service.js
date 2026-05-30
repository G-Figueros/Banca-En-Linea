import { apiGet } from './http.service'

export const getSummaryReport = () => {
  return apiGet('/allreportes')
}

export const getLoansReport = () => {
  return apiGet('/reporte/prestamos')
}

export const getArrearsReport = () => {
  return apiGet('/reporte/pagos')
}

export const getTransfersReport = () => {
  return apiGet('/reporte/transferencias')
}

export const getPaymentsReport = () => {
  return apiGet('/reporte/pagos')
}

export const getUsersReport = () => {
  return apiGet('/reporte/usuarios')
}

export const calculateArrears = () => {
  throw new Error('No hay endpoint backend para calcular moras')
}

export const getArrears = () => {
  return apiGet('/reporte/pagos')
}