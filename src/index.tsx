import ReactDOM from 'react-dom'
import React, { useContext, useEffect, useReducer } from 'react'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './routes/error-page'

import { App } from './routes/App'
import { LoginPage } from './routes/LoginPage'
import { CartPage } from './routes/CartPage'
import { reducer } from './reducer'
import {
  ProductByCategoryPage,
  categoryLoader,
} from './routes/ProductByCategoryPage'

const { cartItems } = require('./components/Cart/cart.js')

const initialState = {
  loading: false,
  cart: [],
  groupedCartItems: [],
  cartSelected: [],
  cartSelectedTotal: 0,
}

const CommonContext = React.createContext()

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
])

const CommonContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const toggleQuantity = (id: any, type: any) => {
    dispatch({ type: 'TOGGLE_QUANTITY', payload: { id, type } })
  }

  const toggleSelect = (id: any, initialCheck: any) => {
    dispatch({ type: 'TOGGLE_SELECT', payload: { id, initialCheck } })
  }

  const getTotal = () => {
    dispatch({ type: 'GET_TOTAL' })
  }

  const fetchCart = async () => {
    //fetch here

    //then dispatch
    dispatch({ type: 'LOAD_CART', payload: cartItems })
    // dispatch({ type: 'LOAD_CARTSELECTED' })
  }

  const deleteCartItem = (id: any) => {
    dispatch({ type: 'DELETE_CARTITEM', payload: { id } })
  }

  const deleteAllCart = () => {
    dispatch({ type: 'DELETE_ALLCART' })
  }

  useEffect(() => {
    fetchCart()
  }, [])

  useEffect(() => {
    getTotal()
  }, [state.cartSelected, state.cartSelected.length])

  return (
    <CommonContext.Provider
      value={{
        ...state,
        toggleQuantity,
        fetchCart,
        toggleSelect,
        getTotal,
        deleteCartItem,
        deleteAllCart,
      }}
    >
      {children}
    </CommonContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(CommonContext)
}

ReactDOM.render(
  <CommonContextProvider>
    <RouterProvider router={router} />
  </CommonContextProvider>,
  document.getElementById('root')
)

export { CommonContext, CommonContextProvider, useGlobalContext }
