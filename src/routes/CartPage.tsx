import { CartDetail } from '../components/Cart/CartDetail'
import { Navigation } from '../components/Cart/Navigation'

const CartPage = () => {
  return (
    <div className="cart__container">
      <Navigation />
      <CartDetail />
    </div>
  )
}

export { CartPage }
