import {
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { ProductCatalog } from '../components/ProductByCategory/ProductCatalog'
import { Navigation } from '../components/ProductByCategory/Navigation'
import { categoryServices } from '../services/categoryServices'
import { useEffect, useState } from 'react'
import { productServices } from '../services/productServices'
import { useGlobalContext } from '..'

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
    // console.log(category)
    return category
  })
  // console.log('done await')

  return category
}

const ProductByCategoryPage = () => {
  const { user } = useGlobalContext()

  const [productsPagi, setProductsPagi] = useState([])
  //
  const category: any = useLoaderData()
  const [categoryList, setCategoryList] = useState([])
  //
  // const [productsPagi, setProductsPagi] = useState([])
  // const limit = 1

  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()
  // query.deleteA

  //search query
  const [searchParams, setSearchParams] = useSearchParams(query)

  //data limit per page
  // const itemsPerPage = 20
  // const itemsPerPage = query.get('limit')
  const itemsPerPage = 10

  const { cart } = useGlobalContext()
  const navigate = useNavigate()

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

  useEffect(() => {
    productServices
      .getList({
        limit: itemsPerPage,
        categoryId: category._id,
        page: query.get('page'),
        keyword: query.get('keyword'),
        minPrice: query.get('minPrice'),
        maxPrice: query.get('maxPrice'),
      })
      .then((res) => {
        setProductsPagi(res.data)
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      })
  }, [searchParams, category])

  return (
    <div className="container">
      <Navigation
        user={user}
        category={category} //
        // useQuery={useQuery}
        query={query}
        productsPagi={productsPagi}
        setProductsPagi={setProductsPagi}
        setSearchParams={setSearchParams}
        cart={cart}
        navigate={navigate}
      />
      <ProductCatalog
        category={category}
        categoryList={categoryList}
        // useQuery={useQuery}
        query={query}
        productsPagi={productsPagi}
        setProductsPagi={setProductsPagi}
        setSearchParams={setSearchParams}
      />
    </div>
  )
}

export { categoryLoader, ProductByCategoryPage }
