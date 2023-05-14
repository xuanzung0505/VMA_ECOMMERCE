import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../..'
import { NotiManager } from '../../utils/notification'

export const LogoutPage = () => {
  const navigate = useNavigate()

  const [cookies, setCookie, removeCookie] = useCookies()
  const { setUser, fetchCart } = useGlobalContext()

  useEffect(() => {
    removeCookie('token')
    setUser(null).then(() => {
      fetchCart()
    })
    navigate('/')
    NotiManager.success('Đăng xuất thành công')
  }, [])

  return <></>
}
