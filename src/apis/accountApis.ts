import api from './apiInstance'

export const fetchGetAccount = async () => {
  const response = await api.get('/account/get-account')
  return response.data
}
