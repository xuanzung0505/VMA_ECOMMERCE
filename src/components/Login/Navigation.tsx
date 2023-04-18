import shopee_url from '../../public/assets/Shopee-Logo.png'

const Navigation = () => {
  return (
    <div className="navigation__container login">
      <div className="navigation login">
        <div className="navigation__left login">
          <div className="navigation__body__logo">
            <a href="https://shopee.vn">
              <img src={shopee_url}></img>
            </a>
          </div>
          <div className="bigText login">Đăng nhập</div>
        </div>
        <div className="navigation__right login">
          <a href="#">Bạn cần giúp đỡ?</a>
        </div>
      </div>
    </div>
  )
}

export { Navigation }
