// import '../public/styles/App.scss'
import { Navigation } from '../components/App/navigation_section/Navigation'
import { PromotionSection } from '../components/App/promotion_section/PromotionSection'
import { CategorySection } from '../components/App/category_section/Category'
import { useEffect, useState } from 'react'
import { categoryServices } from '../services/categoryServices'
import { useGlobalContext } from '..'
import { useNavigate } from 'react-router-dom'
// import * as dotenv from 'dotenv'

// dotenv.config()

export const App = () => {
  const [categoryList, setCategoryList] = useState([])
  const { user } = useGlobalContext()
  // console.log(user)

  const { cart } = useGlobalContext()
  const navigate = useNavigate()

  useEffect(() => {
    // fetch(`http://${process.env.DOMAIN}:${process.env.PORT}/api/${objectName}`)
    //   .then((res) => res.json())
    //   .then((result) => {
    //     setCategoryList(result.docs)
    //   })
    categoryServices
      .getList({
        isActive: true,
      })
      .then((res) => {
        setCategoryList(res.data.docs)
      })
  }, [])

  return (
    <div className="container">
      <Navigation user={user} cart={cart} navigate={navigate} />
      <PromotionSection />
      <CategorySection categoryList={categoryList} />
    </div>
  )
}
