class ProductManager {
    constructor() {
        this.products = []
    };

    #evaluarSiExisteProducto(codeProducto) {
        return this.products.find((producto) => producto.code === codeProducto)
    };

    //Al agregarlo, debe crearse con un id autoincrementable
    #generarId() {
        let id = 1
        if (this.products.length !== 0) {
            id = this.products[this.products.length - 1].id + 1
        }
        return id
    };

    // ------------------------------------------------------------------------------------------

    //devuelve el arreglo con todos los products creados hasta ese momento
    getProducts() {
        return this.products;
      }

    //agrega un producto al arreglo de products; Valida que no se repita el campo “code” y que todos los campos sean obligatorios
    addProduct(title, description, price, thumbnail, code, stock) {
        console.log(title)
        const verifCode = this.#evaluarSiExisteProducto(code)
        if (verifCode) {
            console.error(`Code ${code} ya esta en uso, NO PUEDE volver a usarlo.`)
        } else {
            console.log(`Code ${code} esta disponible, agregado ok.`)
            const producto = {
                id: this.#generarId(),
                title, description, price, thumbnail, code, stock
            }
            //console.log(producto)
            this.products.push(producto)
            return (producto)
        }
    };

    // Busca en el arreglo el producto que coincida con el id. 
    // En caso de no coincidir ningún id, mostrar en consola un error “Not found”
    getProductById(id) {
        this.getProducts();
        const encontrado = this.products.find((producto) => producto.id === id);
        if (encontrado == undefined) {
            console.log(`Error: id de producto ${id} no se encuentra.`);
            return ('');
        } else {
            return ({ encontrado }); // En formato objeto
        }
    };

    //Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
    deleteProduct(id) {
        this.getProducts();
        const encontrado = this.products.find((producto) => producto.id === id);
        if (encontrado == undefined || encontrado.id !== id) {
            console.log(`Error: id ${id} no se encuentra para borrar.`);
            return ('');
        } else {
            console.log(`Borrado id ${id}`);
            const posicion = this.products.findIndex((producto) => producto.id === id)
            this.products.splice(posicion, 1)
            return (encontrado);
        }
    }

};


// TESTING

// Se creará una instancia de la clase “ProductManager”
const productManager = new ProductManager();

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []

let allProducts = productManager.getProducts();
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

productManager.addProduct("producto prueba 1", "Este es un producto prueba 1", 200, "Sin imagen", "abc123", 25);
productManager.addProduct("producto prueba 2", "Este es un producto prueba 2", 300, "imagen2.jpg", "abc456", 30);

// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
allProducts = productManager.getProducts();
console.log("Todos los productos despues del primer Add}:", allProducts);

// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
productManager.addProduct("producto prueba 2", "Este es un producto prueba 2", 300, "imagen2.jpg", "abc123", 30);

// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
let productById = productManager.getProductById(1);
console.log("Producto por ID:", productById);

productById = productManager.getProductById(144);
console.log("Producto por ID:", productById);