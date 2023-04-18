import '../../public/styles/Login/LoginForm.scss'
import formBackground from '../../public/assets/Shopee-Login-BG.png'
import '../../public/styles/common.scss'

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
      <div className="form__content login">
        <div className="form__header">Đăng nhập</div>
        <form action="/api/login">
          <div className="form__body">
            <input
              type="text"
              placeholder="Email/Số điện thoại/Tên đăng nhập"
            ></input>
            <input type="password" placeholder="Mật khẩu"></input>
            <input type="submit" value={'ĐĂNG NHẬP'}></input>
          </div>
        </form>
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
  )
}

export { LoginForm }
