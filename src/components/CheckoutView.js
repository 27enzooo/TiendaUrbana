import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutView({ carrito, vaciarCarrito }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    calle: '',
    depto: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Cerrillos',
    indicaciones: ''
  });

  const total = carrito.reduce((acc, item) => {
    const precio = item.oferta ? item.precioOferta : item.precio;
    return acc + precio * item.cantidad;
  }, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePagar = (e) => {
    e.preventDefault();
    // Simulación simple: si el correo incluye "error", simula pago fallido
    const nroOrden = "2026" + Math.floor(1000 + Math.random() * 9000);
    const datosOrden = { ...formData, total, carrito, nroOrden };
    
    vaciarCarrito();
    
    if (formData.correo.includes('error')) {
      navigate('/pago-error', { state: datosOrden });
    } else {
      navigate('/pago-exito', { state: datosOrden });
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '800px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold m-0">Carrito de compra</h3>
          <span className="badge bg-primary fs-6">Total a pagar: ${total.toLocaleString("es-CL")}</span>
        </div>

        <form onSubmit={handlePagar}>
          <h5 className="fw-bold mb-3">Información del cliente</h5>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" name="nombre" required onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Apellidos</label>
              <input type="text" className="form-control" name="apellido" required onChange={handleChange} />
            </div>
            <div className="col-12">
              <label className="form-label">Correo electrónico</label>
              <input type="email" className="form-control" name="correo" required onChange={handleChange} />
            </div>
          </div>

          <h5 className="fw-bold mb-3">Dirección de entrega de los productos</h5>
          <div className="row g-3 mb-4">
            <div className="col-md-8">
              <label className="form-label">Calle y número</label>
              <input type="text" className="form-control" name="calle" required onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Departamento (opcional)</label>
              <input type="text" className="form-control" name="depto" onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Región</label>
              <select className="form-select" name="region" onChange={handleChange}>
                <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Comuna</label>
              <input type="text" className="form-control" name="comuna" value={formData.comuna} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label className="form-label">Indicaciones para la entrega (opcional)</label>
              <textarea className="form-control" name="indicaciones" rows="2" onChange={handleChange}></textarea>
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100 btn-lg fw-bold">
            Pagar ahora ${total.toLocaleString("es-CL")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutView;