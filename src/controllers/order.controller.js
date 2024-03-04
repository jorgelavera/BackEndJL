import orderManager from "../dao/managers/orderManager.js";
import UserManager from "../dao/managers/userManager.js";
import businessManager from "../dao/managers/businessManager.js";
const orderService = new orderManager();
const userService = new UserManager();
const businessService = new businessManager();

export const getOrders = async (req, res) => {
  const result = await orderService.getOrders();
  if (!result) {
    return res.status(404).send({ message: "No order found" });
  }
  res.send({ status: "success", result });
};

export const getOrderById = async (req, res) => {
  const { oId } = req.params;
  const result = await orderService.getOrderById(oId);
  if (!result) {
    return res.status(404).send({ message: "order not found" });
  }
  res.send({ status: "success", result });
};

export const createOrder = async (req, res) => {
  const { userId, businessId, products } = req.body;
  const user = await userService.getUserById(userId);
  const business = await businessService.getBusinessById(businessId);
  const order = business?.products.filter((product) =>
    products.includes(product.id)
  );
  const totalPrice = order.reduce((acc, prev) => acc + prev.price, 0);
  const orderNumber = Date.now() + Math.floor(Math.random() * 100000 + 1);
  const finalOrder = {
    number: orderNumber,
    business: businessId,
    user: userId,
    status: "pending",
    products: order.map((product) => product.id),
    totalPrice,
  };
  const result = await orderService.createOrder(finalOrder);
  if (!result) {
    return res.status(400).send({ message: "Could not create order" });
  }
  user.orders.push(result._id);
  await userService.updateUser(userId, user);
  res.status(201).send({ status: "success", result });
};

export const resolveOrder = async (req, res) => {
  const { status } = req.query;
  const { oId } = req.params;
  const order = await orderService.getorderById(oId);
  order.status = status;
  const result = await orderService.resolveOrder(oId, order);
  if (!result) {
    return res.status(400).send({ message: "Could not resolve order" });
  }
  res.status(201).send({ status: "success", result });
};
