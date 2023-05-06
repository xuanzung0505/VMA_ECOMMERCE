import { useLoaderData, useLocation, useSearchParams } from 'react-router-dom'
import { productServices } from '../services/productServices'
import { Navigation } from '../components/ProductDetail/Navigation'
import { useGlobalContext } from '..'
import { Detail } from '../components/ProductDetail/Detail'

async function productLoader({ params }) {
  // let product: any = await fetch(
  //   `http://${process.env.DOMAIN}:${process.env.PORT}/api/${objectName}/${params.categoryId}`
  // )
  //   .then((res) => res.json())
  //   .then((result) => {
  //     product = result
  //     return product
  //   })
  let product = {}
  await productServices.getById(params.productId).then((res) => {
    product = res.data
    return product
  })
  // console.log('done await')

  return product
}

const ProductDetailPage = () => {
  const { user } = useGlobalContext()

  const product: any = useLoaderData()
  // console.log('product:' + product)

  return (
    <div className="container">
      <Navigation user={user} />
      <Detail user={user} product={product} />
    </div>
  )
}

export { productLoader, ProductDetailPage }
