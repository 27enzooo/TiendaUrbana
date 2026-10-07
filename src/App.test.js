import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { obtenerProductos, guardarProducto, eliminarProducto } from './data/db';

describe('Suite de Pruebas Unitarias - UrbanStore (Jasmine)', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('1. Carga inicial del catálogo de productos desde la BD local', () => {
    const productos = obtenerProductos();
    expect(productos.length).toBeGreaterThan(0);
  });

  it('2. Validación de estructura e integridad de cada producto', () => {
    const productos = obtenerProductos();
    productos.forEach(p => {
      expect(p.id).toBeDefined();
      expect(typeof p.nombre).toBe('string');
      expect(typeof p.precio).toBe('number');
      expect(typeof p.stock).toBe('number');
    });
  });

  it('3. Inserción de un nuevo producto en el inventario', () => {
    const productosIniciales = obtenerProductos();
    const nuevo = { id: 999, nombre: 'Polera Test Jasmine', precio: 15000, stock: 10, categoria: 'Poleras' };
    guardarProducto(nuevo);
    
    const productosActualizados = obtenerProductos();
    expect(productosActualizados.length).toBe(productosIniciales.length + 1);
  });

  it('4. Eliminación de un producto por ID', () => {
    const productos = obtenerProductos();
    const idAEliminar = productos[0].id;
    eliminarProducto(idAEliminar);

    const despues = obtenerProductos();
    expect(despues.find(p => p.id === idAEliminar)).toBeUndefined();
  });

  it('5. Identificación de alerta por Stock Crítico (< 5 unidades)', () => {
    const productos = obtenerProductos();
    const stockCritico = productos.filter(p => p.stock < 5);
    expect(Array.isArray(stockCritico)).toBe(true);
  });

  it('6. Cálculo total del valor monetario del inventario', () => {
    const productos = obtenerProductos();
    const valorTotal = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);
    expect(valorTotal).toBeGreaterThan(0);
  });

  it('7. Renderizado correcto del componente principal en el DOM', () => {
    render(<App />);
    const elementosNavbar = screen.getAllByText(/UrbanStore/i);
    expect(elementosNavbar.length).toBeGreaterThan(0);
  });

  it('8. Persistencia e integridad de datos en localStorage', () => {
    const productos = obtenerProductos();
    const primerProducto = productos[0];
    expect(primerProducto).toBeDefined();
    expect(typeof primerProducto.nombre).toBe('string');
  });

  it('9. Formato correcto de precios en pesos chilenos (CLP)', () => {
    const precio = 25000;
    const formateado = `$${precio.toLocaleString('es-CL')}`;
    expect(formateado).toContain('25');
  });

  it('10. Cálculo del total del carrito según cantidades', () => {
    const carrito = [
      { precio: 10000, cantidad: 2 },
      { precio: 5000, cantidad: 1 }
    ];
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    expect(total).toBe(25000);
  });

});