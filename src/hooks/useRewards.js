import { useCart } from "../context/CartContext"

export default function useRewards() {
  const { cart, history } = useCart()

  // 🔹 Total comprados (historial + carrito)
  const totalComprados =
    history.filter(i => !i.regalo).reduce((s, i) => s + i.cantidad, 0) +
    cart.filter(i => !i.regalo).reduce((s, i) => s + i.cantidad, 0)

  // 🔹 Regalos canjeados (historial)
  const regalosCanjeados = history.filter(i => i.regalo).reduce((s, i) => s + i.cantidad, 0)

  // 🔹 Regalos ya agregados en carrito
  const regalosEnCarrito = cart.filter(i => i.regalo).length

  // 🔹 Regalos totales según compras
  const regalosTotales = Math.floor(totalComprados / 10)

  // 🔹 Regalos pendientes (disponibles para canjear)
  const regalosPendientes = Math.max(0, regalosTotales - regalosCanjeados - regalosEnCarrito)

  // 🔹 Próximo regalo
  const faltan = totalComprados % 10 === 0 ? 10 : 10 - (totalComprados % 10)

  return {
    totalComprados,
    regalosCanjeados,
    regalosEnCarrito,
    regalosTotales,
    regalosPendientes,
    faltan
  }
}
