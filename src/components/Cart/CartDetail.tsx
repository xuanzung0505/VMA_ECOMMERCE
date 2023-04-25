import '../../public/styles/Cart/CartDetail.scss'
import freeCar from '../../public/assets/free-car.png'
import blankCar from '../../public/assets/blank-car.png'
import mallVendor from '../../public/assets/Mall-vendor.png'
import chat_logo from '../../public/assets/chat.png'
import cartItemBanner from '../../public/assets/cartItemBanner.png'
import voucherLogo from '../../public/assets/voucher.png'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../..'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import blankCart from '../../public/assets/Cart-Empty-2.png'

const CartHeader = ({
  allState,
  setAllState,
  cartLength,
  //
  cartSelectedLength,
}) => {
  console.log('cart header re-render')

  const HeaderCheckbox = ({ allState, setAllState }) => {
    // const [state, setState] = useState(allState)

    const handleChange = () => {
      const newState = !allState

      if (newState === true) {
        console.log('gonna change')
        setAllState(newState)
      }
      // console.log('done set allState')
      // return newState
    }

    return (
      <input
        type="checkbox"
        onChange={handleChange}
        //
        checked={allState}
      />
    )
  }

  useEffect(() => {
    if (cartSelectedLength === cartLength) {
      // console.log('cartSelectedLength' + cartSelectedLength)
      // console.log('cartLength' + cartSelectedLength)
      setAllState(true)
    } else {
      setAllState(false)
    }
  }, [cartSelectedLength])

  return (
    <div className="cart__header">
      <div className="checkColumn">
        <HeaderCheckbox allState={allState} setAllState={setAllState} />
      </div>
      <div className="detailColumn">Sản Phẩm</div>
      <div className="unitPriceColumn">Đơn Giá</div>
      <div className="quantityColumn">Số Lượng</div>
      <div className="itemTotalPriceColumn">Số Tiền</div>
      <div className="actionColumn">Thao Tác</div>
    </div>
  )
}

const CartItemGroupCheckbox = ({
  globalState,
  setGlobalState,
  selectedSize,
  groupSize,
}) => {
  // const { toggleSelectGroup } = useGlobalContext()

  const handleChange = () => {
    const newState = !globalState

    // setGlobalState(newState)
    if (newState === true)
      // setGlobalState((value: any) => {
      //   console.log(`parent check: ${newState}`)
      //   // value = newState
      //   return newState
      // })
      setGlobalState(newState)
  }

  console.log(`selectedSize:${selectedSize},groupSize:${groupSize}`)

  useEffect(() => {
    if (selectedSize === groupSize) {
      setGlobalState(true)
    }
  }, [selectedSize])

  return (
    <div>
      <input
        type="checkbox"
        onChange={handleChange}
        checked={globalState}
      ></input>
    </div>
  )
}

const CartItemGroup = ({
  vendorId,
  vendorName,
  vendorItems,
  allState,
  //
  cartSelected,
}) => {
  const [globalState, setGlobalState] = useState(false)

  let currentSelected = 0

  vendorItems.forEach((item) => {
    if (cartSelected.includes(item)) currentSelected++
  })

  // console.log('vendorItemsLength' + vendorItems.length)
  // console.log('currentSelected' + currentSelected)
  // console.log('global state' + globalState)

  const [selectedSize, setSelectedSize] = useState(currentSelected)

  // useEffect(() => {
  //   if (selectedSize === vendorItems.length) {
  //     setGlobalState(true)
  //   } else {
  //     setGlobalState(false)
  //   }
  // }, [selectedSize])

  useEffect(() => {
    if (allState === true) {
      setGlobalState(true)
    }

    // else if (globalState === true) {
    //   setSelectedSize(vendorItems.length)
    // }
    // if (selectedSize != vendorItems.length) setGlobalState(false)
  }, [
    allState,
    // selectedSize
  ])

  return (
    <div className="cart__section">
      <div className="cart__item">
        <div className="checkColumn">
          <CartItemGroupCheckbox
            globalState={globalState}
            setGlobalState={setGlobalState}
            selectedSize={selectedSize}
            groupSize={vendorItems.length}
          />
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

      {vendorItems.map((item: any, index: number) => {
        return (
          <CartItem
            key={item.id}
            item={item}
            //
            globalState={globalState}
            setGlobalState={setGlobalState}
            setSelectedSize={setSelectedSize}
            currentSelected={currentSelected}
            selected={cartSelected.includes(item)}
          />
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

const CartItemCheckbox = ({
  item,
  globalState,
  setGlobalState,
  currentSelected,
  setSelectedSize,
  //
  selected,
}) => {
  const [state, setState] = useState(selected)

  const { toggleSelect } = useGlobalContext()

  // const handleChange = () => {
  //   setChecked((checked) => {
  //     // console.log('old check:' + checked)
  //     toggleSelect(item.id, checked)
  //     return !checked
  //   })
  // }
  const handleChange = (passedState: any) => {
    let newState: boolean

    if (passedState === true || passedState === false) newState = passedState
    else newState = !state

    setState(() => {
      toggleSelect(item.id, newState)
      if (newState === true)
        setSelectedSize((size: any) => {
          let newSize = currentSelected + 1
          // console.log(`newSize:${newSize}`)
          return newSize
        })
      else
        setSelectedSize((size: any) => {
          let newSize = currentSelected - 1
          // console.log(`newSize:${newSize}`)
          return newSize
        })
      return newState
    })
    if (newState === false) setGlobalState(newState)
  }

  useEffect(() => {
    if (state != globalState && globalState === true) handleChange(globalState)
  }, [globalState])

  return (
    <div>
      <input
        type="checkbox" //
        onChange={() => {
          handleChange(null)
        }}
        checked={state}
      ></input>
    </div>
  )
}

const CartItem = ({
  item,
  globalState,
  setGlobalState,
  currentSelected,
  setSelectedSize,
  //
  selected,
}) => {
  const { toggleQuantity, deleteCartItem } = useGlobalContext()

  const handleClick = () => {
    // console.log(item.id)
    deleteCartItem(item.id)
  }

  const DeleteButton = () => {
    return <button onClick={handleClick}>Xóa</button>
  }

  return (
    <>
      {/* <div className="divider-row">
        <div className="divider"></div>
      </div> */}
      <div className="cart__item">
        <div className="checkColumn">
          <CartItemCheckbox
            item={item}
            globalState={globalState}
            currentSelected={currentSelected}
            setSelectedSize={setSelectedSize}
            setGlobalState={setGlobalState}
            selected={selected}
            //
          />
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
              {item.variance.attribute.reduce((result: any, item: any) => {
                let myVal = Object.keys(item).map((key, index) => {
                  return item[key]
                })

                return result + myVal.toString() + '/'
              }, '')}
            </div>
          </div>
        </div>
        <div className="unitPriceColumn row">₫{item.variance.unitPrice}</div>
        <div className="quantityColumn">
          <button onClick={() => toggleQuantity(item.id, 'dec')}>-</button>
          <input type="text" value={item.quantity}></input>
          <button onClick={() => toggleQuantity(item.id, 'inc')}>+</button>
        </div>
        <div className="itemTotalPriceColumn row">
          ₫{item.variance.unitPrice * item.quantity}
        </div>
        <div className="actionColumn row">
          <div className="actionDelete">
            <DeleteButton />
          </div>
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
}

const CartFooter = ({ allState, setAllState }) => {
  const {
    cartSelected,
    cart,
    cartSelectedTotal,
    //
    deleteAllCart,
  } = useGlobalContext()

  const FooterCheckbox = ({ allState, setAllState }) => {
    const handleChange = () => {
      const newState = !allState
      setAllState(newState)
      return newState
    }

    return (
      <input
        type="checkbox"
        onChange={handleChange}
        //
        checked={allState}
      />
    )
  }

  const handleDelete = () => {
    if (allState !== true) {
      console.log('ko cho xoa')
    } else {
      deleteAllCart()
    }
  }

  const DeleteButton = () => {
    return <button onClick={handleDelete}>Xóa</button>
  }

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
          <FooterCheckbox allState={allState} setAllState={setAllState} />
        </div>
        <div className="chooseAll">{`Chọn Tất Cả(${cart.length})`}</div>
        <div className="actionDelete">
          <DeleteButton />
        </div>
        <div className="actionSave">Lưu vào mục yêu thích</div>
        <div className="group">
          <div className="totalCaption">{`Tổng thanh toán(${cartSelected.length} sản phẩm):`}</div>
          <div className="totalValue">
            <div className="value">
              {`₫${cartSelectedTotal}`}
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
  // console.log('grouped cart items:')
  const { cart, groupedCartItems, cartSelected } = useGlobalContext()
  const [allState, setAllState] = useState(false)

  console.log('cart detail rerender')
  // console.log(groupedCartItems)

  //   console.log('iterate through this object:')
  //   Object.keys(groupedCartItems).map((key: any) => {
  //     console.log(key, groupedCartItems[key])
  //   })
  // const CartHeaderMemo = React.memo(CartHeader)
  // const allStateMemo = useMemo(() => allState, [])
  // const setAllStateMemo = useMemo(() => setAllState, [])
  // const cartSelectedMemo = useMemo(() => cartSelected, [])
  // const cartMemo = useMemo(() => cart, [])

  return (
    <div className="cart__container">
      <div className="cart">
        {groupedCartItems.length > 0 ? (
          <div className="cart__detail">
            <div className="cart__row">
              <img src={freeCar}></img>Nhấn vào mục Mã giảm giá ở cuối trang để
              hưởng miễn phí vận chuyển bạn nhé!
            </div>

            {/* <CartHeaderMemo
              allState={allStateMemo}
              setAllState={setAllStateMemo}
              cartSelectedLength={cartSelectedMemo.length}
              cartLength={cartMemo.length}
            /> */}

            <CartHeader
              allState={allState}
              setAllState={setAllState}
              cartSelectedLength={cartSelected.length}
              cartLength={cart.length}
            />

            {groupedCartItems.map((item: any, index) => {
              // const CartItemGroupMemo = React.memo(CartItemGroup)
              // const itemMemo = useMemo(() => item, [item])
              // const cartSelectedMemo = useMemo(
              //   () => cartSelected,
              //   [cartSelected]
              // )

              // return (
              //   <CartItemGroupMemo
              //     key={index}
              //     vendorId={itemMemo.vendorId}
              //     vendorName={itemMemo.vendorName}
              //     vendorItems={itemMemo.vendorItems}
              //     allState={allStateMemo}
              //     cartSelected={cartSelectedMemo}
              //     // globalState={globalState}
              //   />
              // )

              return (
                <CartItemGroup
                  key={index}
                  vendorId={item.vendorId}
                  vendorName={item.vendorName}
                  vendorItems={item.vendorItems}
                  allState={allState}
                  cartSelected={cartSelected}
                  // globalState={globalState}
                />
              )
            })}
            <CartFooter allState={allState} setAllState={setAllState} />
          </div>
        ) : (
          <div className="cart__detail empty">
            <div
              className="image"
              style={{ backgroundImage: `url(${blankCart})` }}
            ></div>
            <div className="caption">Giỏ hàng của bạn còn trống</div>
          </div>
        )}
      </div>
    </div>
  )
}

export { CartDetail }
