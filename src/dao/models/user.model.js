import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  title: String,
  description: String,
});

export const userModel = mongoose.model(productos, userSchema);
