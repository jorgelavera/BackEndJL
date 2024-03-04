import { Router } from "express";
import {
  addProduct,
  createBusiness,
  getBusinessById,
  getBusinesss,
} from "../controllers/business.controller.js";

const busainessRouter = Router();

busainessRouter.get("/", getBusinesss);
busainessRouter.get("/:bId", getBusinessById);
busainessRouter.post("/", createBusiness);
busainessRouter.post("/:bId/:productId", addProduct);

export default busainessRouter;
