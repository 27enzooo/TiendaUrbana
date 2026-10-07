import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function PagoExito() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="container my-4 text-center">
      <div className="alert alert-success p-4">
        <h2 className="fw-bold">✅ ¡Se ha realizado la compra! nro #{state?.nroOrden || '2026001'}</h2>
        <p className="lead">Gracias por tu compra en UrbanStore.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary mt-3">
          Volver a la tienda
        </button>
      </div>
    </div>
  );
}

export function PagoError() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="container my-4 text-center">
      <div className="alert alert-danger p-4">
        <h2 className="fw-bold">❌ No se pudo realizar el pago. nro #{state?.nroOrden || '2026001'}</h2>
        <p>Ocurrió un problema procesando tu transacción.</p>
        <button onClick={() => navigate('/checkout')} className="btn btn-warning mt-3 fw-bold">
          VOLVER A REALIZAR EL PAGO
        </button>
      </div>
    </div>
  );
}