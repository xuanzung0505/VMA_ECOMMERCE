import { API_PATH } from '../config/path/API_PATH'
import { apiService } from '../httpRequest'

export const categoryServices = {
  getList(params?: any) {
    return apiService.get(API_PATH.category, {
      params,
    })
  },

  getById(id: string) {
    return apiService.get(`${API_PATH.category}/${id}`)
  },
}
