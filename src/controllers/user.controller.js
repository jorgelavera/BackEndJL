import UserManager from "../dao/managers/userManager.js";
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
