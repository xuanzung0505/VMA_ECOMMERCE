import { Link, useNavigate } from 'react-router-dom'
import '../../public/styles/ProductDetail/Detail.scss'
import freeCar from '../../public/assets/free-car.png'
import { useEffect, useState } from 'react'
import { varianceServices } from '../../services/varianceServices'
import { NotiManager } from '../../utils/notification'
import { useGlobalContext } from '../..'

const Stars = ({ count }) => {
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

const Attribute = ({ title, options, setAttribute, setAttributeJSON }) => {
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

const QuantityButtonGroup = ({ quantity, setQuantity, maxQuantity }) => {
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
}) => {
  const handleClick = () => {
    // console.log(quantity)
    // console.log(maxQuantity)
    if (product.attribute.length > 0 && !variance)
      NotiManager.error('Bạn vui lòng chọn phân loại hàng')
    else if (Number(quantity) > maxQuantity)
      NotiManager.error('Bạn vui lòng kiểm tra lại số lượng')
    else {
      //add to cart
      if (!user) {
        NotiManager.warning('Bạn vui lòng đăng nhập để mua hàng')
        navigate('/login')
      } else {
      }
    }
  }

  return (
    <button className="addToCart" onClick={handleClick}>
      Thêm Vào Giỏ Hàng
    </button>
  )
}

export const Detail = ({ user, product }) => {
  const [attribute, setAttribute] = useState([])
  const [attributeJSON, setAttributeJSON] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [maxQuantity, setMaxQuantity] = useState(product.quantity)
  const [variance, setVariance] = useState()

  //redirect hook
  const navigate = useNavigate()

  useEffect(() => {
    if (attribute.length == product.attribute.length && attributeJSON != '') {
      console.log('finding variance')
      varianceServices
        .getList({
          productId: product._id,
          attribute: JSON.stringify(attribute),
        })
        .then((res) => {
          // console.log(res.data)
          const variance = res.data.docs[0]
          setVariance(variance)
          setMaxQuantity(variance.quantity)
        })
        .catch((err) => {
          console.log(err)
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
            <div
              className="main"
              style={{
                backgroundImage: `url(${product.logo})`,
              }}
            ></div>
            <div className="list">list</div>
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
              <div className="price">₫{product.unitPrice}</div>
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
                />
                <button className="buy">Mua Ngay</button>
              </div>
            </div>
          </div>
        </div>
        <div className="shopDetail">shop Detail: {product.vendor.name}</div>
        <div className="row">
          <div className="detail2">detail2</div>
          <div className="ratings">ratings</div>
        </div>
      </div>
    </div>
  )
}
