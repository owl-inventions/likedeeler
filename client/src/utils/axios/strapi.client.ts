import axios from 'axios'
import { STRAPI_BASE_URL, STRAPI_AUTH_TOKEN } from '@/configurations/strapi.conf'

export const strapiClient = axios.create({
  baseURL: STRAPI_BASE_URL
})

strapiClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${STRAPI_AUTH_TOKEN}`
    return config
  },
  (error) => Promise.reject(error)
)
