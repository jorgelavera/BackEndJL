import businessManager from "../dao/managers/businessManager.js";

const businessService = new businessManager();

export const getBusinesss = async (req, res) => {
  const result = await businessService.getBusinesss();
  if (!result) {
    return res.status(404).send({ message: "No business found" });
  }
  res.send({ status: "success", result });
};

export const getBusinessById = async (req, res) => {
  const { bId } = req.params;
  const result = await businessService.getBusinessById(bId);
  if (!result) {
    return res.status(404).send({ message: "Business not found" });
  }
  res.send({ status: "success", result });
};

export const createBusiness = async (req, res) => {
  const business = req.body;
  const result = await businessService.saveBusiness(business);
  if (!result) {
    return res.status(400).send({ message: "Could not create business" });
  }
  res.status(201).send({ status: "success", result });
};

export const addProduct = async (req, res) => {
  const product = req.body;
  const { bId } = req.params;
  const business = await businessService.getBusinessById(bId);
  business.products.push(product);
  await businessService.updateBusiness(bId, business);
  res.send({ status: "success", result: "addProduct" });
};
