import { API_PATH } from '../config/path/API_PATH'
import { apiService } from '../httpRequest'

export const varianceServices = {
  getList(params?: any) {
    return apiService.get(API_PATH.variance, {
      params,
      // body,
    })
  },

  getById(id: string) {
    return apiService.get(`${API_PATH.variance}/${id}`)
  },
}
