import { useEffect, useState } from 'react'
import '../../public/styles/ProductByCategory/ProductByCategory.scss'
import { categoryServices } from '../../services/categoryServices'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { Pagination } from './Pagination'
import { productServices } from '../../services/productServices'
// import { query } from '../../utils/query'

// const { items } = require('./items')

const handlePrevPagi = (query, currentPage, setSearchParams) => {
  query.set('page', currentPage - 1)
  setSearchParams(query)
}

const handleNextPagi = (query, currentPage, setSearchParams) => {
  query.set('page', currentPage + 1)
  setSearchParams(query)
}

const ProductCatalog = ({
  category,
  categoryList,
  // productsPagi,
  // setProductsPagi,
}) => {
  //search query
  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()

  const [searchParams, setSearchParams] = useSearchParams(query)

  const [productsPagi, setProductsPagi] = useState([])
  //current page
  // let [currentPage, setCurrentPage] = useState(1)
  let currentPage = 1

  //data limit per page
  // const itemsPerPage = 20
  // const itemsPerPage = query.get('limit')
  const itemsPerPage = 1

  // const totalPage =
  //   products.length % itemsPerPage == 0
  //     ? Math.floor(products.length / itemsPerPage)
  //     : Math.floor(products.length / itemsPerPage) + 1

  const totalPage = productsPagi.totalDocs

  // const totalPage = 20

  //GET QUERY
  //current page
  let paramPage = query.get('page')
  if (paramPage != null) {
    currentPage = Number(paramPage)
  }

  useEffect(() => {
    productServices
      .getList({
        limit: itemsPerPage,
        categoryId: category._id,
        page: currentPage,
      })
      .then((res) => {
        setProductsPagi(res.data)
      })
  }, [searchParams, category])

  // console.log(searchParams)

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
                    <div className="rangeBox">
                      <input type="text" placeholder="TỪ"></input>
                      <div className="divider-horizontal"></div>
                      <input type="text" placeholder="ĐẾN"></input>
                    </div>
                    <button>ÁP DỤNG</button>
                  </div>
                </div>
                <div className="divider-horizontal"></div>
                <div className="by-rating">
                  <div className="title">Đánh Giá</div>
                  <div className="options">
                    <div className="5-star"></div>
                    <div className="4-star">4 trở lên</div>
                    <div className="3-star">3 trở lên</div>
                    <div className="2-star">2 trở lên</div>
                    <div className="1-star">1 trở lên</div>
                  </div>
                </div>
              </div>
              <div className="divider-horizontal"></div>
              <div className="deleteAll">
                <button>XÓA TẤT CẢ</button>
              </div>
            </div>
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
            <div className="items">
              {productsPagi.docs?.length > 0 ? (
                productsPagi.docs?.map((item: any) => {
                  return (
                    <Link to="#">
                      <div className="item">
                        <div
                          className="logo"
                          style={{ backgroundImage: `url(${item.logo})` }}
                        ></div>
                        <div className="banner_love">Yêu thích</div>
                        <div className="title">{item.title}</div>
                        <div className="price">{item.unitPrice}</div>
                        <div className="ratingSold">
                          <div className="rating">{item.rating}sao</div>
                          <div className="sold">Đã bán 100</div>
                        </div>
                        {/* <div className="location">{item.vendor.location}</div> */}
                        <div className="location">location</div>
                      </div>
                    </Link>
                  )
                })
              ) : (
                <div>Empty</div>
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
