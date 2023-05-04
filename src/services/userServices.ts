import { API_PATH } from '../config/path/API_PATH'
import { apiService } from '../httpRequest'

export const userServices = {
  getList(params?: any) {
    return apiService.get(API_PATH.user, {
      params,
    })
  },

  getById(id: string) {
    return apiService.get(`${API_PATH.user}/${id}`)
  },
}
