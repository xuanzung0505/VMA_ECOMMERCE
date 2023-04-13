import { useEffect, useState } from 'react'
import '../../../public/styles/App/CategorySection.scss'
import { useLoaderData } from 'react-router-dom'

// const { categoryList } = require('./category.js')

const objectName = 'category'

// const categoryLoader = async (params: any) => {
//   let categoryList: any = []

//   fetch(`http://${process.env.DOMAIN}:${process.env.PORT}/api/${objectName}`)
//     .then((res) => res.json())
//     .then((result) => {
//       categoryList = result.docs
//     })

//   return categoryList
// }

const CategorySection = () => {
  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    fetch(`http://${process.env.DOMAIN}:${process.env.PORT}/api/${objectName}`)
      .then((res) => res.json())
      .then((result) => {
        setCategoryList(result.docs)
      })
  }, [categoryList])

  // const categoryList: any = useLoaderData()

  return (
    <div className="category__section__container">
      <div className="category__section">
        <div className="category__section__header">Danh mục</div>
        <div className="category__section__content">
          {categoryList.map((item: any, i: any) => {
            if (item.isActive)
              return (
                <div className="category__section__content__item">
                  <div
                    className="category__section__content__item__logo"
                    style={{ backgroundImage: `url(${item.imgPath})` }}
                  ></div>
                  <div className="category__section__content__item__caption">
                    {item.title}
                  </div>
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