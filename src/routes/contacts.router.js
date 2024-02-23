import { Router } from "express";
import MemoryContacts from "../dao/memory/contacts.memory.js";
import MongoContacts from "../dao/mongo/contacts.mongo.js";

const contactRoutes = Router();
const contactService = new MemoryContacts(); // Here select model

contactRoutes.get("/", async (req, res) => {
  const result = await contactService.get();
  return result;
});

contactRoutes.post("/", async (req, res) => {
  const contact = req.body;
  const result = await contactService.post(contact);
  if (result) {
    return res.status(201).send({ message: "Contact created" });
  }
  res.status(400).send({ message: "Error creating Contact" });
});

contactRoutes.put("/:CId", async (req, res) => {
  const { CId } = req.params;
  const concat = req.body;
  const result = await contactService.put(CId, concat);
  if (result) {
    return res.send({ message: "Contact updated" });
  }
  res.status(400).send({ message: "Error updating Contact" });
});

contactRoutes.delete("/:CId", async (req, res) => {
  const { CId } = req.params;
  const result = await contactService.delete(CId);
  if (result) {
    return res.send({ message: "Contact deleted" });
  }
  res.status(400).send({ message: "Error deleting Contact" });
});

export default contactRoutes;
