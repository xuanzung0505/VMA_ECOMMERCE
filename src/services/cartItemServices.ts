import { API_PATH } from '../config/path/API_PATH'
import { apiService } from '../httpRequest'

export const cartItemServices = {
  getList(params?: any) {
    return apiService.get(API_PATH.cartItem, {
      params,
    })
  },

  getById(id: string) {
    return apiService.get(`${API_PATH.cartItem}/${id}`)
  },
}
