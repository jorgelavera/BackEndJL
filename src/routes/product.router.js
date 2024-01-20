import { Router } from "express";
import ProductManager from "../dao/managers/productManager.js";
import __dirname from "../utils.js";
import { productosModel } from "../dao/models/productos.model.js";

const productRouter = Router();

const product = new ProductManager();
product.setPath(__dirname + "/data/productos.json");

// Probar con http://localhost:8080/api/products?limit=2
productRouter.get("/", async (req, res) => {
  try {
    const allProducts = await productosModel.find();
    let stringAllProducts = JSON.stringify(allProducts,null,4)
    console.log(stringAllProducts);
    //res.status(200).json({product});
    res.render("mongo", { stringAllProducts });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "no se encontro el producto" });
  }
});

// Probar con http://localhost:8080/api/products/4
productRouter.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const producto = await product.getProductById(parseInt(pid));
  if (producto) {
    res.json({ message: "Producto encontrado", producto });
  } else {
    res.status(400).send("El producto no existe");
  }
});

productRouter.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const producto = await productosModel.deleteOne(parseInt(pid));
  if (producto) {
    res.json({ message: "Producto eliminado", producto });
  } else {
    res.status(400).send("El producto no existe");
  }
});

productRouter.post("/", async (req, res) => {
  let content = req.body;
  try {
    await productosModel.create({id,title,description,price,thumbnail,stock,code});
    res.json({message: 'producto actualizado'});
  } catch (error) {
    console.error(error);
    res.status(400).send("El producto no fue agregado");

  }
});

productRouter.put("/", async (req, res) => {
  let content = req.body;
  try {
    await productosModel.updateOne({_id: id}, updateProduct)
    res.json({message: 'producto actualizado'});
  } catch (error) {
    console.error(error);
    res.status(400).json({message: 'no pudo actualizar'});
  }
});

export default productRouter;
