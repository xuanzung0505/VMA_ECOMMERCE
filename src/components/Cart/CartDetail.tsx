import '../../public/styles/Cart/CartDetail.scss'
const { cartItems } = require('./cart')
import freeCar from '../../public/assets/free-car.png'
import mallVendor from '../../public/assets/Mall-vendor.png'
import chat_logo from '../../public/assets/chat.png'
import cartItemBanner from '../../public/assets/cartItemBanner.png'

import { Link } from 'react-router-dom'

const groupByVendorName = (cartItems: any[]) => {
  let reduced = cartItems.reduce((result: any, item: any) => {
    let vendorName = item.variance.product.vendor.name

    //neu result[vendorName] undefine thi khoi tao
    result[vendorName] = result[vendorName] ?? []
    result[vendorName].push(item)

    return result
  }, {})

  let result = []
  for (let key in reduced) {
    let group = {
      vendorName: key,
      vendorItems: reduced[key],
    }
    result.push(group)
  }

  return result
}

const CartHeader = () => {
  return (
    <div className="cart__header">
      <div className="checkColumn">
        <input type="checkbox" />
      </div>
      <div className="detailColumn">Sản Phẩm</div>
      <div className="unitPriceColumn">Đơn Giá</div>
      <div className="quantityColumn">Số Lượng</div>
      <div className="itemTotalPriceColumn">Số Tiền</div>
      <div className="actionColumn">Thao Tác</div>
    </div>
  )
}

const CartItemGroup = ({ vendorName, vendorItems }) => {
  return (
    <div className="cart__section">
      <div className="cart__item">
        <div className="checkColumn">
          <input type="checkbox" />
        </div>
        <div className="detailColumn">
          <div
            className="mallLogo"
            style={{ backgroundImage: `url(${mallVendor})` }}
          ></div>
          {vendorName}
          <div
            className="chatLogo"
            style={{ backgroundImage: `url(${chat_logo})` }}
          ></div>
        </div>
        <div className="unitPriceColumn"></div>
        <div className="quantityColumn"></div>
        <div className="itemTotalPriceColumn"></div>
        <div className="actionColumn"></div>
      </div>
      {vendorItems.map((item, index) => {
        return (
          <>
            {/* <div className="divider-row">
              <div className="divider"></div>
            </div> */}
            <div className="cart__item">
              <div className="checkColumn">
                <input type="checkbox" />
              </div>
              <div className="detailColumn">
                <Link to="#">
                  <div
                    className="item__logo"
                    style={{
                      backgroundImage: `url(${item.variance.product.logo})`,
                    }}
                  ></div>
                </Link>
                <div className="item__detail">
                  <Link to="#" className="title">
                    {item.variance.product.title}
                  </Link>
                  <div
                    className="banner"
                    style={{
                      backgroundImage: `url(${cartItemBanner})`,
                    }}
                  ></div>
                  <div className="promotion">7 Ngày Miễn Phí Trả Hàng</div>
                </div>
                <div className="item__variance">
                  <div className="choose_variance">
                    Phân Loại Hàng:
                    <i className="fa-solid fa-caret-down fa-sm"></i>
                  </div>
                  <div className="result">
                    {item.variance.attribute.reduce(
                      (result: any, item: any) => {
                        let myVal = Object.keys(item).map((key, index) => {
                          return item[key]
                        })

                        return result + myVal.toString() + '/'
                      },
                      ''
                    )}
                  </div>
                </div>
              </div>
              <div className="unitPriceColumn row">
                đ{item.variance.unitPrice}
              </div>
              <div className="quantityColumn">
                <button>-</button>
                <input type="text" value={item.quantity}></input>
                <button>+</button>
              </div>
              <div className="itemTotalPriceColumn row">
                đ{item.variance.unitPrice * item.quantity}
              </div>
              <div className="actionColumn row">
                <div className="actionDelete">Xóa</div>
                <div className="actionFindSimilar">
                  <div className="actionCaption">Tìm Sản Phẩm Tương Tự</div>
                  <div className="actionDropdown">
                    <i className="fa-solid fa-caret-down fa-sm"></i>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      })}
    </div>
  )
}

const CartDetail = () => {
  const selectedCartItem = []

  //   console.log('grouped cart items:')
  const groupedCartItems = groupByVendorName(cartItems)
  console.log(groupedCartItems)

  //   console.log('iterate through this object:')
  //   Object.keys(groupedCartItems).map((key: any) => {
  //     console.log(key, groupedCartItems[key])
  //   })

  return (
    <div className="cart__container">
      <div className="cart">
        <div className="cart__detail">
          <div className="cart__row">
            <img src={freeCar}></img>Nhấn vào mục Mã giảm giá ở cuối trang để
            hưởng miễn phí vận chuyển bạn nhé!
          </div>
          <CartHeader />
          {groupedCartItems.map((item: any, index) => {
            return (
              <CartItemGroup
                vendorName={item.vendorName}
                vendorItems={item.vendorItems}
              />
            )
          })}
          <div className="cart__footer">footer</div>
        </div>
      </div>
    </div>
  )
}

export { CartDetail }
