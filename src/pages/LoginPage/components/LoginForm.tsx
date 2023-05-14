import '../../../assets/styles/Login/LoginForm.scss'
import formBackground from '../../../assets/images/Shopee-Login-BG.png'
import '../../../assets/styles/common.scss'
import { authServices } from '../../../services/authServices'
import { useState } from 'react'
import 'react-notifications/lib/notifications.css'
import { NotiManager } from '../../../utils/notification'
import { redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'

const Form = ({ setUser, setCookie }) => {
  const [text, setText] = useState()
  const [password, setPassword] = useState()

  const handleTextChange = (e: any) => {
    setText(e.target.value)
  }
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }
  const handleClick = (e: any) => {
    e.preventDefault()
    // console.log(text + ',' + password)
    authServices
      .login({
        email: text,
        password: password,
      })
      .then((res) => {
        // console.log(res.data)

        //notification
        NotiManager.success('Đăng nhập thành công')

        //set user in props, not global context
        setUser(res.data.user)

        //set client side cookie
        // const cookie = new Cookies()
        // cookie.set('token', res.data.token)
        setCookie('token', res.data.token)
      })
      .catch((err) => {
        // console.log(err)
        if (err.name === 'ZodError') {
          for (let issue in err.issues) {
            // console.log(err.issues[issue])

            NotiManager.error(err.issues[issue].message)
          }
        } else NotiManager.error('Thông tin đăng nhập không đúng')
      })
  }

  return (
    <form>
      <div className="form__body">
        <input
          type="text"
          placeholder="Email/Số điện thoại/Tên đăng nhập"
          onChange={handleTextChange}
        ></input>
        <input
          type="password"
          placeholder="Mật khẩu"
          onChange={handlePasswordChange}
        ></input>
        <input type="submit" value={'ĐĂNG NHẬP'} onClick={handleClick}></input>
      </div>
    </form>
  )
}

const LoginForm = ({ setUser, setCookie }) => {
  return (
    <>
      <div
        className="form__container login"
        //
      >
        <div
          className="form__banner login"
          style={{ backgroundImage: `url(${formBackground})` }}
        ></div>
        <div className="form__content login">
          <div className="form__header">Đăng nhập</div>
          <Form setUser={setUser} setCookie={setCookie} />
          <div className="form__row">
            <a href="#">Quên mật khẩu</a>
            <a href="#">Đăng nhập với SMS</a>
          </div>
          <div className="form__row">
            <div className="divider-horizontal"></div>
            HOẶC
            <div className="divider-horizontal"></div>
          </div>
          <div className="form__row">
            <button className="btn-type1">
              <i
                className="fa-brands fa-facebook fa-xl"
                style={{ color: '#005eff' }}
              ></i>
              Facebook
            </button>
            <button className="btn-type1">
              <i
                className="fa-brands fa-google fa-xl"
                style={{ color: '#ff0000' }}
              ></i>
              Google
            </button>
          </div>
          <div className="form__row center CommonPaddingTop-1">
            <div>
              Bạn mới biết đến Shopee?
              <a href="#" className="CommonTextColor-1 CommonFontSize-1">
                Đăng ký
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export { LoginForm }
