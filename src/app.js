import { MONGO_CONNECT, SECRET, PERSISTENCE } from "./configs/config.js";
import express from "express";
import handlebars from "express-handlebars";
import passport from "passport";
import __dirname from "./utils.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import FileStore from "session-file-store";
import initializePassport from "./configs/passport.config.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUiExpress from "swagger-ui-express";

import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js";
import contactRoutes from "./routes/contacts.router.js";
import userRouter from "./routes/users.router.js";
import ordersRouter from "./routes/orders.router.js";
import busainessRouter from "./routes/business.router.js";
import { errorHandler } from "./middlewares/error.js";
import { addLogger } from "./middlewares/logger.js";
import { swaggerConfiguration } from "./configs/swagger.js";

const fileStore = FileStore(session);

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}...`);
});
const socketServer = new Server(httpServer);

const specs = swaggerJSDoc(swaggerConfiguration);
app.use("/apidocs", SwaggerUiExpress.serve, SwaggerUiExpress.setup(specs));

console.log("***********************************************");
console.log(`MODEL: ${PERSISTENCE}`);
console.log("***********************************************");

mongoose.connect(MONGO_CONNECT);
app.use(cookieParser());

const hbs = handlebars.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  },
});
app.engine("handlebars", hbs.engine);
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(cors());
app.use("/api/products/", productRouter);
app.use("/api/carts/", cartRouter);
app.use("/api/session/", sessionRouter);
app.use("/api/contacts", contactRoutes);
app.use("/", viewsRouter);
app.use("/api/users/", userRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/business", busainessRouter);
app.use(errorHandler);
app.use(addLogger);

app.use(
  session({
    secret: SECRET,
    store: MongoStore.create({
      mongoUrl: MONGO_CONNECT,
      ttl: 15,
    }),
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
  } else {
    req.session.counter = 1;
  }
  res.send(`page visited: ${req.session.counter} times`);
});

socketServer.on("connection", (socket) => {
  console.log("New socket client connected");
  socket.on("message", (data) => {
    console.log(data);
  });
});
