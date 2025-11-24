import { useState } from "react"
import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

export default function Cart() {
  const { cart, addToCart, increaseQty, decreaseQty, removeItem, paidCount, giftsClaimed, regalosPorCanjear } = useCart()
  const navigate = useNavigate()
  const [giftSelected, setGiftSelected] = useState(null)

  const amigurumis = [
    { id: "AMG-001", nombre: "Ducky", descripcion: "Pato con sombrero" },
    { id: "AMG-002", nombre: "Flores eternas", descripcion: "Ramo de flores de tela" },
    { id: "AMG-003", nombre: "Oso de lana", descripcion: "Osito tejido a crochet" },
    { id: "AMG-004", nombre: "Baby Yoda", descripcion: "Grogu versión amigurumi" },
    { id: "AMG-005", nombre: "Eevee", descripcion: "Pokémon amigurumi" },
    { id: "AMG-006", nombre: "Vaporeon", descripcion: "Evolución de Eevee" },
    { id: "AMG-007", nombre: "Jolteon", descripcion: "Evolución de Eevee" },
    { id: "AMG-008", nombre: "Flareon", descripcion: "Evolución de Eevee" },
    { id: "AMG-009", nombre: "Espeon", descripcion: "Evolución de Eevee" },
    { id: "AMG-010", nombre: "Umbreon", descripcion: "Evolución de Eevee" },
    { id: "AMG-011", nombre: "Leafeon", descripcion: "Evolución de Eevee" },
    { id: "AMG-012", nombre: "Glaceon", descripcion: "Evolución de Eevee" },
    { id: "AMG-013", nombre: "Sylveon", descripcion: "Evolución de Eevee" }
  ]

  const handleGiftAdd = () => {
    if (!giftSelected || regalosPorCanjear <= 0) return
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
      <h2>🛒 Carrito de adopciones</h2>

      <div className="mb-3">
        <span className="badge bg-primary me-2">Pagados: {paidCount}</span>
        <span className="badge bg-success me-2">Regalos usados: {giftsClaimed}</span>
        <span className="badge bg-info">Regalos disponibles: {regalosPorCanjear}</span>
      </div>

      {cart.length === 0 ? (
        <p>No tienes amigurumis en el carrito.</p>
      ) : (
        <ul className="list-group">
          {cart.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.nombre}</strong> – {item.descripcion}
                <span className="badge bg-secondary ms-2">x{item.cantidad}</span>
                {item.regalo && <span className="badge bg-success ms-2">🎁 Regalo</span>}
              </div>
              <div>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => increaseQty(item.id)}
                  disabled={item.regalo}
                >
                  +
                </button>
                <button
                  className="btn btn-sm btn-outline-warning me-2"
                  onClick={() => decreaseQty(item.id)}
                  disabled={item.cantidad <= 1}
                >
                  -
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeItem(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {regalosPorCanjear > 0 && (
        <div className="alert alert-info mt-3">
          🎁 Tienes {regalosPorCanjear} regalo(s) disponibles para canjear.
          <div className="mt-2">
            <p className="mb-2">Selecciona tu regalo:</p>
            <div className="d-flex gap-2">
              <select
                className="form-select"
                value={giftSelected || ""}
                onChange={(e) => setGiftSelected(e.target.value)}
              >
                <option value="">-- Elige un amigurumi de regalo --</option>
                {amigurumis.map((a) => (
                  <option key={a.id} value={a.id}>{a.nombre}</option>
                ))}
              </select>
              <button
                className="btn btn-success"
                onClick={handleGiftAdd}
                disabled={!giftSelected}
              >
                Agregar regalo
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 d-flex justify-content-between">
        <button className="btn btn-outline-secondary" onClick={() => navigate("/adopt")}>
          ➕ Seguir adoptando
        </button>
        <button className="btn btn-success" onClick={() => navigate("/checkout")}>
          💳 Proceder al pago
        </button>
      </div>
    </div>
  )
}
