import { useEffect, useState } from 'react'
import '../../public/styles/ProductByCategory/ProductByCategory.scss'
import { categoryServices } from '../../services/categoryServices'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { Pagination } from './Pagination'
import { productServices } from '../../services/productServices'
import emptyList from '../../public/assets/empty-list.png'
// import { query } from '../../utils/query'

// const { items } = require('./items')

const RangeBox = ({
  query,
  setSearchParams,
  //
  minPrice,
  setMinPrice,
  //
  maxPrice,
  setMaxPrice,
}) => {
  const handleClick = () => {
    //validate first (or leave it to BE)

    //then set
    query.set('minPrice', minPrice)
    query.set('maxPrice', maxPrice)
    query.set('page', 1)
    setSearchParams(query)
  }

  const handleMinPrice = (e: any) => {
    setMinPrice(parseInt(e.target.value))
  }

  const handleMaxPrice = (e: any) => {
    setMaxPrice(parseInt(e.target.value))
  }

  // console.log(minPrice)
  return (
    <>
      <div className="rangeBox">
        <input
          type="number"
          placeholder="₫TỪ"
          onChange={handleMinPrice}
        ></input>
        <div className="divider-horizontal"></div>
        <input
          type="number"
          placeholder="₫ĐẾN"
          onChange={handleMaxPrice}
        ></input>
      </div>
      <button onClick={handleClick}>ÁP DỤNG</button>
    </>
  )
}

const Filter = ({
  query,
  setSearchParams,
  //
  minPrice,
  setMinPrice,
  //
  maxPrice,
  setMaxPrice,
}) => {
  return (
    <div className="category__filter">
      <div className="title">
        <i className="fa-solid fa-filter"></i>
        BỘ LỌC TÌM KIẾM
      </div>
      <div className="filter__list">
        <div className="by-category">
          <div className="title">Theo Danh Mục</div>
          <div className="options">
            <div className="option">
              <input type="checkbox"></input>Áo thun
            </div>
            <div className="option">
              <input type="checkbox"></input>Áo thun
            </div>
            <div className="option">
              <input type="checkbox"></input>Áo thun
            </div>
            <div className="option add">
              Thêm<i className="fa-solid fa-chevron-down fa-xs"></i>
            </div>
          </div>
        </div>
        <div className="divider-horizontal"></div>
        <div className="by-location">
          <div className="title">Nơi Bán</div>
          <div className="options">
            <div className="option">
              <input type="checkbox"></input>Hà Nội
            </div>
            <div className="option">
              <input type="checkbox"></input>TP Hồ Chí Minh
            </div>
            <div className="option">
              <input type="checkbox"></input>Q. Hoàng Mai
            </div>
            <div className="option add">
              Thêm<i className="fa-solid fa-chevron-down fa-xs"></i>
            </div>
          </div>
        </div>
        <div className="divider-horizontal"></div>
        <div className="by-transportationUnit">
          <div className="title">Đơn Vị Vận Chuyển</div>
          <div className="options">
            <div className="option">
              <input type="checkbox"></input>
              Hỏa Tốc
            </div>
            <div className="option">
              <input type="checkbox"></input>
              Nhanh
            </div>
            <div className="option">
              <input type="checkbox"></input>
              Tiết Kiệm
            </div>
            <div className="option add">
              Thêm<i className="fa-solid fa-chevron-down fa-xs"></i>
            </div>
          </div>
        </div>
        <div className="divider-horizontal"></div>
        <div className="by-brand">
          <div className="title">Thương Hiệu</div>
          <div className="options">
            <div className="option">
              <input type="checkbox"></input>COOLMATE
            </div>
            <div className="option">
              <input type="checkbox"></input>NOCTURNAL
            </div>
            <div className="option">
              <input type="checkbox"></input>Azila
            </div>
            <div className="option add">
              Thêm<i className="fa-solid fa-chevron-down fa-xs"></i>
            </div>
          </div>
        </div>
        <div className="divider-horizontal"></div>
        <div className="by-unitPriceRange">
          <div className="title">Khoảng Giá</div>
          <div className="form">
            <RangeBox
              query={query} //
              setSearchParams={setSearchParams}
              //
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              //
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
          </div>
        </div>
        <div className="divider-horizontal"></div>
        <div className="by-rating">
          <div className="title">Đánh Giá</div>
          <div className="options">
            <div className="option">
              <Stars count={5} />
            </div>
            <div className="option">
              <Stars count={4} />
              trở lên
            </div>
            <div className="option">
              <Stars count={3} />
              trở lên
            </div>
            <div className="option">
              <Stars count={2} />
              trở lên
            </div>
            <div className="option">
              <Stars count={1} />
              trở lên
            </div>
          </div>
        </div>
      </div>
      <div className="divider-horizontal"></div>
      <div className="deleteAll">
        <button>XÓA TẤT CẢ</button>
      </div>
    </div>
  )
}

const Stars = ({ count }) => {
  const maxStars = 5

  let elements = []
  for (let i = 0; i < count; i++) {
    elements.push(
      <i className="fa-solid fa-star fa-sm" style={{ color: '#ffdd00' }}></i>
    )
  }
  for (let i = 0; i < maxStars - count; i++) {
    elements.push(
      <i className="fa-regular fa-star fa-sm" style={{ color: '#ffdd00' }}></i>
    )
  }
  return <div className="stars">{elements}</div>
}

const ProductCatalog = ({
  category,
  categoryList,
  // useQuery,
  query,
  productsPagi,
  // setProductsPagi,
  setSearchParams,
}) => {
  const handlePrevPagi = (query, currentPage, setSearchParams) => {
    query.set('page', currentPage - 1)
    setSearchParams(query)
  }

  const handleNextPagi = (query, currentPage, setSearchParams) => {
    query.set('page', currentPage + 1)
    setSearchParams(query)
  }

  //current page
  // let [currentPage, setCurrentPage] = useState(1)
  let currentPage = 1
  //GET QUERY
  //current page
  let paramPage = query.get('page')
  if (paramPage != null) {
    currentPage = Number(paramPage)
  }

  // const totalPage =
  //   products.length % itemsPerPage == 0
  //     ? Math.floor(products.length / itemsPerPage)
  //     : Math.floor(products.length / itemsPerPage) + 1

  const totalPage = productsPagi.totalPages

  // const totalPage = 20
  // console.log(searchParams)

  const [minPrice, setMinPrice] = useState()
  const [maxPrice, setMaxPrice] = useState()

  return (
    <div className="catalog__container">
      <div className="catalog">
        {/* <div className="blank">under development</div> */}
        <div className="main">
          <div className="catalog__sidebar">
            <div className="category__section">
              <div className="title">
                <i className="fa-solid fa-list"></i>
                Tất Cả Danh Mục
              </div>
              <div className="divider-horizontal"></div>
              <div className="category__list">
                {categoryList.map((item: any) => {
                  if (item._id === category._id)
                    return (
                      <Link to={`/${item._id}`}>
                        <div className="item selected">{item.title}</div>
                      </Link>
                    )
                  return (
                    <Link to={`/${item._id}`}>
                      <div className="item">{item.title}</div>
                    </Link>
                  )
                })}

                <div className="item">
                  <div className="caption">Thêm</div>
                  <i className="fa-solid fa-chevron-down fa-xs"></i>
                </div>
              </div>
            </div>
            <Filter
              query={query}
              setSearchParams={setSearchParams}
              //
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              //
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
          </div>
          <div className="catalog__main">
            <div className="topbar">
              <div className="order">
                <div className="caption">Sắp xếp theo</div>
                <div className="options">
                  <button className="selected">Phổ Biến</button>
                  <button>Mới Nhất</button>
                  <button>Bán Chạy</button>
                  <button>Drop down</button>
                </div>
              </div>
              <div className="pagination">
                <div className="indicator">
                  {currentPage}/{totalPage}
                </div>
                <div className="button-group">
                  <button
                    className={currentPage > 1 ? 'prev active' : 'prev'}
                    //
                    onClick={
                      currentPage > 1
                        ? () => {
                            handlePrevPagi(query, currentPage, setSearchParams)
                          }
                        : () => {}
                    }
                  >
                    <i className="fa-solid fa-chevron-left fa-xs"></i>
                  </button>
                  <button
                    className={currentPage < totalPage ? 'next active' : 'next'}
                    //
                    //
                    onClick={
                      currentPage < totalPage
                        ? () => {
                            handleNextPagi(query, currentPage, setSearchParams)
                          }
                        : () => {}
                    }
                  >
                    <i className="fa-solid fa-chevron-right fa-xs"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="main">
              {productsPagi.docs?.length > 0 ? (
                <div className="items">
                  {productsPagi.docs?.map((item: any) => {
                    return (
                      <Link to={`/product/${item._id}`}>
                        <div className="item">
                          <div
                            className="logo"
                            style={{ backgroundImage: `url(${item.logo})` }}
                          ></div>
                          <div className="banner_love">Yêu thích</div>
                          <div className="title">{item.title}</div>
                          <div className="price">₫{item.unitPrice}</div>
                          <div className="ratingSold">
                            <div className="rating">
                              <i
                                className="fa-solid fa-star fa-sm"
                                style={{ color: '#ffdd00' }}
                              ></i>
                              <i
                                className="fa-solid fa-star fa-sm"
                                style={{ color: '#ffdd00' }}
                              ></i>
                              <i
                                className="fa-solid fa-star fa-sm"
                                style={{ color: '#ffdd00' }}
                              ></i>
                              <i
                                className="fa-solid fa-star fa-sm"
                                style={{ color: '#ffdd00' }}
                              ></i>
                              <i
                                className="fa-solid fa-star fa-sm"
                                style={{ color: '#ffdd00' }}
                              ></i>
                            </div>
                            <div className="sold">Đã bán 100</div>
                          </div>
                          {/* <div className="location">{item.vendor.location}</div> */}
                          <div className="location">Hà Nội</div>
                          {/* <div className="location">{}</div> */}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className="empty">
                  <div
                    className="icon"
                    style={{ backgroundImage: `url(${emptyList})` }}
                  ></div>
                  <div className="caption">Không tìm thấy kết quả nào</div>
                  <div className="subCaption">
                    Hãy thử sử dụng các từ khóa chung chung hơn
                  </div>
                </div>
              )}
            </div>
            <div className="bottombar">
              <button
                className={currentPage > 1 ? 'prev active' : 'prev'} //
                onClick={
                  currentPage > 1
                    ? () => {
                        handlePrevPagi(query, currentPage, setSearchParams)
                      }
                    : () => {}
                }
              >
                <i className="fa-solid fa-chevron-left fa-xs"></i>
              </button>

              <Pagination
                currentPage={currentPage}
                // setCurrentPage={setCurrentPage}
                // query={query}
                setSearchParams={setSearchParams}
                totalPage={totalPage}
              />

              <button
                className={currentPage < totalPage ? 'next active' : 'next'}
                //
                onClick={
                  currentPage < totalPage
                    ? () => {
                        handleNextPagi(query, currentPage, setSearchParams)
                      }
                    : () => {}
                }
              >
                <i className="fa-solid fa-chevron-right fa-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProductCatalog }
