import mongoose from "mongoose";

const productsCollection = 'productos';

const productosSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: String,
  stock: Number
});

export const productosModel = mongoose.model(productsCollection, productosSchema);

