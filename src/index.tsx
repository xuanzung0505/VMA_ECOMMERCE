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
import { NotiContainer, NotiManager } from './utils/notification'
import { useCookies } from 'react-cookie'
import { userServices } from './services/userServices'
import jwt from 'jsonwebtoken'
import { ProductDetailPage, productLoader } from './routes/ProductDetailPage'
import { cartItemServices } from './services/cartItemServices'
import { errorResponse } from './utils/errorResponse'
import { LogoutPage } from './routes/LogoutPage'

// const { cartItems } = require('./components/Cart/cart.js')
// const { cartItem } = require('./components/Cart/cartItem.js')

const MAX_CART_SIZE = 10

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

const useGlobalContext = () => {
  return useContext(CommonContext)
}

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
          })
        }
      })
    }
  }

  //user
  const setUser = async (user: any) => {
    dispatch({ type: 'SET_USER', payload: { user } })
  }

  //cart
  const toggleQuantity = (id: any, type: any) => {
    let cartItem = state.cart.find((item: any) => {
      return item._id === id
    })
    let quantity = cartItem.quantity

    if (type === 'inc') quantity = quantity + 1
    if (type === 'dec') quantity = quantity - 1 <= 0 ? 1 : quantity - 1
    cartItemServices
      .updateById(id, { quantity })
      .then((res) => {
        dispatch({ type: 'TOGGLE_QUANTITY', payload: { id, type } })
        NotiManager.success('Sửa thông tin giỏ thành công')
      })
      .catch((err) => {
        errorResponse.cart.toggleQuantity(err)
      })
  }

  const toggleSelect = (id: any, initialCheck: any) => {
    dispatch({ type: 'TOGGLE_SELECT', payload: { id, initialCheck } })
  }

  const getTotal = () => {
    dispatch({ type: 'GET_TOTAL' })
  }

  const fetchCart = async () => {
    //fetch here

    // if (!!state.user) {
    // console.log('got user!')
    // console.log(state.user)
    // console.log('cookie')
    // console.log(cookies)

    // console.log(new Cookies().get('token'))
    if (!!state.user) {
      cartItemServices
        .getList({
          userId: state.user._id,
          limit: MAX_CART_SIZE,
        })
        .then((res) => {
          //then dispatch
          console.log(res.data)
          dispatch({ type: 'LOAD_CART', payload: res.data.docs })
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      dispatch({ type: 'LOAD_CART', payload: [] })
    }
    // }
    // dispatch({ type: 'LOAD_CARTSELECTED' })
  }

  const addToCart = async (varianceId: any, userId: any, quantity: number) => {
    //check if exists
    const find = state.cart.find((item: any) => item.varianceId === varianceId)
    if (!!find) {
      console.log('find')
      console.log(find._id)

      cartItemServices
        .updateById(find._id, {
          quantity: find.quantity + quantity,
        })
        .then((res) => {
          dispatch({
            type: 'ADD_TO_CART',
            payload: {
              varianceId,
              quantity,
              type: 'ADD_EXIST',
              // cartItem,
            },
          })
          NotiManager.success('Thêm vào giỏ hàng thành công')
        })
        .catch((err) => {
          errorResponse.cart.addToCart(err)
        })
    }
    //add on DB first
    else
      cartItemServices
        .create({
          varianceId,
          userId,
          quantity,
        })
        .then((res) => {
          dispatch({
            type: 'ADD_TO_CART',
            payload: {
              cartItem: res.data,
              type: 'ADD_NEW',
              // cartItem,
            },
          })
          NotiManager.success('Thêm vào giỏ hàng thành công')
        })
        .catch((err) => {
          errorResponse.cart.addToCart(err)
        })
  }

  const deleteCartItem = (id: any) => {
    cartItemServices
      .deleteById(id)
      .then((res) => {
        NotiManager.success('Xóa khỏi giỏ hàng thành công')
        dispatch({ type: 'DELETE_CARTITEM', payload: { id } })
      })
      .catch((err) => {
        errorResponse.cart.deleteCartItem(err)
      })
  }

  const deleteAllCart = () => {
    state.cart.map((item: any) => {
      cartItemServices
        .deleteById(item._id)
        .then((res) => {
          NotiManager.success('Xóa khỏi giỏ hàng thành công')
          dispatch({ type: 'DELETE_CARTITEM', payload: { id: item._id } })
        })
        .catch((err) => {
          errorResponse.cart.deleteCartItem(err)
        })
    })
    // dispatch({ type: 'DELETE_ALLCART' })
  }

  useEffect(() => {
    getDataFromCookies(
      cookies
      //  ,decodedToken, isExpired, reEvaluateToken
    )
    // fetchCart(cookies)
  }, [])

  //fetch cart from a user
  useEffect(() => {
    fetchCart()
  }, [state.user, cookies])

  //change cart total
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
        addToCart,
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
