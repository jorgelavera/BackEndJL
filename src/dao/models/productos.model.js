import mongoose from "mongoose";

const productsCollection = "productos";

const productosSchema = mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: String,
  stock: Number,
});

export const productModel = mongoose.model(productsCollection, productosSchema);
