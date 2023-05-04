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

import './public/styles/index.scss'
import { NotiContainer } from './utils/notification'

import { useCookies } from 'react-cookie'

// import { useJwt } from 'react-jwt'
// import { decodeToken } from 'react-jwt'
// import { isExpired } from 'react-jwt'
import { userServices } from './services/userServices'
import jwt from 'jsonwebtoken'

const { cartItems } = require('./components/Cart/cart.js')

const initialState = {
  //user
  user: null,

  //cart
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
  const [cookies, setCookie, removeCookie] = useCookies()
  // const { decodedToken, isExpired, reEvaluateToken } = useJwt('')

  //load cookies
  const getDataFromCookies = async (cookies: any) => {
    const secret: any = process.env.JWT_TOKEN_SECRET
    //token
    // const decodedToken: any = jwt.decode(cookies.token, { complete: true })
    if (!!cookies.token) {
      jwt.verify(cookies.token, secret, (err: any, decodedToken: any) => {
        if (!!err) {
          // console.log(err)
          removeCookie('token')
        }
        if (!!decodedToken) {
          // console.log(decodedToken)
          userServices.getById(decodedToken.userId).then((res) => {
            // console.log(res.data)
            const user = res.data
            delete user.password
            setUser(user)
            // console.log(state.user)
          })
        }
      })
    }
    // if (!!decodedToken) {
    //   console.log(decodedToken)
    //   console.log(new Date(decodedToken.payload.exp))

    //   const tokenExpired = decodedToken.payload.exp < new Date().getTime()

    //   console.log('token is expired:' + tokenExpired)

    //   if (tokenExpired) removeCookie('token')

    //   if (tokenExpired === false) {
    //     userServices.getById(decodedToken.userId).then((res) => {
    //       // console.log(res.data)
    //       const user = res.data
    //       delete user.password
    //       setUser(user)
    //       // console.log(state.user)
    //     })
    //   }
    // }

    //other datas
  }

  //user
  const setUser = (user: any) => {
    dispatch({ type: 'SET_USER', payload: { user } })
  }

  //cart
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
    getDataFromCookies(
      cookies
      //  ,decodedToken, isExpired, reEvaluateToken
    )
    fetchCart()
  }, [])

  useEffect(() => {
    getTotal()
  }, [state.cartSelected, state.cartSelected.length])

  return (
    <CommonContext.Provider
      value={{
        ...state,
        //cookie
        getDataFromCookies,

        //user
        setUser,

        //cart
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
  <>
    <NotiContainer />
    <CommonContextProvider>
      <RouterProvider router={router} />
    </CommonContextProvider>
  </>,
  document.getElementById('root')
)

export { CommonContext, CommonContextProvider, useGlobalContext }
