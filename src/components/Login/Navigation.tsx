import shopee_url from '../../public/assets/Shopee-Logo.png'

const Navigation = () => {
  return (
    <div className="navigation__container login">
      <div className="navigation login">
        <div className="navigation__header">
          <div className="navigation__header__left login">
            <div className="navigation__body__logo login">
              <a href="https://shopee.vn">
                <img src={shopee_url}></img>
              </a>
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
