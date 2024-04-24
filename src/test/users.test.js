import mongoose from "mongoose";
import User from "../dao/managers/userManager.js";
import Assert from "assert";
import { MONGO_CONNECT_TEST } from "../configs/config.js";

const assert = Assert.strict;

mongoose.connect(MONGO_CONNECT_TEST);

describe("Testing de users", () => {
  before(function () {
    this.userDao = new User();
  });

  beforeEach(function () {
    this.timeout(5000);
  });

  it("Get should return an array", async function () {
    const result = await this.userDao.get();
    assert.strictEqual(Array.isArray(result), true);
  });
});
