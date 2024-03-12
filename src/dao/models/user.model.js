import mongoose from "mongoose";

const userCollection = "users";

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: Number,
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  orders: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "orders",
    },
  ],
  id: Number,
});

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;
