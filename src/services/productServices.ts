import { API_PATH } from '../config/path/API_PATH'
import { apiService } from '../httpRequest'

export const productServices = {
  getList(params?: any) {
    return apiService.get(API_PATH.product, {
      params,
    })
  },

  getById(id: string) {
    return apiService.get(`${API_PATH.product}/${id}`)
  },
}
