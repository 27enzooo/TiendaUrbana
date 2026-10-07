# UrbanStore - Tienda E-Commerce y Backoffice de Administración

Aplicación Web SPA (Single Page Application) desarrollada en React para la gestión de ventas de ropa urbana, catálogo interactivo, carrito de compras y backoffice de administración de inventario en tiempo real.

## Tecnologías Utilizadas

- **Frontend:** React.js, JavaScript (ES6+), HTML5, CSS3
- **Estilos & UI:** Bootstrap 5
- **Enrutamiento:** React Router DOM
- **Persistencia:** LocalStorage (`db.js`)
- **Testing:** Jest / React Testing Library

## Estructura del Proyecto

text
src/
├── components/          # Componentes funcionales
│   ├── AdminView.js     # Panel administrador y métricas
│   ├── CheckoutView.js  # Formulario de pago
│   ├── ProductoCard.js  # Tarjeta individual de producto
│   └── ResultadoPago.js # Confirmación de transacción
├── data/
│   └── db.js            # Base de datos local e inicialización
├── App.css              # Estilos generales
├── App.js               # Enrutador principal y estado del carrito
├── App.test.js          # Suite de 10 pruebas unitarias
├── index.css            # Estilos globales
└── index.js             # Punto de entrada de la aplicación