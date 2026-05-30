import { buildApiUrl } from '../config/api.config'

const defaultHeaders = {
  'Content-Type': 'application/json'
}

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `Error HTTP ${response.status}`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export const apiGet = async (endpoint) => {
  const response = await fetch(buildApiUrl(endpoint), {
    method: 'GET',
    headers: defaultHeaders
  })

  return handleResponse(response)
}

export const apiPost = async (endpoint, body) => {
  const response = await fetch(buildApiUrl(endpoint), {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(body)
  })

  return handleResponse(response)
}

export const apiPut = async (endpoint, body) => {
  const response = await fetch(buildApiUrl(endpoint), {
    method: 'PUT',
    headers: defaultHeaders,
    body: JSON.stringify(body)
  })

  return handleResponse(response)
}

export const apiPatch = async (endpoint, body) => {
  const response = await fetch(buildApiUrl(endpoint), {
    method: 'PATCH',
    headers: defaultHeaders,
    body: JSON.stringify(body)
  })

  return handleResponse(response)
}

export const apiDelete = async (endpoint) => {
  const response = await fetch(buildApiUrl(endpoint), {
    method: 'DELETE',
    headers: defaultHeaders
  })

  return handleResponse(response)
}