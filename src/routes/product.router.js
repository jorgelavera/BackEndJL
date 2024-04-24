import { Router } from "express";
import MongoProducts from "../dao/mongo/products.mongo.js";

const productRoutes = Router();
const Productservice = new MongoProducts(); // Here select model

productRoutes.get("/", async (req, res) => {
  const result = await Productservice.get();
  res.send(result);
});

productRoutes.post("/", async (req, res) => {
  const Product = req.body;
  const result = await Productservice.post(Product);
  if (result) {
    return res.status(201).send({ message: "Product created" });
  }
  res.status(400).send({ message: "Error creating Product" });
});

productRoutes.put("/:CId", async (req, res) => {
  const { CId } = req.params;
  const concat = req.body;
  const result = await Productservice.put(CId, concat);
  if (result) {
    return res.send({ message: "Product updated" });
  }
  res.status(400).send({ message: "Error updating Product" });
});

productRoutes.delete("/:CId", async (req, res) => {
  const { CId } = req.params;
  const result = await Productservice.delete(CId);
  if (result) {
    return res.send({ message: "Product deleted" });
  }
  res.status(400).send({ message: "Error deleting Product" });
});

export default productRoutes;
