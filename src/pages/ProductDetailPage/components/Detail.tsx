import { Link, useNavigate } from 'react-router-dom'
import '../../../assets/styles/ProductDetail/Detail.scss'
import freeCar from '../../../assets/images/free-car.png'
import { useEffect, useState } from 'react'
import { varianceServices } from '../../../services/varianceServices'
import { NotiManager } from '../../../utils/notification'
import { useGlobalContext } from '../../..'

import chat_logo from '../../../assets/images/chat.png'

const { defaultAvatar } = require('../../../config/avatar')

// const { element } = require('./element')

const Stars = ({ count }: any) => {
  const maxStars = 5

  let elements = []
  for (let i = 0; i < count; i++) {
    elements.push(
      <i className="fa-solid fa-star fa-lg" style={{ color: '#ee4d2d' }}></i>
    )
  }
  for (let i = 0; i < maxStars - count; i++) {
    elements.push(
      <i className="fa-regular fa-star fa-lg" style={{ color: '#ffdd00' }}></i>
    )
  }
  return <div className="stars">{elements}</div>
}

const Attribute = ({ title, options, setAttribute, setAttributeJSON }: any) => {
  const [active, setActive] = useState()

  const handleClick = (e) => {
    // console.log(e.target.innerHTML)
    const newValue = e.target.innerHTML
    setActive(newValue)

    setAttribute((oldAttribute: any[]) => {
      // console.log('set attribute')
      // console.log('old attribute')
      // console.log(oldAttribute)
      const found = oldAttribute.find((element) => element['title'] == title)
      // console.log('found')
      // console.log(found)

      //neu co san trong attribute r
      if (!!found) {
        //sua gia tri la xong vi no pass by reference
        found.value = newValue
      }
      //nguoc lai
      else {
        oldAttribute.push({ title: title, value: newValue })
      }

      // if () {
      //   console.log('ok')
      // }
      // console.log('new')
      // console.log(oldAttribute)
      // console.log(JSON.stringify(oldAttribute))

      setAttributeJSON(JSON.stringify(oldAttribute))
      return oldAttribute
    })
  }

  // console.log('attribute re-render')

  return (
    <div className="attribute">
      <div className="title">{title}</div>
      <div className="options attribute">
        {options.map((item, index) => {
          if (active === item)
            return <button className="option active">{item}</button>
          else
            return (
              <button className="option" onClick={handleClick}>
                {item}
              </button>
            )
        })}
      </div>
    </div>
  )
}

const QuantityButtonGroup = ({ quantity, setQuantity, maxQuantity }: any) => {
  const handleChange = (newValue?: number) => {
    setQuantity((current: any) => {
      // if (current == '') newValue = 1
      // console.log(newValue)
      return newValue
    })
  }

  return (
    <>
      <button onClick={() => handleChange(Number(quantity) - 1)}>-</button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => {
          const value = e.target.value
          handleChange(value)
        }}
      ></input>
      <button onClick={() => handleChange(Number(quantity) + 1)}>+</button>
    </>
  )
}

const AddToCartButton = ({
  navigate,
  product,
  user,
  variance,
  quantity,
  maxQuantity,
  addToCart,
}: any) => {
  const handleClick = () => {
    // console.log(quantity)
    // console.log(maxQuantity)
    if (!user) {
      NotiManager.warning('Bạn vui lòng đăng nhập để mua hàng')
      navigate('/login')
    } else {
      // console.log(user._id)
      if ((product.attribute.length > 0 && !variance) || !variance)
        NotiManager.error('Bạn vui lòng chọn phân loại hàng')
      else if (Number(quantity) > maxQuantity)
        NotiManager.error('Bạn vui lòng kiểm tra lại số lượng')
      else {
        //OK
        addToCart(variance._id, user._id, Number(quantity))
      }
    }
  }

  return (
    <button className="addToCart" onClick={handleClick}>
      Thêm Vào Giỏ Hàng
    </button>
  )
}

const PreviewItems = ({ product }) => {
  const element = product.imgPath
  const maxSize = 5
  const size = element.length
  const [first, setFirst] = useState(0)
  const last = first + maxSize
  const [active, setActive] = useState(first)

  // console.log(element)

  const handlePrev = () => {
    setFirst((oldVal: any) => {
      if (oldVal - 1 < 0) {
        return oldVal
      }
      return oldVal - 1
    })
  }

  const handleNext = () => {
    setFirst((oldVal: any) => {
      if (oldVal + 1 + maxSize > size) {
        return oldVal
      }
      return oldVal + 1
    })
  }

  const handleActive = (index: any) => {
    setActive(index)
  }
  let main = product.logo
  if (size > 0) main = element[active].path

  return (
    <>
      <div
        className="main"
        style={{
          // backgroundImage: `url(${product.logo})`,
          backgroundImage: `url(${main})`,
        }}
      ></div>
      {size > 0 ? (
        <>
          <div className="list">
            {size > maxSize && (
              <div className="prevBtn" onClick={handlePrev}>
                <i className="fa-solid fa-chevron-left fa-2xl"></i>
              </div>
            )}
            {element.map((item: any, index: any) => {
              if (0 <= index && index < first)
                return (
                  <div
                    className="item prev"
                    style={{
                      backgroundImage: `url(${item.path})`,
                    }}
                  ></div>
                )
              else if (first <= index && index < last) {
                if (index == active) {
                  return (
                    <div
                      className="item active"
                      style={{
                        backgroundImage: `url(${item.path})`,
                      }}
                    ></div>
                  )
                }
                return (
                  <div
                    className="item"
                    style={{
                      backgroundImage: `url(${item.path})`,
                    }}
                    onMouseOver={() => {
                      handleActive(index)
                    }}
                  ></div>
                )
              } else
                return (
                  <div
                    className="item next"
                    style={{
                      backgroundImage: `url(${item.path})`,
                    }}
                  ></div>
                )
            })}
            {size > maxSize && (
              <div className="nextBtn" onClick={handleNext}>
                <i className="fa-solid fa-chevron-right fa-2xl"></i>
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

const Rate = ({ score, setScore, maxScore }) => {
  let element = []
  const [previewscore, setPreviewScore] = useState(0)

  const Star = ({ active, index }) => {
    const handleMouseOver = (index) => {
      setPreviewScore(index + 1)
    }

    const handleMouseLeave = (index) => {
      setPreviewScore(0)
    }

    const handleMouseClick = (index) => {
      setScore(index + 1)
    }

    if (active === false)
      return (
        <i
          className="fa-regular fa-star fa-2xl"
          style={{ color: '#ee4d2d' }}
          onMouseOver={() => handleMouseOver(index)}
          onClick={() => handleMouseClick(index)}
        ></i>
      )
    return (
      <i
        className="fa-solid fa-star fa-2xl"
        style={{ color: '#ee4d2d' }}
        onMouseLeave={() => handleMouseLeave(index)}
        onMouseOver={() => handleMouseOver(index)}
        onClick={() => handleMouseClick(index)}
      ></i>
    )
  }

  for (let i = 0; i < maxScore; i++) {
    // console.log(item)
    let active = false

    if (i + 1 <= score) active = true
    else {
      if (i + 1 <= previewscore) active = true
    }

    const item = Star({ active: active, index: i })
    // console.log(typeof item)
    element.push(item)
  }
  // console.log(element)
  // return <>{element}</>
  return (
    <>
      {element.map((item: any) => {
        return item
      })}
    </>
  )
}

export const Detail = ({ user, product, navigate }) => {
  const [attribute, setAttribute] = useState([])
  const [attributeJSON, setAttributeJSON] = useState('[]')
  const [quantity, setQuantity] = useState(1)
  const [maxQuantity, setMaxQuantity] = useState(product.quantity)
  const [priceTag, setPriceTag] = useState(product.unitPrice)
  const [variance, setVariance] = useState()

  //Rate
  const [score, setScore] = useState(0)
  const maxScore = 5

  //global context
  const { addToCart } = useGlobalContext()

  useEffect(() => {
    if (attribute.length == product.attribute.length) {
      console.log('finding variance')
      varianceServices
        .getList({
          productId: product._id,
          attribute: JSON.stringify(attribute),
        })
        .then((res) => {
          // console.log('variance')
          console.log(res.data)
          const variance = res.data.docs[0]
          setVariance(variance)
          setMaxQuantity(variance.quantity)
          setPriceTag(variance.unitPrice)
        })
        .catch((err) => {
          // console.log(err)
          setPriceTag('?')
          setMaxQuantity('?')
        })
    }
  }, [attributeJSON])

  useEffect(() => {
    if (quantity <= 0 && quantity != '') setQuantity(1)
  }, [quantity])

  return (
    <div className="productDetail__container">
      <div className="productDetail">
        <div className="cate_dir">
          <Link to="#">Shopee</Link>
          <i className="fa-solid fa-chevron-right fa-xs"></i>
          <Link to={`/${product.categoryId}`}>{product.category.title}</Link>
          <i className="fa-solid fa-chevron-right fa-xs"></i>
          <span>{product.title}</span>
        </div>
        <div className="detail">
          <div className="preview">
            <PreviewItems product={product} />
          </div>
          <div className="info">
            <div className="title">
              <div className="love">Yêu Thích</div>
              <div className="caption">{product.title}</div>
            </div>
            <div className="row">
              <div className="left">
                <div className="ratings">
                  <div className="caption">5</div>
                  <Stars count={5} />
                </div>
                <div className="divider"></div>
                <div className="totalRatings">
                  <div className="caption">900</div>
                  <div className="unit">Đánh giá</div>
                </div>
                <div className="divider"></div>
                <div className="sold">
                  <div className="caption">4.3k</div>
                  <div className="unit">Đã bán</div>
                </div>
              </div>
              <div className="right">
                <div className="report">Tố cáo</div>
              </div>
            </div>
            <div className="priceTag">
              <div className="price">₫{priceTag}</div>
            </div>
            <div className="attributes">
              <div className="deal">
                <div className="title">Deal Sốc</div>
                <div className="options deal">
                  <div className="caption">Mua Kèm Deal Sốc</div>
                </div>
              </div>
              <div className="baohiem">
                <div className="title">Bảo Hiểm</div>
                <div className="options">Bảo hiểm abc</div>
              </div>
              <div className="vanchuyen">
                <div className="title">Vận Chuyển</div>
                <div className="options vanchuyen">
                  <div className="type">
                    <img src={freeCar}></img>Miễn phí vận chuyển
                  </div>
                  {/* <div className="destAndFee">tới</div>
                  <div className="destAndFee">tới</div> */}
                </div>
              </div>
              {product.attribute.map((item, index) => {
                return (
                  <Attribute
                    title={item.title}
                    options={item.value}
                    setAttribute={setAttribute}
                    setAttributeJSON={setAttributeJSON}
                  />
                )
              })}
              <div className="quantity">
                <div className="title">Số Lượng</div>
                <div className="quantityColumn">
                  <QuantityButtonGroup
                    quantity={quantity}
                    setQuantity={setQuantity}
                    maxQuantity={maxQuantity}
                  />
                </div>
                <div className="available">{maxQuantity} sản phẩm có sẵn</div>
              </div>
              <div className="buttons">
                <AddToCartButton
                  navigate={navigate}
                  product={product}
                  user={user}
                  variance={variance}
                  quantity={quantity}
                  maxQuantity={maxQuantity}
                  addToCart={addToCart}
                />
                <button className="buy">Mua Ngay</button>
              </div>
            </div>
          </div>
        </div>
        <div className="shopDetail">
          <div
            className="vendorAvatar"
            //https://res.cloudinary.com/dolrhob6r/image/upload/v1683722080/mjza2mfj7m7yoqdlb6yq.svg
            style={{
              backgroundImage: !!product.vendor.avatar
                ? `url(${product.vendor.avatar})`
                : `url(${defaultAvatar})`,
            }}
          ></div>
          <div className="vendorInfo">
            <div className="row name">{product.vendor.name}</div>
            <div className="row online">Online ? giờ trước</div>
            <div className="row button">
              <button className="chat">
                <div
                  className="chatLogo"
                  style={{ backgroundImage: `url(${chat_logo})` }}
                ></div>
                Chat Ngay
              </button>
              <Link to={'#'}>
                <button className="checkShop">
                  <i
                    className="fa-solid fa-store fa-sm"
                    // style={{ color: '#000000' }}
                  ></i>
                  Xem Shop
                </button>
              </Link>
            </div>
          </div>
          <div className="divider productDetail"></div>
          <div className="vendorStat">
            <div className="item">
              <div className="title">Đánh Giá</div>
              <div className="stat">1.3k</div>
            </div>
            <div className="item">
              <div className="title">Tỉ Lệ Phản Hồi</div>
              <div className="stat">89%</div>
            </div>
            <div className="item">
              <div className="title">Tham Gia</div>
              <div className="stat">1 tháng trước</div>
            </div>
            <div className="item">
              <div className="title">Sản Phẩm</div>
              <div className="stat">120</div>
            </div>
            <div className="item">
              <div className="title">Thời Gian Phản Hồi</div>
              <div className="stat">trong vài giờ</div>
            </div>
            <div className="item">
              <div className="title">Người Theo Dõi</div>
              <div className="stat">10k</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="detail2">
            <div className="caption">Chi tiết</div>
          </div>
          <div className="ratings">
            <div className="caption">Đánh giá sản phẩm</div>
            <div className="row">
              <div className="rate">
                <Rate score={score} setScore={setScore} maxScore={maxScore} />
              </div>
              <div className="score">
                <span className="current">{score}</span> trên{' '}
                <span className="total">{maxScore}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
