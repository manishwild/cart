const reducer = (state, action) => {
  // clearCart
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] }
  }
  //Remove
  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter((Item) => Item.id !== action.payload),
    }
  }
  // increase
  if (action.type === 'INCREASE') {
    let tempCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 }
      }
      return item
    })
    return { ...state, cart: tempCart }
  }
  //decrease
  if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 }
        }
        return item
      })
      .filter((item) => item.amount !== 0)
    return { ...state, cart: tempCart }
  }
  // getTotal
  if (action.type === 'GET_TOTAL') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItems) => {
        const { price, amount } = cartItems
        // console.log(price, amount)
        const itemTotal = price * amount

        cartTotal.total += itemTotal
        cartTotal.amount += amount

        return cartTotal
      },
      {
        total: 0,
        amount: 0,
      }
    )
    total = parseFloat(total.toFixed(2))
    return { ...state, total, amount }
  }
  // loading
  if (action.type === 'LOADING') {
    return { ...state, loading: true }
  }
 // fetching item from api
  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, cart: action.payload, loading: false }
  }
  //toggle increase and decrease
  if (action.type ==='TOGGEL_AMOUNT') {
    let tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.type === 'inc') {
            return { ...item, amount: item.amount + 1 }
          }
          if (action.payload.type === 'dec') {
            return { ...item, amount: item.amount - 1 }
          }
        }
        return item
      })
      .filter((item) => item.amount !== 0)
    return {...state,cart:tempCart}
  }
  throw new Error('no matching action type')
}

export default reducer
