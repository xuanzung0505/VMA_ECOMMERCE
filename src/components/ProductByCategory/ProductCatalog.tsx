import '../../public/styles/ProductByCategory/ProductByCategory.scss'

const ProductCatalog = () => {
  return (
    <div className="catalog__container">
      <div className="catalog">
        {/* <div className="blank">under development</div> */}
        <div className="main">
          <div className="catalog__sidebar">
            <div className="category__section productCatalog">
              <div className="title productCatalog">Tất cả danh mục</div>
              <div className="category__list productCatalog">
                <div className="item">Áo khoác</div>
              </div>
            </div>
            <div className="category__filter productCatalog">
              <div className="title">Bộ lọc tìm kiếm</div>
              <div className="filter__list">
                <div className="by-category">
                  <div className="title">Theo Danh Mục</div>
                  <div className="options">
                    <div className="option">Áo thun</div>
                  </div>
                </div>
                <div className="by-location">
                  <div className="title">Nơi Bán</div>
                  <div className="options">
                    <div className="option">Hà Nội</div>
                  </div>
                </div>
                <div className="by-transportationUnit">
                  <div className="title">Đơn Vị Vận Chuyển</div>
                  <div className="options">
                    <div className="option">Hỏa Tốc</div>
                  </div>
                </div>
                <div className="by-brand">
                  <div className="title">Thương Hiệu</div>
                  <div className="options">
                    <div className="option">COOLMATE</div>
                  </div>
                </div>
                <div className="by-unitPriceRange">
                  <div className="title">Khoảng Giá</div>
                  <div className="form">
                    <div className="rangeBox">
                      <input type="number" placeholder="TỪ"></input>
                      <div className="divider"></div>
                      <input type="number" placeholder="ĐẾN"></input>
                    </div>
                    <button>ÁP DỤNG</button>
                  </div>
                </div>
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
              <button>XÓA TẤT CẢ</button>
            </div>
          </div>
          <div className="catalog__main productCatalog">
            <div className="topbar">
              <div className="order">
                <div className="caption">Sắp xếp theo</div>
                <div className="options">
                  <button>Phổ Biến</button>
                  <button>Mới Nhất</button>
                  <button>Bán Chạy</button>
                  <button>Drop down</button>
                </div>
              </div>
              <div className="pagination">
                <div className="indicator">current/total</div>
                <div className="button-group">
                  <button>{'<'}</button>
                  <button>{'>'}</button>
                </div>
              </div>
            </div>
            <div className="items">items</div>
            <div className="bottombar">bottombar</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProductCatalog }
