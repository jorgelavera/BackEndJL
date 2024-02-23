import dotenv from "dotenv";

dotenv.config();

export const PERSISTENCE = process.env.PERSISTENCE;
export const MONGO_CONNECT = process.env.MONGO_CONNECT;
export const SECRET = process.env.SECRET;
