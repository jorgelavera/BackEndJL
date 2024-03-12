import ErrorEnum from "../services/errors/error.enum.js";

export const errorHandler = (error, req, res, next) => {
  console.error(error.cause);
  switch (error.code) {
    case ErrorEnum.INVALID_TYPE_ERROR:
      return res.status(400).send({ error: error.name });
    default:
      return res.status(400).send({ error: "Unhandled error" });
  }
};
