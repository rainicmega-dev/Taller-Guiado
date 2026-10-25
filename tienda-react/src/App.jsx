import { useEffect, useMemo, useState } from "react";
import "./App.css";
import BuscadorPokemon from "./components/BuscadorPokemon";
import ProductoCard from "./components/ProductoCard";
import { productos as productosIniciales } from "./data/productos";

const CLAVE_PRODUCTOS = "productos";

function leerProductosGuardados() {
  try {
    const guardados = localStorage.getItem(CLAVE_PRODUCTOS);
    if (guardados === null) return productosIniciales;
    const datos = JSON.parse(guardados);
    return Array.isArray(datos) ? datos : productosIniciales;
  } catch {
    return productosIniciales;
  }
}

function App() {
  const [productos, setProductos] = useState(leerProductosGuardados);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos));
    } catch {
      setMensaje("No se pudieron guardar los cambios en este navegador.");
    }
  }, [productos]);

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLocaleLowerCase("es");
    if (!texto) return productos;
    return productos.filter((producto) =>
      producto.nombre.toLocaleLowerCase("es").includes(texto)
    );
  }, [productos, busqueda]);

  const disponibles = productos.filter((producto) => Number(producto.stock) > 0).length;
  const valorInventario = productos.reduce(
    (total, producto) => total + Number(producto.precio) * Number(producto.stock),
    0
  );
  const formatoCOP = (valor) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(valor);

  const limpiarFormulario = () => {
    setNombre("");
    setPrecio("");
    setStock("");
    setEditandoId(null);
  };

  const guardarProducto = (e) => {
    e.preventDefault();
    setMensaje("");

    if (!nombre.trim() || precio === "" || stock === "") {
      setMensaje("Completa el nombre, el precio y el stock.");
      return;
    }
    if (!Number.isFinite(Number(precio)) || Number(precio) <= 0) {
      setMensaje("El precio debe ser un número mayor que cero.");
      return;
    }
    if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
      setMensaje("El stock debe ser un número entero igual o mayor que cero.");
      return;
    }

    const producto = {
      id: editandoId ?? Date.now(),
      nombre: nombre.trim(),
      precio: Number(precio),
      stock: Number(stock),
    };

    if (editandoId === null) {
      setProductos((actuales) => [...actuales, producto]);
      setMensaje("Producto agregado y guardado en este navegador.");
    } else {
      setProductos((actuales) =>
        actuales.map((item) => (item.id === editandoId ? { ...item, ...producto } : item))
      );
      setMensaje("Producto actualizado.");
    }
    limpiarFormulario();
  };

  const editarProducto = (producto) => {
    setEditandoId(producto.id);
    setNombre(producto.nombre);
    setPrecio(String(producto.precio));
    setStock(String(producto.stock));
    setMensaje("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eliminarProducto = (id) => {
    const producto = productos.find((item) => item.id === id);
    if (!window.confirm(`¿Seguro que deseas eliminar “${producto?.nombre ?? "este producto"}”?`)) return;
    setProductos((actuales) => actuales.filter((item) => item.id !== id));
    if (editandoId === id) limpiarFormulario();
    setMensaje("Producto eliminado.");
  };

  const restaurarEjemplo = () => {
    if (!window.confirm("Esto reemplazará el inventario actual por los productos de ejemplo. ¿Continuar?")) return;
    setProductos(productosIniciales);
    limpiarFormulario();
    setBusqueda("");
    setMensaje("Inventario de ejemplo restaurado.");
  };

  return (
    <main className="app-shell">
      <header className="hero">
        <div className="hero-copy">
          <span className="eyebrow">PRÁCTICA DE REACT · CRUD + LOCALSTORAGE</span>
          <h1>Tienda tecnológica</h1>
          <p>Administra tu inventario. Los cambios quedan guardados en este navegador, incluso después de recargar.</p>
        </div>
        <div className="hero-icon" aria-hidden="true">▦</div>
      </header>

      <section className="stats-grid" aria-label="Resumen del inventario">
        <article className="stat-card"><span>Productos registrados</span><strong>{productos.length}</strong><small>En el inventario local</small></article>
        <article className="stat-card"><span>Con existencias</span><strong>{disponibles}</strong><small>Productos con stock mayor a cero</small></article>
        <article className="stat-card"><span>Valor del inventario</span><strong>{formatoCOP(valorInventario)}</strong><small>Precio × cantidad disponible</small></article>
      </section>

      <section className="panel form-panel">
        <div className="section-heading">
          <div><span className="eyebrow">GESTIÓN DE PRODUCTOS</span><h2>{editandoId === null ? "Agregar producto" : "Editar producto"}</h2></div>
          {editandoId !== null && <button className="button button-quiet" type="button" onClick={limpiarFormulario}>Cancelar edición</button>}
        </div>
        <form className="product-form" onSubmit={guardarProducto}>
          <label>Nombre del producto<input type="text" placeholder="Ej. Teclado mecánico" value={nombre} onChange={(e) => setNombre(e.target.value)} maxLength={80} /></label>
          <label>Precio (COP)<input type="number" min="1" step="1" placeholder="90000" value={precio} onChange={(e) => setPrecio(e.target.value)} /></label>
          <label>Stock<input type="number" min="0" step="1" placeholder="5" value={stock} onChange={(e) => setStock(e.target.value)} /></label>
          <button className="button button-primary form-submit" type="submit">{editandoId === null ? "+ Agregar producto" : "Guardar cambios"}</button>
        </form>
        {mensaje && <p className="notice" role="status">{mensaje}</p>}
      </section>

      <section className="inventory-section">
        <div className="section-heading inventory-heading">
          <div><span className="eyebrow">INVENTARIO</span><h2>Productos registrados</h2></div>
          <button className="button button-quiet" type="button" onClick={restaurarEjemplo}>Restaurar ejemplos</button>
        </div>
        <div className="search-row">
          <label className="search-box"><span aria-hidden="true">⌕</span><input type="search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar por nombre..." aria-label="Buscar productos por nombre" /></label>
          <span className="result-count">{productosFiltrados.length} de {productos.length} productos</span>
        </div>
        {productosFiltrados.length > 0 ? (
          <div className="product-grid">
            {productosFiltrados.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} formatoCOP={formatoCOP} onEditar={editarProducto} onEliminar={eliminarProducto} />
            ))}
          </div>
        ) : (
          <div className="empty-state"><span>⌕</span><h3>No encontramos productos</h3><p>Prueba otra búsqueda o agrega un producto nuevo.</p></div>
        )}
      </section>

      <BuscadorPokemon />

      <footer className="footer"><span>Práctica académica de React</span><span>Datos almacenados localmente · No se envían a un servidor</span></footer>
    </main>
  );
}

export default App;
