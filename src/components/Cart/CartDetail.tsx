import '../../public/styles/Cart/CartDetail.scss'
const { cartItems } = require('./cart')
import freeCar from '../../public/assets/free-car.png'
import blankCar from '../../public/assets/blank-car.png'
import mallVendor from '../../public/assets/Mall-vendor.png'
import chat_logo from '../../public/assets/chat.png'
import cartItemBanner from '../../public/assets/cartItemBanner.png'
import voucherLogo from '../../public/assets/voucher.png'

import { Link } from 'react-router-dom'

const groupByVendorName = (cartItems: any[]) => {
  let reduced = cartItems.reduce((result: any, item: any) => {
    let vendorId = item.variance.product.vendor.id
    let vendorName = item.variance.product.vendor.name

    //neu result[vendorId] undefine thi khoi tao
    result[vendorId] = result[vendorId] ?? {}

    result[vendorId].vendorName = vendorName

    result[vendorId].items = result[vendorId].items ?? []
    result[vendorId].items.push(item)

    return result
  }, {})

  let result = []
  for (let key in reduced) {
    let group = {
      vendorId: key,
      vendorName: reduced[key].vendorName,
      vendorItems: reduced[key].items,
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
                ₫{item.variance.unitPrice}
              </div>
              <div className="quantityColumn">
                <button>-</button>
                <input type="text" value={item.quantity}></input>
                <button>+</button>
              </div>
              <div className="itemTotalPriceColumn row">
                ₫{item.variance.unitPrice * item.quantity}
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

      <div className="cart__item">
        <div className="checkColumn">
          {/* <input type="checkbox" /> */}
          <div
            className="voucherLogo"
            style={{ backgroundImage: `url(${voucherLogo})` }}
          ></div>
        </div>
        <div className="detailColumn">
          Shop Voucher giảm đến ₫60k
          <Link to={'#'}>Xem thêm voucher</Link>
        </div>
        <div className="unitPriceColumn"></div>
        <div className="quantityColumn"></div>
        <div className="itemTotalPriceColumn"></div>
        <div className="actionColumn"></div>
      </div>

      <div className="cart__item">
        <div className="checkColumn">
          {/* <input type="checkbox" /> */}
          <div
            className="blankCarLogo"
            style={{ backgroundImage: `url(${blankCar})` }}
          ></div>
        </div>
        <div className="detailColumn">
          Giảm ₫25.000 phí vận chuyển đơn tối thiểu ₫99.000
          <Link to={'#'}>Tìm hiểu thêm</Link>
        </div>
        <div className="unitPriceColumn"></div>
        <div className="quantityColumn"></div>
        <div className="itemTotalPriceColumn"></div>
        <div className="actionColumn"></div>
      </div>
    </div>
  )
}

const CartFooter = () => {
  return (
    <div className="cart__footer">
      <div className="cart__header">
        <div className="voucher cartFooter">
          <div
            className="voucherLogo"
            style={{ backgroundImage: `url(${voucherLogo})` }}
          ></div>
          Shoppe Voucher
        </div>
        <div className="coupon cartFooter">
          <Link to="#">Chọn hoặc nhập mã</Link>
        </div>
      </div>
      <div className="cart__header">
        <input type="checkbox" aria-disabled="true"></input>
        <div className="voucher cartFooter">
          <div className="voucherLogo" aria-disabled="true">
            <i
              className="fa-solid fa-circle-dollar-to-slot"
              style={{ color: '#ffd500' }}
            ></i>
          </div>
          <div className="voucherCaption" aria-disabled="true">
            Shoppe Xu
          </div>
          <div className="notify-none">Bạn chưa có Shopee Xu</div>
        </div>
        <div className="coupon cartFooter" aria-disabled="true">
          -₫0
        </div>
      </div>

      <div className="cart__header checkout">
        <div className="checkColumn">
          <input type="checkbox" />
        </div>
        <div className="chooseAll">{`Chọn Tất Cả(${0})`}</div>
        <div className="actionDelete">Xóa</div>
        <div className="actionSave">Lưu vào mục yêu thích</div>
        <div className="group">
          <div className="totalCaption">{`Tổng thanh toán(${0} sản phẩm):`}</div>
          <div className="totalValue">
            <div className="value">
              {`₫3000000`}
              <i className="fa-solid fa-chevron-up fa-xs"></i>
            </div>
            <div className="savedValue">
              <div className="caption">Tiết kiệm</div>
              <div className="value">{`₫10,41tr`}</div>
            </div>
          </div>
          <div className="order">
            <button>Mua hàng</button>
          </div>
        </div>
      </div>
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
          <CartFooter />
        </div>
      </div>
    </div>
  )
}

export { CartDetail }
