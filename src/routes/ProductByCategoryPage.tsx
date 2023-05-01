import { useLoaderData } from 'react-router-dom'
import { ProductCatalog } from '../components/ProductByCategory/ProductCatalog'
import { Navigation } from '../components/ProductByCategory/Navigation'
import { categoryServices } from '../services/categoryServices'
import { useEffect, useState } from 'react'
import { productServices } from '../services/productServices'

async function categoryLoader({ params }) {
  // let category: any = await fetch(
  //   `http://${process.env.DOMAIN}:${process.env.PORT}/api/${objectName}/${params.categoryId}`
  // )
  //   .then((res) => res.json())
  //   .then((result) => {
  //     category = result
  //     return category
  //   })
  let category = {}
  await categoryServices.getById(params.categoryId).then((res) => {
    category = res.data
    return category
  })
  // console.log('done await')

  return { category }
}

const ProductByCategoryPage = () => {
  const { category }: any = useLoaderData()
  const [categoryList, setCategoryList] = useState([])
  //
  // const [productsPagi, setProductsPagi] = useState([])
  const limit = 1

  useEffect(() => {
    categoryServices
      .getList({
        isActive: true,
      })
      .then((res) => {
        setCategoryList(res.data.docs)
      })
  }, [])

  // console.log(category)

  // useEffect(() => {
  //   productServices
  //     .getList({
  //       limit: limit,
  //       categoryId: category._id,
  //     })
  //     .then((res) => {
  //       setProductsPagi(res.data)
  //     })
  // }, [category])

  // console.log(productsPagi)
  return (
    <div className="container">
      <Navigation category={category} />
      <ProductCatalog
        category={category}
        categoryList={categoryList}
        // productsPagi={productsPagi}
        // setProductsPagi={setProductsPagi}
      />
    </div>
  )
}

export { categoryLoader, ProductByCategoryPage }
