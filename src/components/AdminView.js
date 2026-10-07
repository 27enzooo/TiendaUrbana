import React, { useState, useEffect } from 'react';
import { obtenerProductos, guardarProducto, eliminarProducto } from '../data/db';

function AdminView() {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({
    nombre: '',
    categoria: 'Polerones',
    precio: '',
    oferta: false,
    precioOferta: '',
    stock: '',
    imagen: 'https://via.placeholder.com/400x300?text=Ropa+Urbana',
    descripcion: ''
  });

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevo({
      ...nuevo,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCrear = (e) => {
    e.preventDefault();
    if (!nuevo.nombre || !nuevo.precio || !nuevo.stock) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }

    const productoAInsertar = {
      ...nuevo,
      precio: Number(nuevo.precio),
      stock: Number(nuevo.stock),
      precioOferta: nuevo.oferta && nuevo.precioOferta ? Number(nuevo.precioOferta) : null
    };

    const actualizados = guardarProducto(productoAInsertar);
    setProductos(actualizados);
    alert("¡Producto agregado con éxito!");

    // Resetear formulario
    setNuevo({
      nombre: '',
      categoria: 'Polerones',
      precio: '',
      oferta: false,
      precioOferta: '',
      stock: '',
      imagen: 'https://via.placeholder.com/400x300?text=Ropa+Urbana',
      descripcion: ''
    });
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      const actualizados = eliminarProducto(id);
      setProductos(actualizados);
    }
  };

  // Cálculo de Indicadores (Dashboard)
  const totalProductos = productos.length;
  const productosStockCritico = productos.filter((p) => p.stock <= 5).length;
  const valorInventario = productos.reduce((acc, p) => acc + p.precio * p.stock, 0);

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4">Panel de Administración - UrbanStore</h2>

      {/* DASHBOARD CON INDICADORES */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white p-3 shadow-sm text-center">
            <h5>Total Productos</h5>
            <h2 className="fw-bold m-0">{totalProductos}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-dark p-3 shadow-sm text-center">
            <h5>Stock Crítico (≤ 5)</h5>
            <h2 className="fw-bold m-0">{productosStockCritico}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white p-3 shadow-sm text-center">
            <h5>Valor del Inventario</h5>
            <h2 className="fw-bold m-0">${valorInventario.toLocaleString("es-CL")}</h2>
          </div>
        </div>
      </div>

      <div className="row">
        {/* FORMULARIO PARA CREAR PRODUCTO */}
        <div className="col-md-5 mb-4">
          <div className="card p-3 shadow-sm">
            <h4 className="fw-bold mb-3">Agregar Nuevo Producto</h4>
            <form onSubmit={handleCrear}>
              <div className="mb-2">
                <label className="form-label small fw-bold">Nombre del Producto</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="nombre"
                  value={nuevo.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label small fw-bold">Categoría</label>
                <select
                  className="form-select form-select-sm"
                  name="categoria"
                  value={nuevo.categoria}
                  onChange={handleChange}
                >
                  <option value="Polerones">Polerones</option>
                  <option value="Poleras">Poleras</option>
                  <option value="Pantalones">Pantalones</option>
                  <option value="Accesorios">Accesorios</option>
                </select>
              </div>

              <div className="row g-2 mb-2">
                <div className="col-6">
                  <label className="form-label small fw-bold">Precio ($)</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    name="precio"
                    value={nuevo.precio}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-bold">Stock</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    name="stock"
                    value={nuevo.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="ofertaCheck"
                  name="oferta"
                  checked={nuevo.oferta}
                  onChange={handleChange}
                />
                <label className="form-check-label small" htmlFor="ofertaCheck">
                  ¿Está en Oferta?
                </label>
              </div>

              {nuevo.oferta && (
                <div className="mb-2">
                  <label className="form-label small fw-bold">Precio Oferta ($)</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    name="precioOferta"
                    value={nuevo.precioOferta}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label small fw-bold">Descripción</label>
                <textarea
                  className="form-control form-control-sm"
                  name="descripcion"
                  rows="2"
                  value={nuevo.descripcion}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-dark w-100 fw-bold">
                Guardar Producto
              </button>
            </form>
          </div>
        </div>

        {/* TABLA DE PRODUCTOS (LISTADO Y ELIMINACIÓN) */}
        <div className="col-md-7">
          <div className="card p-3 shadow-sm">
            <h4 className="fw-bold mb-3">Gestión de Inventario</h4>
            <div className="table-responsive">
              <table className="table table-hover align-middle small">
                <thead className="table-dark">
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((prod) => (
                    <tr key={prod.id}>
                      <td className="fw-bold">{prod.nombre}</td>
                      <td>{prod.categoria}</td>
                      <td>${prod.precio.toLocaleString("es-CL")}</td>
                      <td>
                        <span className={`badge ${prod.stock <= 5 ? 'bg-danger' : 'bg-secondary'}`}>
                          {prod.stock} un.
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleEliminar(prod.id)}
                          className="btn btn-danger btn-sm py-0 px-2"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminView;