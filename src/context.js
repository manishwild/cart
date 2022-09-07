import React, {  useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const intialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }

  const increase = (id) => {
    dispatch({ type: 'INCREASE', payload: id })
  }

  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id })
  }
  // fetch from api using reducer
  const fetchData = async () => {
    dispatch({ type: 'LOADING' })
    const response = await fetch(url)
    const result = await response.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: result })
  }
  // total toggle function increase and decrease together
  const toggleAmount = (id, type) => {
    dispatch({ type: 'TOGGEL_AMOUNT', payload: { id, type } })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    dispatch({ type: 'GET_TOTAL' })
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
