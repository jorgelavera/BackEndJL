import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import  { Server } from 'socket.io';
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import mongoose from "mongoose";

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en localhost:${PORT}...`);
});

const socketServer = new Server(httpServer);

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect('mongodb+srv://jlavera:fH776wZXtYg!qey@ecommerce.umtjbu2.mongodb.net/')

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/products/", productRouter);
app.use("/api/carts/", cartRouter);
app.use("/", viewsRouter);

socketServer.on("connection", (socket) => {
  console.log("nuevo socket cliente conectado");
  socket.on("message", (data) => {
    console.log(data);
  });
});


