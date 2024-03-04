import fs from "fs";

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

  //Para generar "codes" al azar
  generateCode() {
    const numero = Math.floor(Math.random() * 999) + 1;
    const newCode = "ABC" + numero;
    return newCode;
  }

  //Para poder setear el nombre del archivo desde afuera de la clase
  setPath(nombreArchivo) {
    this.path = nombreArchivo;
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

  // ------------------------------------------------------------------------------------------

  //devuelve el arreglo con todos los productos creados hasta ese momento - leido desde el archivo; o la cantidad especificada en el parámetro
  async getProducts(cantidad) {
    console.log("path->" + this.path);
    if (fs.existsSync(this.path)) {
      const productos = await fs.promises.readFile(this.path, "utf-8");
      const productosJS = JSON.parse(productos);
      if (cantidad !== undefined) {
        if (cantidad.limit !== undefined) {
          this.products = productosJS.slice(0, cantidad.limit);
          return this.products;
        }
      }
      this.products = productosJS;
      return this.products;
    } else {
      return [];
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
