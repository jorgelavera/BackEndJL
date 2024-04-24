import dotenv from "dotenv";

dotenv.config();

export const PERSISTENCE = process.env.PERSISTENCE;
export const MONGO_CONNECT = process.env.MONGO_CONNECT;
export const SECRET = process.env.SECRET;
export const NODE_ENV = process.env.NODE_ENV;
export const MONGO_CONNECT_TEST = process.env.MONGO_CONNECT_TEST;
