import React from 'react';

function ProductoCard({ producto, alAgregar }) {
  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 shadow-sm">
        {producto.oferta && (
          <span className="badge bg-danger position-absolute top-0 end-0 m-2">
            Oferta
          </span>
        )}
        <img
          src={producto.imagen}
          className="card-img-top"
          alt={producto.nombre}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <small className="text-muted">{producto.categoria}</small>
          <h5 className="card-title text-truncate">{producto.nombre}</h5>
          <p className="card-text text-muted small">{producto.descripcion}</p>
          
          <div className="mt-auto">
            <div className="mb-2">
              {producto.oferta ? (
                <>
                  <span className="text-decoration-line-through text-muted me-2">
                    ${producto.precio.toLocaleString("es-CL")}
                  </span>
                  <span className="fw-bold text-danger">
                    ${producto.precioOferta.toLocaleString("es-CL")}
                  </span>
                </>
              ) : (
                <span className="fw-bold">
                  ${producto.precio.toLocaleString("es-CL")}
                </span>
              )}
            </div>
            
            <button
              onClick={() => alAgregar(producto)}
              className="btn btn-primary w-100 btn-sm"
              disabled={producto.stock === 0}
            >
              {producto.stock > 0 ? "Agregar al Carrito" : "Agotado"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoCard;