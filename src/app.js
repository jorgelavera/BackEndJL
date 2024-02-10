import express from "express";
import handlebars from "express-handlebars";
import passport from 'passport';
import mongoose from "mongoose";
import MongoStore from 'connect-mongo';
import __dirname from "./utils.js";
import session from 'express-session';
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js";
import cookieParser from "cookie-parser";
import FileStore from "session-file-store";
import initializePassport from "./config/passport.config.js";
import { Server } from 'socket.io';
import { secret, mongoose_conn_str } from "./config/consts.js";

const fileStore = FileStore(session);

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}...`);
});
const socketServer = new Server(httpServer);

mongoose.connect(mongoose_conn_str)
app.use(cookieParser());

const hbs = handlebars.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true
  }
});
app.engine("handlebars", hbs.engine);
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/products/", productRouter);
app.use("/api/carts/", cartRouter);
app.use("/api/session/", sessionRouter);
app.use("/", viewsRouter);

app.use(session({
  secret: secret,
  store:MongoStore.create({
    mongoUrl: mongoose_conn_str,
    ttl:15,
  }),
  resave: true,
  saveUninitialized: true
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
  console.log("New socket client connected");
  socket.on("message", (data) => {
    console.log(data);
  });
});


