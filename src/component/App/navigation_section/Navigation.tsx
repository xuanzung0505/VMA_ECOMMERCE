import '../../../public/styles/Navigation.scss'
import shopee_url from '../../../public/Shopee-Logo-inverted.png'
import cart_empty_url from '../../../public/Cart-Empty.png'

export const Navigation = () => {
  return (
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
            <div className="navigation__header__button">Đăng Nhập</div>
          </div>
        </div>
        <div className="navigation__body">
          <div className="navigation__body__logo">
            <a href="https://shopee.vn">
              <img src={shopee_url}></img>
            </a>
          </div>
          <div className="navigation__body__searchSection">
            <form method="POST" action="/search">
              <div className="navigation__body__searchSection__searchbox">
                <input
                  type="search"
                  placeholder="Đăng ký và nhận voucher lên đến 70k!"
                ></input>
                <button>
                  <i
                    className="fa-solid fa-magnifying-glass"
                    style={{ color: '#ffffff' }}
                  ></i>
                </button>
              </div>
            </form>
            <div className="navigation__body__searchSection__recommendation">
              <a href="#">Đồ Dùng Học Tập</a>
              <a href="#">Dép</a>
              <a href="#">Set Đồ Nữ</a>
              <a href="#">Diều Sáo</a>
              <a href="#">Váy</a>
              <a href="#">Card Blackpink</a>
              <a href="#">Hộp Bút</a>
              <a href="#">Vợt Cầu Lông</a>
              <a href="#">Mô Hình One Piece</a>
              <a href="#">Giày Đá Bóng</a>
              <a href="#">Áo Croptop</a>
            </div>
          </div>
          <div className="navigation__body__cart">
            <i className="fa-solid fa-cart-shopping fa-2xl"></i>
          </div>
          <div className="navigation__body__cart__info">
            <div className="navigation__body__cart__info__empty">
              <img src={cart_empty_url}></img>
              <div className="navigation__body__cart__info__empty__caption">
                Chưa Có Sản Phẩm
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
