import { SECRET, MONGO_CONNECT } from "./configs/config.js";
import mongoose from "mongoose";

export default class MongoSingleton {
  static #instance;
  constructor() {
    mongoose.connect(MONGO_CONNECT);
  }
  static getInstance() {
    if (this.#instance) {
      console.log("Instance already exists");
      return this.#instance;
    }
    this.#instance = new MongoSingleton();
    console.log("Connected to Mongo");
    return this.#instance;
  }
}
