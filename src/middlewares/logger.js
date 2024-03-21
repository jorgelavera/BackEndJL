import winston from "winston";
import { NODE_ENV } from "../configs/config.js";

const devLogger = winston.createLogger({
  transports: [new winston.transports.Console({ level: "verbose" })],
});

const prodLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "http" }),
    new winston.transports.File({
      filename: "./prod-debug.log",
      level: "warn",
    }),
  ],
});

export const addLogger = (req, res, next) => {
  req.logger = NODE_ENV === "development" ? devLogger : prodLogger;
  req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  next();
};
