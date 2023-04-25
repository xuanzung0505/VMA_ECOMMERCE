import { useLoaderData } from 'react-router-dom'
import { Navigation } from '../components/App/navigation_section/Navigation'

const objectName = 'category'

async function categoryLoader({ params }) {
  let category: any = await fetch(
    `http://${process.env.DOMAIN}:${process.env.PORT}/api/${objectName}/${params.categoryId}`
  )
    .then((res) => res.json())
    .then((result) => {
      category = result
      return category
    })

  return category
}

const ProductByCategoryPage = () => {
  const category: any = useLoaderData()
  console.log(category)
  return (
    <div>
      <Navigation />
    </div>
  )
}

export { categoryLoader, ProductByCategoryPage }
