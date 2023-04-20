import cart_empty_url from '../../../public/assets/Cart-Empty.png'
import shopee_url from '../../public/assets/Shopee-Logo.png'
import '../../public/styles/Navigation.scss'

import { Link } from 'react-router-dom'

export const Navigation = () => {
  return (
    <div className="containerNav">
      <div className="navigation__container">
        <nav className="navigation">
          <div className="navigation__header">
            <div className="navigation__header__left">
              <div className="navigation__header__button">Kênh Người Bán</div>
              <div className="divider"></div>
              <div className="navigation__header__button">
                Trở thành Người bán Shopee
              </div>
              <div className="divider"></div>
              <div className="navigation__header__button">Tải ứng dụng</div>
              <div className="divider"></div>
              <div className="navigation__header__button__connect">
                Kết nối
                <a href="https://facebook.com">
                  <i className="fa-brands fa-facebook fa-lg"></i>
                </a>
                <a href="https://instagram.com">
                  <i className="fa-brands fa-instagram fa-lg"></i>
                </a>
              </div>
            </div>
            <div className="navigation__header__right">
              <div className="navigation__header__button">
                <i className="fa-regular fa-bell fa-xl"></i>
                Thông Báo
              </div>
              <div className="navigation__header__button">
                <i className="fa-regular fa-circle-question fa-xl"></i>
                Hỗ Trợ
              </div>
              <div className="navigation__header__button">
                <i className="fa-sharp fa-solid fa-globe fa-lg"></i>
                Tiếng Việt
                <i className="fa-solid fa-chevron-down fa-lg"></i>
              </div>
              <div className="navigation__header__button">Đăng Ký</div>
              <div className="divider"></div>
              <div className="navigation__header__button">
                <Link to="/login">Đăng Nhập</Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="navigation__container login">
        <div className="navigation login">
          <div className="navigation__header">
            <div className="navigation__header__left cart">
              <div className="navigation__body__logo login">
                <Link to="/">
                  <img src={shopee_url}></img>
                </Link>
              </div>
              <div className="divider cart"></div>
              <div className="bigText cart">Giỏ hàng</div>
            </div>
            <div className="navigation__header__right cart">
              <div className="navigation__body__searchSection cart">
                <form method="POST" action="/search">
                  <div className="navigation__body__searchSection__searchbox">
                    <input
                      className="cart"
                      type="search"
                      placeholder="ShopeeFood - Giảm Tới 75.000Đ"
                    ></input>
                    <button>
                      <i
                        className="fa-solid fa-magnifying-glass"
                        style={{ color: '#ffffff' }}
                      ></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <Navigation
  )
}
