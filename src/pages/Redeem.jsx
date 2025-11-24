import { useState } from "react"
import { useCart } from "../context/CartContext"
import useRewards from "../hooks/useRewards"

export default function Redeem() {
  const { addToCart } = useCart()
  const { regalosPendientes } = useRewards()
  const [giftSelected, setGiftSelected] = useState(null)

  const amigurumis = [
    { id: "AMG-001", nombre: "Ducky", descripcion: "Pato con sombrero" },
    { id: "AMG-002", nombre: "Flores eternas", descripcion: "Ramo de flores de tela" },
    { id: "AMG-003", nombre: "Oso de lana", descripcion: "Osito tejido a crochet" },
    // … resto de lista
  ]

  const handleGiftAdd = () => {
    if (!giftSelected || regalosPendientes <= 0) return
    const base = amigurumis.find(a => a.id === giftSelected)
    if (!base) return

    const regalo = {
      ...base,
      id: `${base.id}-GIFT-${Date.now()}`,
      cantidad: 1,
      fecha: new Date().toISOString(),
      regalo: true
    }
    addToCart(regalo)
    setGiftSelected(null)
  }

  return (
    <div className="container mt-4">
      <h2>🎁 Canje de regalos</h2>
      {regalosPendientes > 0 ? (
        <div className="alert alert-info">
          Tienes <strong>{regalosPendientes}</strong> regalo(s) disponibles para canjear.
          <div className="mt-3 d-flex gap-2">
            <select
              className="form-select"
              value={giftSelected || ""}
              onChange={(e) => setGiftSelected(e.target.value)}
            >
              <option value="">-- Elige tu regalo --</option>
              {amigurumis.map((a) => (
                <option key={a.id} value={a.id}>{a.nombre}</option>
              ))}
            </select>
            <button
              className="btn btn-success"
              onClick={handleGiftAdd}
              disabled={!giftSelected}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      ) : (
        <p>No tienes regalos pendientes por ahora.</p>
      )}
    </div>
  )
}
