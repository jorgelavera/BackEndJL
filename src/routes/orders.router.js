import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
  resolveOrder,
} from "../controllers/order.controller.js";

const ordersRouter = Router();

ordersRouter.get("/", getOrders);

ordersRouter.get("/:oId", getOrderById);

ordersRouter.post("/", createOrder);

ordersRouter.put("/:oId", resolveOrder);

export default ordersRouter;
