import ReactDOM from 'react-dom'
import { useContext } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { App } from './pages/App/App'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { CartPage } from './pages/CartPage/CartPage'
import {
  ProductByCategoryPage,
  categoryLoader,
} from './pages/ProductByCategoryPage/ProductByCategoryPage'
import './assets/styles/index.scss'
import { NotiContainer } from './utils/notification'
import {
  ProductDetailPage,
  productLoader,
} from './pages/ProductDetailPage/ProductDetailPage'
import { LogoutPage } from './pages/LogoutPage/LogoutPage'
import { ErrorPage } from './pages/ErrorPage/ErrorPage'
import { CommonContext, CommonContextProvider } from './contexts/Common'

// const { cartItems } = require('./components/Cart/cart.js')
// const { cartItem } = require('./components/Cart/cartItem.js')

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      //category
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/:categoryId',
    element: <ProductByCategoryPage />,
    loader: categoryLoader,
  },
  {
    path: '/product/:productId',
    element: <ProductDetailPage />,
    loader: productLoader,
  },
  {
    path: '/logout',
    element: <LogoutPage />,
  },
])

const useGlobalContext = () => {
  return useContext(CommonContext)
}

ReactDOM.render(
  <>
    <NotiContainer />
    <CommonContextProvider>
      <RouterProvider router={router} />
    </CommonContextProvider>
  </>,
  document.getElementById('root')
)

export { useGlobalContext }
