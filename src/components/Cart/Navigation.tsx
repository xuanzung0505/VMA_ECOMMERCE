import cart_empty_url from '../../../public/assets/Cart-Empty.png'
import shopee_url from '../../public/assets/Shopee-Logo.png'
// import '../../public/styles/Navigation.scss'
import '../../public/styles/Cart/Navigation.scss'

import { Link } from 'react-router-dom'

const { defaultAvatar } = require('../Global/avatar')

export const Navigation = ({ user }) => {
  return (
    <div className="containerNav">
      <div className="navigation__container cart">
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

              {!!user ? (
                <>
                  <div className="navigation__header__button user">
                    <div
                      className="avatar"
                      style={{
                        backgroundImage: !!user.avatar
                          ? `url(${user.avatar})`
                          : `url(${defaultAvatar})`,
                      }}
                    ></div>
                    {user.email}

                    <div className="dropDown">
                      <div className="option">
                        <Link to={'#'}>Tài khoản của tôi</Link>
                      </div>
                      <div className="option">
                        <Link to={'/logout'}>Đăng xuất</Link>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="navigation__header__button">
                    <Link to="/register">Đăng Ký</Link>
                  </div>
                  <div className="divider"></div>
                  <div className="navigation__header__button">
                    <Link to="/login">Đăng Nhập</Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>

        <div className="navigation__container login">
          <div className="navigation login">
            <div className="navigation__header">
              <div className="navigation__header__left">
                <div className="navigation__body__logo">
                  <Link to="/">
                    <img src={shopee_url}></img>
                  </Link>
                </div>
                <div className="divider cart"></div>
                <div className="bigText">Giỏ hàng</div>
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
    </div>
    // <Navigation
  )
}
