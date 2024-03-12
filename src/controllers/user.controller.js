import UserManager from "../dao/managers/userManager.js";
import ErrorEnum from "../services/errors/error.enum.js";
import { generateUserErrorInfo } from "../services/errors/info.js";
import UserErrors from "../services/errors/userErrors.js";
const userService = new UserManager();

export const getUsers = async (req, res) => {
  const result = await userService.getUsers();
  if (!result) {
    return res.status(404).send({ message: "No user found" });
  }
  res.send({ status: "success", result });
};

export const getUserById = async (req, res) => {
  const { uId } = req.params;
  const result = await userService.getuserById(uId);
  if (!result) {
    return res.status(404).send({ message: "User not found" });
  }
  res.send({ status: "success", result });
};

export const saveUser = async (req, res) => {
  const user = req.body;
  if (!user.first_name || !user.last_name || !user.email || !user.age) {
    UserErrors.createError({
      name: "User creation failed",
      cause: generateUserErrorInfo(req.body),
      message: "Error trying to create a user",
      code: ErrorEnum.INVALID_TYPE_ERROR,
    });
  }
  if (user.length === 0) {
    user.id = 1;
  } else {
    user.id = user[user.length - 1].id + 1;
  }
  const result = await userService.saveUser(user);
  if (!result) {
    return res.status(400).send({ message: "Could not create user" });
  }
  res.status(201).send({ status: "success", result });
};

export const updateUser = async (req, res) => {
  const user = req.body;
  const { uId } = req.params;
  const result = await userService.updateUser(uId, user);
  if (!result) {
    return res.status(400).send({ message: "Could not update user" });
  }
  res.status(201).send({ status: "success", result });
};
