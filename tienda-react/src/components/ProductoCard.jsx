function ProductoCard({ producto, formatoCOP, onEditar, onEliminar }) {
  const disponible = Number(producto.stock) > 0;

  return (
    <article className="product-card">
      <div className="product-card-top">
        <div className="product-symbol" aria-hidden="true">▧</div>
        <span className={`stock-pill ${disponible ? "stock-available" : "stock-empty"}`}>
          {disponible ? "Disponible" : "Agotado"}
        </span>
      </div>
      <h3>{producto.nombre}</h3>
      <p className="product-price">{formatoCOP(Number(producto.precio))}</p>
      <div className="stock-line"><span>Unidades en stock</span><strong>{producto.stock}</strong></div>
      <div className="card-actions">
        <button className="button button-secondary" type="button" onClick={() => onEditar(producto)}>Editar</button>
        <button className="button button-danger" type="button" onClick={() => onEliminar(producto.id)}>Eliminar</button>
      </div>
    </article>
  );
}

export default ProductoCard;
