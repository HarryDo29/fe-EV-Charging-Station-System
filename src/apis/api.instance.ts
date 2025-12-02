// src/services/api.js
import axios from 'axios'
import { fetchRefresh } from './auth.api'
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL
console.log('baseURL', baseURL)

// create axios instance
const api = axios.create({
  baseURL: baseURL, // URL base
  timeout: 100000, // 100 giây
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// global state
let isRefreshing = false
type QueueItem = {
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
  config: AxiosRequestConfig
}
const failedQueue: QueueItem[] = []

const processQueue = (error: unknown | null = null) => {
  while (failedQueue.length) {
    const item = failedQueue.shift()!
    if (error) item.reject(error)
    else item.resolve(api(item.config))
  }
}

// Interceptor cho response
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }
    if (!originalRequest || !error.response) {
      return Promise.reject(error)
    }
    const status = error.response.status
    const refreshPath = '/auth/refresh-access-token'

    // check if error is 401 and not retried
    // (accessToken expired)
    if (originalRequest.url?.includes(refreshPath)) {
      processQueue(error)
      return Promise.reject(error)
    }

    if (status === 401) {
      if (originalRequest._retry) return Promise.reject(error)
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest })
        })
      }

      isRefreshing = true

      try {
        // call to /auth/refresh endpoint
        await fetchRefresh()
        // if refresh success, server will set new accessToken into cookie
        // now, try to retry original request (e.g. /profile)
        processQueue(null)
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError)
        const logoutEvent = new Event('force_logout')
        window.dispatchEvent(logoutEvent) // dispatch event to all windows
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // if other error (not 401), just return error
    return Promise.reject(error)
  }
)

export default api
