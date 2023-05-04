import { API_PATH } from '../config/path/API_PATH'
import { apiService } from '../httpRequest'

export const authServices = {
  login(body?: any) {
    return apiService.post(`${API_PATH.auth}/login`, {
      ...body,
    })
  },
}
