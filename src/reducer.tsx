const groupByVendorName = (cartItems: any[]) => {
  let reduced = cartItems.reduce((result: any, item: any) => {
    let vendorId = item.variance.product.vendor.id
    let vendorName = item.variance.product.vendor.name

    //neu result[vendorId] undefine thi khoi tao
    result[vendorId] = result[vendorId] ?? {}

    result[vendorId].vendorName = vendorName

    result[vendorId].items = result[vendorId].items ?? []
    result[vendorId].items.push(item)

    return result
  }, {})

  let result = []
  for (let key in reduced) {
    let group = {
      vendorId: key,
      vendorName: reduced[key].vendorName,
      vendorItems: reduced[key].items,
    }
    result.push(group)
  }

  return result
}

function reducer(state: any, action: any) {
  if (action.type === 'TOGGLE_QUANTITY') {
    let tempCart = state.cart.map((cartItem: any, index: number) => {
      if (cartItem.id === action.payload.id) {
        let quantity
        if (action.payload.type === 'inc') quantity = cartItem.quantity + 1
        if (action.payload.type === 'dec')
          quantity = cartItem.quantity - 1 <= 0 ? 1 : cartItem.quantity - 1
        return { ...cartItem, quantity: quantity }
      }
      return cartItem
    })
    state.cart = tempCart
    state.groupedCartItems = groupByVendorName(state.cart)

    //if item is selected
    let tempCartSelected = state.cartSelected.map((cartItem: any) => {
      if (cartItem.id === action.payload.id) {
        let quantity
        if (action.payload.type === 'inc') quantity = cartItem.quantity + 1
        if (action.payload.type === 'dec')
          quantity = cartItem.quantity - 1 <= 0 ? 1 : cartItem.quantity - 1
        return { ...cartItem, quantity: quantity }
      } else return cartItem
    })

    state.cartSelected = tempCartSelected

    return { ...state }
  }

  if (action.type === 'TOGGLE_SELECT') {
    const newCheck = action.payload.initialCheck === true ? true : false
    // console.log('new check:' + newCheck)

    //
    let temp = state.cartSelected
    if (newCheck) {
      const selectedItem = state.cart.find(
        (item: any) => item.id === action.payload.id
      )
      temp.push(selectedItem)
    } else {
      temp = state.cartSelected.filter(
        (item: any) => item.id != action.payload.id
      )
    }
    console.log('state.cartSelected:' + state.cartSelected)
    return { ...state, cartSelected: temp }
  }

  if (action.type === 'GET_TOTAL') {
    console.log('cartSelected updated!')
    const cartSelectedTotal = state.cartSelected.reduce(
      (result: any, item: any) => {
        return result + item.quantity * item.variance.unitPrice
      },
      0
    )

    return { ...state, cartSelectedTotal }
  }

  if (action.type === 'LOAD_CART') {
    state.cart = action.payload
    state.groupedCartItems = groupByVendorName(state.cart)

    return { ...state, loading: false }
  }

  if (action.type === 'LOAD_CARTSELECTED') {
    state.cartSelected = []

    return { ...state }
  }

  if (action.type === 'DELETE_CARTITEM') {
    const newCart = state.cart.filter((item: any) => {
      return item.id !== action.payload.id
    })

    const newSelectedCart = state.cartSelected.filter((item: any) => {
      return item.id !== action.payload.id
    })

    state.cart = newCart
    state.cartSelected = newSelectedCart
    state.groupedCartItems = groupByVendorName(newCart)

    return { ...state }
  }

  if (action.type === 'DELETE_ALLCART') {
    const newCart: any[] = []
    state.cart = newCart
    state.groupedCartItems = groupByVendorName(state.cart)

    return { ...state }
  }
}

export { reducer }
