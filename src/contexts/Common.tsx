import React, { useContext, useEffect, useReducer } from 'react'
import { useCookies } from 'react-cookie'
import jwt from 'jsonwebtoken'
import { userServices } from '../services/userServices'
import { reducer } from '../reducer'
import { cartItemServices } from '../services/cartItemServices'
import { errorResponse } from '../utils/errorResponse'
import { NotiManager } from '../utils/notification'

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

const MAX_CART_SIZE = 10

const CommonContext = React.createContext(null)

const CommonContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [cookies, setCookie, removeCookie] = useCookies()

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

  const fetchCart = () => {
    //fetch here
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
    getDataFromCookies(cookies)
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

export { CommonContext, CommonContextProvider }
