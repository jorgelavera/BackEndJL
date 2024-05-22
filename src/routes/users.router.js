import { Router } from "express";
import {
  getUserById,
  getUsers,
  saveUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:uId", getUserById);
userRouter.post("/", saveUser);
userRouter.put("/:uId", updateUser);
userRouter.delete("/:uId", deleteUser);
export default userRouter;
