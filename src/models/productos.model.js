import mongoose from "mongoose";

const productosCollection = 'productos';

const productosSchema = mongoose.Schema({
  title: String,
  description: String,
});
//{"id": 10,"title": "producto de prueba 10","description": "Este es 2 producto prueba","price": 2.5,"thumbnail": "empty3.jpg","code": "2","stock": 1

export const productosModel = mongoose.model(productosCollection, productosSchema);
