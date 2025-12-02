import api from './api.instance'

export const fetchGetAccount = async () => {
  console.log('api', api)
  const response = await api.get('/account')
  console.log('response', response)
  return response.data
}

export const fetchUpdateProfile = async (data: {
  avatar_url?: string
  full_name?: string
  email?: string
  phone_number?: string
}) => {
  const response = await api.put('/account', data)
  return response.data
}
