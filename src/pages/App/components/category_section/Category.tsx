import '../../../../assets/styles/App/CategorySection.scss'
import { Link, useLoaderData } from 'react-router-dom'

const CategorySection = ({ categoryList }) => {
  // const [categoryList, setCategoryList] = useState([])

  // const categoryList: any = useLoaderData()

  return (
    <div className="category__section__container">
      <div className="category__section appPage">
        <div className="category__section__header">Danh mục</div>
        <div className="category__section__content">
          {categoryList.map((item: any, i: any) => {
            if (item.isActive)
              return (
                <div
                  className="category__section__content__item"
                  key={item._id}
                >
                  <Link to={`/${item._id}`}>
                    <div
                      className="category__section__content__item__logo"
                      style={{ backgroundImage: `url(${item.imgPath})` }}
                    ></div>
                    <div className="category__section__content__item__caption">
                      {item.title}
                    </div>
                  </Link>
                </div>
              )
          })}
        </div>
      </div>
    </div>
  )
}

export {
  CategorySection,
  //  categoryLoader
}
