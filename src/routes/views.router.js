import { Router } from "express";
import ProductManager from "../dao/managers/productManager.js";
import __dirname from "../utils.js";
import  { checkAuth } from "../middlewares/authentication.middleware.js";

//const router = express.Router();
const viewsRouter = Router();
const product = new ProductManager;

viewsRouter.get('/login', async (req, res) => {
  try {
      res.render("login");
      } catch (error) {
      console.error(error);
      res.status(400).json({message: 'problem found'});
  }
});

viewsRouter.get('/register', async (req, res) => {
  try {
      res.render("register");
      } catch (error) {
      console.error(error);
      res.status(400).json({message: 'problem found'});
  }
});

viewsRouter.get('/', checkAuth, async (req, res) => {
  try {
      const user = req.session.user;
      res.render("index", user);
      } catch (error) {
      console.error(error);
      res.status(400).json({message: 'problem found'});
  }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
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

export default viewsRouter;
