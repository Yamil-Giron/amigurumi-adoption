import { useCart } from "../context/CartContext"

export default function AmigurumiCard({ amigurumi }) {
  const { cart, addToCart, increaseQty, decreaseQty, removeItem } = useCart()
  const itemEnCarrito = cart.find(i => i.id === amigurumi.id)

  return (
    <div className="card mb-3 h-100">
      <div className="card-body">
        <h5 className="card-title">{amigurumi.nombre}</h5>
        <p className="card-text">{amigurumi.descripcion}</p>

        {itemEnCarrito ? (
          <div className="d-flex align-items-center">
            <button 
              className="btn btn-outline-success me-2"
              onClick={() => increaseQty(amigurumi.id)}
            >
              +
            </button>
            <span>{itemEnCarrito.cantidad}</span>
            <button 
              className="btn btn-outline-warning ms-2"
              onClick={() => decreaseQty(amigurumi.id)}
            >
              -
            </button>
            <button 
              className="btn btn-outline-danger ms-3"
              onClick={() => removeItem(amigurumi.id)}
            >
              Quitar
            </button>
          </div>
        ) : (
          <button 
            className="btn btn-primary"
            onClick={() => addToCart({ ...amigurumi, cantidad: 1, fecha: new Date().toISOString(), regalo: false })}
          >
            Adoptar
          </button>
        )}
      </div>
    </div>
  )
}
