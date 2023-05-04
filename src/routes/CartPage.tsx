import { useGlobalContext } from '..'
import { CartDetail } from '../components/Cart/CartDetail'
import { Navigation } from '../components/Cart/Navigation'

const CartPage = () => {
  const { user } = useGlobalContext()
  return (
    <div className="cart__container">
      <Navigation user={user} />
      <CartDetail />
    </div>
  )
}

export { CartPage }
