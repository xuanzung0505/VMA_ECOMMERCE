import '../public/styles/App/App.scss'
import { Navigation } from '../components/App/navigation_section/Navigation'
import { PromotionSection } from '../components/App/promotion_section/PromotionSection'
import { CategorySection } from '../components/App/category_section/Category'
// import * as dotenv from 'dotenv'

// dotenv.config()

export const App = () => {
  return (
    <div className="container">
      <Navigation />
      <PromotionSection />
      <CategorySection />
    </div>
  )
}
