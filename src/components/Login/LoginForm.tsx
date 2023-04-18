import '../../public/styles/Login/LoginForm.scss'
import formBackground from '../../public/assets/Shopee-Login-BG.png'

const LoginForm = () => {
  return (
    <div
      className="form__container login"
      //
    >
      <div
        className="form__banner login"
        style={{ backgroundImage: `url(${formBackground})` }}
      ></div>
      <form action="/api/login">Đăng nhập</form>
    </div>
  )
}

export { LoginForm }
