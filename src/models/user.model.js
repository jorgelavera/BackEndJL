import mongoose from "mongoose";

const userCollection = 'productos';

const userSchema = mongoose.Schema({
  title: String,
  description: String,
});

export const userModel = mongoose.model(userCollection, userSchema);
