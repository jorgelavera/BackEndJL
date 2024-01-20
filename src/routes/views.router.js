import express from "express";
import ProductManager from "../dao/managers/productManager.js";
import __dirname from "../utils.js";
import { productosModel } from '../dao/models/productos.model.js';

const router = express.Router();
const product = new ProductManager;

//router.get("/", async (req, res) => {
//  try {
//    console.log(__dirname + "/data/products.json")
//    let productos = new ProductManager(__dirname + "/data/products.json");
//    let allProducts = await productos.getProducts();
//    let stringAllProducts = JSON.stringify(allProducts,null,4)
//    console.log(stringAllProducts);
//    res.render("index", {stringAllProducts} );
//  } catch (error) {
//    console.error(error);
//  }
//}); 

router.get('/', async (req, res) => {
  try {
      const productos = await productosModel.find();
      console.log(product);
      //res.status(200).json({product});
      res.render("index", {product} );
      } catch (error) {
      console.error(error);
      res.status(400).json({message: 'product not found'});
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
