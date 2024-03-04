import mongoose from "mongoose";

const businessCollection = "businesss";

const businessSchema = mongoose.Schema({
  name: String,
  products: [],
});

const businessModel = mongoose.model(businessCollection, businessSchema);
export default businessModel;
