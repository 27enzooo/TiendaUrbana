import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { obtenerProductos } from './data/db';
import ProductoCard from './components/ProductoCard';

import CheckoutView from './components/CheckoutView';
import { PagoExito, PagoError } from './components/ResultadoPago';

import AdminView from './components/AdminView';

// Componente para la página principal (Home)
function Home({ alAgregar }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  return (
    <div className="container my-4">
      <div className="p-4 mb-4 bg-light rounded-3 text-center">
        <h1 className="fw-bold">UrbanStore</h1>
        <p className="lead">Colección Urbana & Streetwear 2026</p>
      </div>

      <h3 className="mb-3 fw-bold">Productos Destacados</h3>
      <div className="row">
        {productos.map((prod) => (
          <ProductoCard key={prod.id} producto={prod} alAgregar={alAgregar} />
        ))}
      </div>
    </div>
  );
}

// Componente para ver el Carrito
function CarritoView({ carrito, setCarrito }) {
  const total = carrito.reduce((acc, item) => {
    const precio = item.oferta ? item.precioOferta : item.precio;
    return acc + precio * item.cantidad;
  }, 0);

  const eliminar = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4">Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <div className="alert alert-info">El carrito está vacío.</div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <ul className="list-group mb-3">
              {carrito.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="my-0">{item.nombre}</h6>
                    <small className="text-muted">Cantidad: {item.cantidad}</small>
                  </div>
                  <div>
                    <span className="text-muted me-3">
                      ${((item.oferta ? item.precioOferta : item.precio) * item.cantidad).toLocaleString("es-CL")}
                    </span>
                    <button onClick={() => eliminar(item.id)} className="btn btn-outline-danger btn-sm">
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5 className="fw-bold">Resumen</h5>
              <hr />
              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>Total:</span>
                <span>${total.toLocaleString("es-CL")}</span>
              </div>
              <Link to="/checkout" className="btn btn-success w-100">Proceder al Pago</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">UrbanStore</Link>
          <div className="navbar-nav me-auto">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/admin">Administración</Link>
          </div>
          <Link to="/carrito" className="btn btn-success">
            🛒 Carrito ({totalItems})
          </Link>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home alAgregar={agregarAlCarrito} />} />
          <Route path="/carrito" element={<CarritoView carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/checkout" element={<CheckoutView carrito={carrito} vaciarCarrito={() => setCarrito([])} />} />
          <Route path="/pago-exito" element={<PagoExito />} />
          <Route path="/pago-error" element={<PagoError />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;