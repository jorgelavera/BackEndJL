import express from "express";
import handlebars from "express-handlebars";
import passport from 'passport';
import __dirname from "./utils.js";
import  { Server } from 'socket.io';
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from 'express-session';
import FileStore from "session-file-store";
import MongoStore from 'connect-mongo';
import initializePassport from "./config/passport.config.js";

const fileStore = FileStore(session);

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en localhost:${PORT}...`);
});

const socketServer = new Server(httpServer);

mongoose.connect('mongodb+srv://jlavera:fH776wZXtYg!qey@ecommerce.umtjbu2.mongodb.net/')
app.use(cookieParser());
//app.use(session({
//  secret: 'añamenguí',
//  store: new fileStore({path: './sessions', ttl: 60, retries: 0}),
//  resave: true,
//  saveUninitialized: true
//}));

const hbs = handlebars.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true
  }
});

app.engine("handlebars", hbs);
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/products/", productRouter);
app.use("/api/carts/", cartRouter);
app.use("/api/session/", sessionRouter);
app.use("/", viewsRouter);

app.use(session({
  store:MongoStore.create({
    mongoUrl:'mongodb+srv://jlavera:fH776wZXtYg!qey@ecommerce.umtjbu2.mongodb.net/',
    ttl:15,
  }),
  secret:'añamagtt',
  resave:false,
  saveUninitialized:false
}))

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) => {
  if(req.session.counter) {
    req.session.counter++;
  } else {
    req.session.counter = 1;
  }
  res.send(`page visited: ${req.session.counter} times`)
});

socketServer.on("connection", (socket) => {
  console.log("nuevo socket cliente conectado");
  socket.on("message", (data) => {
    console.log(data);
  });
});


