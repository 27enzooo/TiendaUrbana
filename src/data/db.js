// Datos iniciales de la tienda de ropa urbana
export const inicialProductos = [
  {
    id: 1,
    nombre: "Polerón Oversize Streetwear",
    categoria: "Polerones",
    precio: 29990,
    oferta: true,
    precioOferta: 22990,
    stock: 15,
    imagen: "https://via.placeholder.com/400x300?text=Poleron+Oversize",
    descripcion: "Polerón de algodón pesado con corte holgado urbano."
  },
  {
    id: 2,
    nombre: "Polera Graphic Urban",
    categoria: "Poleras",
    precio: 14990,
    oferta: false,
    precioOferta: null,
    stock: 20,
    imagen: "https://via.placeholder.com/400x300?text=Polera+Graphic",
    descripcion: "Polera 100% algodón con estampado serigráfico."
  },
  {
    id: 3,
    nombre: "Pantalón Cargo Black",
    categoria: "Pantalones",
    precio: 34990,
    oferta: true,
    precioOferta: 28990,
    stock: 4, // Stock crítico
    imagen: "https://via.placeholder.com/400x300?text=Pantalon+Cargo",
    descripcion: "Pantalón cargo ajustable con múltiples bolsillos."
  },
  {
    id: 4,
    nombre: "Jockey Snapback Classic",
    categoria: "Accesorios",
    precio: 11990,
    oferta: false,
    precioOferta: null,
    stock: 8,
    imagen: "https://via.placeholder.com/400x300?text=Jockey+Snapback",
    descripcion: "Gorra urbana con visera plana y bordado frontal."
  }
];

export const inicialCategorias = [
  "Polerones",
  "Poleras",
  "Pantalones",
  "Accesorios"
];

// Funciones CRUD simuladas con localStorage
export const obtenerProductos = () => {
  const guardados = localStorage.getItem("productos");
  if (!guardados) {
    localStorage.setItem("productos", JSON.stringify(inicialProductos));
    return inicialProductos;
  }
  return JSON.parse(guardados);
};

export const guardarProducto = (nuevo) => {
  const productos = obtenerProductos();
  const actualizados = [...productos, { ...nuevo, id: Date.now() }];
  localStorage.setItem("productos", JSON.stringify(actualizados));
  return actualizados;
};

export const eliminarProducto = (id) => {
  const productos = obtenerProductos();
  const actualizados = productos.filter((p) => p.id !== id);
  localStorage.setItem("productos", JSON.stringify(actualizados));
  return actualizados;
};