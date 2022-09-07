import React from 'react'
import CartContainer from './CartContainer'
import NavBar from './NavBar'
import { useGlobalContext } from './context'

const App = () => {
  const { loading } = useGlobalContext()
  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <main>
      <NavBar />
      <CartContainer />
    </main>
  )
}

export default App
