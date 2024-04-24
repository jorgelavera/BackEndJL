import mongoose from "mongoose";
import User from "../dao/managers/userManager.js";
import { expect } from "chai";
import { MONGO_CONNECT_TEST } from "../configs/config.js";

mongoose.connect(MONGO_CONNECT_TEST);

describe("Testing users with chai", () => {
  before(function () {
    this.userDao = new User();
  });

  beforeEach(function () {
    this.timeout(5000);
  });

  it("Get should return an array", async function () {
    const result = await this.userDao.get();
    expect(result).to.be.an("array");
  });
});
