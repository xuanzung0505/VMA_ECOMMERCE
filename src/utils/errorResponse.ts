import { NotiManager } from './notification'

const addToCart = (err: any) => {
  if (err.status == 401) {
    NotiManager.error('Đã hết phiên đăng nhập')
  } else NotiManager.error('Thêm vào giỏ hàng thất bại')
}

const deleteCartItem = (err: any) => {
  if (err.status == 401) {
    NotiManager.error('Đã hết phiên đăng nhập')
  } else NotiManager.error('Xóa khỏi giỏ hàng thất bại')
}

const toggleQuantity = (err: any) => {
  if (err.status == 401) {
    NotiManager.error('Đã hết phiên đăng nhập')
  } else NotiManager.error('Sửa thông tin giỏ hàng thất bại')
}

const cart = {
  addToCart,
  deleteCartItem,
  toggleQuantity,
}

export const errorResponse = {
  cart,
}
