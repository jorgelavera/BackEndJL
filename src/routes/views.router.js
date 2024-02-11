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

viewsRouter.get('/restore-password', async (req, res) => {
  try {
      res.render("restore-password");
      } catch (error) {
      console.error(error);
      res.status(400).json({message: 'problem found'});
  }
});

viewsRouter.get('/fail-login', async (req, res) => {
  try {
      res.render("fail-login");
      } catch (error) {
      console.error(error);
      res.status(400).json({message: 'problem found'});
  }
});

viewsRouter.get('/user-ok', async (req, res) => {
  try {
      res.render("user-ok");
      } catch (error) {
      console.error(error);
      res.status(400).json({message: 'problem found'});
  }
});

viewsRouter.get('/user-register-failed', async (req, res) => {
  try {
    res.render("user-register-failed");
  } catch (error) {
  //    res.render("user-register-failed",error);
      //console.error(error);
      res.render("user-register-failed",error);
      //      res.status(400).json({message: 'problem found'});
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
      console.log('A1=>'+__dirname + "/data/products.json")
      let productos = new ProductManager(__dirname + "/data/products.json");
      let allProducts = await productos.getProducts();
      let stringAllProducts = JSON.stringify(allProducts,null,4)
      console.log('A2=>'+stringAllProducts);
      console.log('A2^^^^^^^^^^^^^^^^^^^^^^^^');
      res.render("realTimeProducts", {stringAllProducts} );
    } catch (error) {
      console.error(error);
    }
  }); 

export default viewsRouter;
