import mongoose from "mongoose";
import { saveUser, getUsers } from "../controllers/user.controller.js";
import Assert from "assert";
import { MONGO_CONNECT_TEST } from "../configs/config.js";

const assert = Assert.strict;

mongoose.connect(MONGO_CONNECT_TEST);

// Test de ruta GET - debe traer todos los usuarios
describe("Testing de Save users", () => {
  it("SaveUser should save a user", async function () {
    const result = await saveUser();
    done();
  });
});

describe("Testing de Get users", () => {
  it("Get should return an array", async function () {
    const result = await getUsers();
    assert.strictEqual(Array.isArray(result), true);
    done();
  });
});
