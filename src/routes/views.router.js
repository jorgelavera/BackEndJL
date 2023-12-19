import express from "express";
import ProductManager from "../managers/productManager.js";
import __dirname from "../utils.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log(__dirname + "/data/products.json")
    let productos = new ProductManager(__dirname + "/data/products.json");
    let allProducts = await productos.getProducts();
    let stringAllProducts = JSON.stringify(allProducts,null,4)
    console.log(stringAllProducts);
    res.render("index", {stringAllProducts} );
  } catch (error) {
    console.error(error);
  }
}); 

router.get("/realtimeproducts", async (req, res) => {
    try {
      console.log(__dirname + "/data/products.json")
      let productos = new ProductManager(__dirname + "/data/products.json");
      let allProducts = await productos.getProducts();
      let stringAllProducts = JSON.stringify(allProducts,null,4)
      console.log(stringAllProducts);
      res.render("realTimeProducts", {stringAllProducts} );
    } catch (error) {
      console.error(error);
    }
  }); 

export default router;
