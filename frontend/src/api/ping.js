import { http } from './http'

export const pingApi = {
  ping() {
    return http.get('/api/ping')
  },
}
