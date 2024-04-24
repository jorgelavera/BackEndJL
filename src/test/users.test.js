import mongoose from "mongoose";
import User from "../dao/managers/userManager.js";
import Assert from "assert";
import { MONGO_CONNECT_TEST } from "./configs/config.js";

const assert = Assert.strict;

mongoose.connect(MONGO_CONNECT_TEST);

describe("Testing de users", () => {
  before(function () {
    this.userDao = new User();
  });
});
