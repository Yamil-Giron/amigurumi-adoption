import { useCart } from "../context/CartContext"

export default function Product({ producto }) {
  const { addToCart, removeFromCart, decreaseQuantity } = useCart()

  return (
    <div className="card mb-3" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">{producto.descripcion}</p>
        <p><strong>Precio:</strong> ${producto.precio}</p>

        <div className="d-flex align-items-center">
          <button 
            className="btn btn-outline-success me-2" 
            onClick={() => addToCart(producto)}
          >
            +
          </button>

          <button 
            className="btn btn-outline-warning me-2" 
            onClick={() => decreaseQuantity(producto.id)}
          >
            -
          </button>

          <button 
            className="btn btn-outline-danger" 
            onClick={() => removeFromCart(producto.id)}
          >
            Quitar
          </button>
        </div>
      </div>
    </div>
  )
}
