import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [history, setHistory] = useState([]) // 🔹 historial desde Firestore

  const addToCart = (amigurumi) => {
    setCart(prevCart => {
      if (amigurumi.regalo) {
        return [...prevCart, amigurumi] // regalos siempre como ítem separado
      }
      const existing = prevCart.find(item => item.id === amigurumi.id && !item.regalo)
      if (existing) {
        return prevCart.map(item =>
          item.id === amigurumi.id && !item.regalo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      } else {
        return [...prevCart, amigurumi]
      }
    })
  }

  const increaseQty = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    )
  }

  const decreaseQty = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    )
  }

  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  const clearCart = () => setCart([])

  // 🔹 Cálculos globales
  const paidCount = cart.filter(i => !i.regalo).reduce((s, i) => s + i.cantidad, 0)
  const giftsClaimed = cart.filter(i => i.regalo).length
  const giftsTotal = Math.floor(paidCount / 10)
  const giftsAvailable = Math.max(0, giftsTotal - giftsClaimed)

  // 🔹 Cálculos con historial (para Dashboard y coherencia)
  const totalComprados = history.filter(i => !i.regalo).reduce((s, i) => s + i.cantidad, 0) + paidCount
  const regalosCanjeados = history.filter(i => i.regalo).reduce((s, i) => s + i.cantidad, 0)
  const regalosPorCanjear = Math.max(0, Math.floor(totalComprados / 10) - regalosCanjeados - giftsClaimed)

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      increaseQty,
      decreaseQty,
      removeItem,
      clearCart,
      setCart,
      history,
      setHistory,
      paidCount,
      giftsClaimed,
      giftsTotal,
      giftsAvailable,
      totalComprados,
      regalosCanjeados,
      regalosPorCanjear
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
