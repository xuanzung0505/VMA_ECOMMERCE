import shopee_url from '../../public/assets/Shopee-Logo.png'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className="navigation__container login">
      <div className="navigation login">
        <div className="navigation__header">
          <div className="navigation__header__left login">
            <div className="navigation__body__logo login">
              <Link to="/">
                <img src={shopee_url}></img>
              </Link>
            </div>
            <div className="bigText">Đăng nhập</div>
          </div>
          <div className="navigation__header__right login">
            <a href="#">Bạn cần giúp đỡ?</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Navigation }
