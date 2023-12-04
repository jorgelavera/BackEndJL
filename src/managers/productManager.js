import fs from 'fs';

export default class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  #evaluarSiExisteProducto(codeProducto) {
    return this.products.find((producto) => producto.code === codeProducto);
  }

  //Al agregarlo, debe crearse con un id autoincrementable
  #generarId() {
    let id = 1;
    if (this.products.length !== 0) {
      id = this.products[this.products.length - 1].id + 1;
    }
    return id;
  }

  // ------------------------------------------------------------------------------------------

  //devuelve el arreglo con todos los productos creados hasta ese momento - leido desde el archivo; o la cantidad especificada en el parámetro
  async getProducts(cantidad) {
    console.log(this.path);
    if (fs.existsSync(this.path)) {
      const productos = await fs.promises.readFile(this.path, "utf-8");
      const productosJS = JSON.parse(productos);
      if (cantidad !== undefined) {
        if (cantidad.limit !== undefined) {
          this.productos = productosJS.slice(0, cantidad.limit);
          return this.products;
        }
      }
      this.products = productosJS;
      return this.products;
    } else {
      return [];
    }
  }

  // Grabar el arreglo al archivo en un json
  async grabarArchivo() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products),
        "utf-8"
      );
      console.log("(Datos grabados ok)");
    } catch (error) {
      console.log("Error al grabar el archivo");
    }
  }

  //agrega un producto al arreglo de products; Valida que no se repita el campo “code” y que todos los campos sean obligatorios
  async addProduct(title, description, price, thumbnail, code, stock) {
    console.log(title);
    const verifCode = this.#evaluarSiExisteProducto(code);
    if (verifCode) {
      console.error(`Code ${code} ya esta en uso, NO PUEDE volver a usarlo.`);
    } else {
      console.log(`Code ${code} esta disponible, agregado ok.`);
      const producto = {
        id: this.#generarId(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      //console.log(producto)
      this.products.push(producto);
      await this.grabarArchivo();
      return producto;
    }
  }

  // Lee el arreglo desde el archivo
  // Busca en el arreglo el producto que coincida con el id.
  // En caso de no coincidir ningún id, mostrar en consola un error “Not found”
  async getProductById(id) {
    await this.getProducts();
    const encontrado = this.products.find((producto) => producto.id === id);
    if (encontrado == undefined) {
      console.log(`Error: id de producto ${id} no se encuentra.`);
      return "";
    } else {
      return { encontrado }; // En formato objeto
    }
  }

  //Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
  async deleteProduct(id) {
    await this.getProducts();
    const encontrado = this.products.find((producto) => producto.id === id);
    if (encontrado == undefined || encontrado.id !== id) {
      console.log(`Error: id ${id} no se encuentra para borrar.`);
      return "";
    } else {
      console.log(`Borrado id ${id}`);
      const posicion = this.products.findIndex(
        (producto) => producto.id === id
      );
      this.products.splice(posicion, 1);
      await this.grabarArchivo();
      return encontrado;
    }
  }

  //Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    await this.getProducts();
    const verifCode = this.#evaluarSiExisteProducto(code);
    if (verifCode) {
      console.error(
        `Code ${code} ya esta en uso, NO PUEDE actualizar con este código.`
      );
    } else {
      const aModificar = this.getProductById(id);
      if (aModificar) {
        const producto = {
          id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        const posicion = this.productos.findIndex(
          (producto) => producto.id === id
        );
        this.productos[posicion] = producto;
        await this.grabarArchivo();
        return producto;
      } else {
        console.error(
          `id ${id} no se encuentra, no puede actualizar con este id.`
        );
      }
    }
  }
}

// TESTING ==============================================================================================================================

const test = async () => {
  // Se creará una instancia de la clase “ProductManager”
  const productManager = new ProductManager("./prueba.json");

  // Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
  let allProducts = await productManager.getProducts();
  console.log("Todos los productos:", allProducts);

  // Se llamará al método “addProduct” con los campos:
  // title: “producto prueba”
  // description:”Este es un producto prueba”
  // price:200,
  // thumbnail:”Sin imagen”
  // code:”abc123”,
  // stock:25

  // title, description, price, thumbnail, code, stock
  // El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE

  productManager.addProduct(
    "producto prueba 1",
    "Este es un producto prueba 1",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  productManager.addProduct(
    "producto prueba 2",
    "Este es un producto prueba 2",
    300,
    "imagen2.jpg",
    "abc456",
    30
  );

  // Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
  allProducts = await productManager.getProducts();
  console.log("Todos los productos despues del primer Add:", allProducts);

  // Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
  productManager.addProduct(
    "producto prueba 2",
    "Este es un producto prueba 2",
    300,
    "imagen2.jpg",
    "abc123",
    30
  );

  // Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
  let productById = await productManager.getProductById(1);
  console.log("Producto por ID:", productById);

  productById = await productManager.getProductById(144);
  console.log("Producto por ID:", productById);

  // Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
  productManager.updateProduct(
    2,
    "producto prueba modificado",
    "Este es un producto prueba modificado",
    301,
    "imagen3.jpg",
    "abc123",
    31
  );

  console.log("Producto por ID:", await productManager.getProductById(2));

  // Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
  console.log("Eliminado por ID:", await productManager.deleteProduct(2));
};


