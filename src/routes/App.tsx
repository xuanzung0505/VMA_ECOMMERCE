import '../public/styles/App.scss'
import { Navigation } from '../component/App/navigation_section/Navigation'
import { PromotionSection } from '../component/App/promotion_section/PromotionSection'
import { CategorySection } from '../component/App/category_section/Category'
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
