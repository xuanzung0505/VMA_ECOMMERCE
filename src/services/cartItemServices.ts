import { API_PATH } from '../config/path/API_PATH'
import { apiService } from '../httpRequest'

export const cartItemServices = {
  getList(params?: any) {
    return apiService.setHeader().get(API_PATH.cartItem, {
      params: params,
      withCredentials: true,
    })
  },

  getById(id: string) {
    return apiService.setHeader().get(`${API_PATH.cartItem}/${id}`)
  },

  updateById(id: string, body: any) {
    return apiService.setHeader().patch(`${API_PATH.cartItem}/${id}`, body)
  },

  create(body: any) {
    return apiService.setHeader().post(API_PATH.cartItem, body)
  },

  deleteById(id: string) {
    return apiService.setHeader().delete(`${API_PATH.cartItem}/${id}`)
  },
}
