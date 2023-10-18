const fs = require('fs');

class ProductoManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.productos = [];
    this.loadProductos();
  }

  loadProductos() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      this.productos = JSON.parse(data);
    } catch (error) {
      console.log('No se pudo cargar el archivo de productos:', error);
    }
  }

  saveProductos() {
    try {
      const data = JSON.stringify(this.productos, null, 2);
      fs.writeFileSync(this.filePath, data, 'utf8');
    } catch (error) {
      console.log('No se pudo guardar el archivo de productos:', error);
    }
  }

  addProducto(producto) {
    this.productos.push(producto);
    this.saveProductos();
  }

  getProducto(id) {
    return this.productos.find((producto) => producto.id === id);
  }

  updateProducto(id, updatedProducto) {
    const index = this.productos.findIndex((producto) => producto.id === id);
    if (index !== -1) {
      this.productos[index] = { ...updatedProducto, id };
      this.saveProductos();
      return true;
    }
    return false;
  }

  deleteProducto(id) {
    const index = this.productos.findIndex((producto) => producto.id === id);
    if (index !== -1) {
      this.productos.splice(index, 1);
      this.saveProductos();
      return true;
    }
    return false;
  }
}

const productoManager = new ProductoManager('productos.json');

const nuevoProducto = {
  id: 10,
  titulo: "Nuevo Helado",
  precio: 1500,
};
productoManager.addProducto(nuevoProducto);

const productoConsultado = productoManager.getProducto(10);
console.log('Producto consultado:', productoConsultado);

const updatedProduct = {
  titulo: "Nuevo Helado Actualizado",
  precio: 1600,
};
const updated = productoManager.updateProducto(10, updatedProduct);
console.log('Producto actualizado:', updated);

const deleted = productoManager.deleteProducto(10);
console.log('Producto eliminado:', deleted);
