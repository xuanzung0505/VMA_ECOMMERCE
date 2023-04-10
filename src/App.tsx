import './public/styles/App.scss'
import { Navigation } from './Navigation'
import { PromotionSection } from './promotion_section/PromotionSection'
// import * as dotenv from 'dotenv'

// dotenv.config()

export const App = () => {
  return (
    <div className="container">
      <Navigation />
      <PromotionSection />
    </div>
  )
}
