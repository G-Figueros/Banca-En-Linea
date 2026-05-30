export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const buildApiUrl = (endpoint) => {
  if (!API_BASE_URL) {
    throw new Error('La variable VITE_API_BASE_URL no está configurada')
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${API_BASE_URL}${cleanEndpoint}`
}