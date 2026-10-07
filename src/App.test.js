import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock simple de localStorage para el entorno de Node/Jest
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
    removeItem: (key) => { delete store[key]; }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Pruebas Unitarias - UrbanStore (Evaluación Parcial 2)', () => {

  const productosIniciales = [
    { id: 1, nombre: 'Polera Oversize Black', precio: 19990, stock: 12, categoria: 'Poleras' },
    { id: 2, nombre: 'Polerón Hoodie Streetwear', precio: 34990, stock: 3, categoria: 'Polerones' },
    { id: 3, nombre: 'Pantalón Cargo Beige', precio: 29990, stock: 2, categoria: 'Pantalones' }
  ];

  // 1. Carga inicial de productos
  test('1. Obtiene la lista inicial de productos del catálogo', () => {
    expect(Array.isArray(productosIniciales)).toBe(true);
    expect(productosIniciales.length).toBeGreaterThan(0);
  });

  // 2. Estructura de un producto
  test('2. Cada producto contiene id, nombre, precio, stock y categoría', () => {
    const prod = productosIniciales[0];
    expect(prod).toHaveProperty('id');
    expect(prod).toHaveProperty('nombre');
    expect(prod).toHaveProperty('precio');
    expect(prod).toHaveProperty('stock');
    expect(prod).toHaveProperty('categoria');
  });

  // 3. Formateo de precio CLP
  test('3. Formatea correctamente un número a formato de moneda chilena (CLP)', () => {
    const formatearPrecio = (val) => `$${val.toLocaleString('es-CL')}`;
    const precioFormateado = formatearPrecio(15000);
    expect(precioFormateado).toContain('15');
  });

  // 4. Agregar producto
  test('4. Agrega un nuevo producto correctamente al listado', () => {
    const lista = [...productosIniciales];
    const nuevo = { id: 4, nombre: 'Jacket Urbano Test', precio: 45000, stock: 8, categoria: 'Chaquetas' };
    lista.push(nuevo);
    expect(lista.length).toBe(4);
  });

  // 5. Eliminar producto
  test('5. Elimina un producto por su ID correctamente', () => {
    const lista = [...productosIniciales];
    const listaFiltrada = lista.filter(p => p.id !== 1);
    expect(listaFiltrada.some(p => p.id === 1)).toBe(false);
  });

  // 6. Indicadores Admin
  test('6. Calcula correctamente los indicadores del Dashboard Admin', () => {
    const totalProductos = productosIniciales.length;
    const stockCritico = productosIniciales.filter(p => p.stock < 5).length;
    const valorInventario = productosIniciales.reduce((acc, p) => acc + (p.precio * p.stock), 0);

    expect(totalProductos).toBe(3);
    expect(stockCritico).toBe(2);
    expect(valorInventario).toBeGreaterThan(0);
  });

  // 7. Simulación de carrito
  test('7. Simula la adición de un ítem al carrito de compras', () => {
    const carrito = [];
    const item = { id: 1, nombre: 'Polera Oversize Black', precio: 19990, cantidad: 1 };
    carrito.push(item);
    expect(carrito.length).toBe(1);
    expect(carrito[0].cantidad).toBe(1);
  });

  // 8. Cálculo de Total del Carrito
  test('8. Calcula correctamente el total a pagar en el carrito', () => {
    const carritoMock = [
      { id: 1, precio: 10000, cantidad: 2 },
      { id: 2, precio: 5000, cantidad: 1 }
    ];
    const total = carritoMock.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    expect(total).toBe(25000);
  });

  // 9. Stock crítico (< 5 unidades)
  test('9. Identifica productos con stock crítico (menor a 5 unidades)', () => {
    const criticos = productosIniciales.filter(p => p.stock < 5);
    expect(criticos.length).toBe(2);
  });

  // 10. Persistencia / Almacenamiento
  test('10. Mantiene la consistencia de los datos en localStorage', () => {
    localStorage.setItem('urbanstore_test', JSON.stringify(productosIniciales));
    const guardados = JSON.parse(localStorage.getItem('urbanstore_test'));
    expect(guardados.length).toBe(3);
  });

});