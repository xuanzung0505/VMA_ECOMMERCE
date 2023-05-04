import { useContext, useEffect, useState } from 'react'
import { LoginForm } from '../components/Login/LoginForm'
import { Navigation } from '../components/Login/Navigation'
import { useGlobalContext } from '..'
import { useNavigate } from 'react-router-dom'

import { useCookies } from 'react-cookie'
// import useCookies from 'universal-cookie'

const LoginPage = () => {
  const [userProp, setUserProp] = useState(null)
  const { setUser } = useGlobalContext()

  const [cookies, setCookie, removeCookie] = useCookies()

  //redirect hook
  const navigate = useNavigate()

  useEffect(() => {
    // console.log(userProp)
    if (!!userProp) {
      //setUser in global context
      setUser(userProp)
      navigate('/')
    }
  }, [userProp])

  // removeCookie('token')

  return (
    <div className="container">
      <Navigation />
      <LoginForm setUser={setUserProp} setCookie={setCookie} />
    </div>
  )
}

export { LoginPage }
