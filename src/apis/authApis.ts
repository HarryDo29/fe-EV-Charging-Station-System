import api from './apiInstance'

export const fetchLogin = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const fetchRegister = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { name, email, password })
  return response.data
}

export const fetchRefresh = async () => {
  const response = await api.post('/auth/refresh-access-token')
  return response.data
}

export const fetchLogout = async () => {
  const response = await api.post('/auth/logout')
  console.log('fetchLogout response', response)
  return response.data
}
