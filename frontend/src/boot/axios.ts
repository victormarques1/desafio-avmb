import { defineBoot } from '#q-app/wrappers'
import axios, { type AxiosInstance } from 'axios'

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

// Interceptor para adicionar o token às requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para renovar o token quando expirar
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // Marca a requisição como retry

      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        try {
          const refreshResponse = await api.post('http://localhost:3000/api/auth/refresh-token', {
            refreshToken,
          })

          localStorage.setItem('token', refreshResponse.data.token)

          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.token}`

          return api(originalRequest)
        } catch (refreshError) {
          console.error('Erro ao renovar o token:', refreshError)
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('role')

          window.location.href = '/login'
        }
      }
    }

    return Promise.reject(new Error(error.message || 'Erro desconhecido'))
  },
)

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
