import { Router } from "express";
import passport from "passport";
import userModel from "../dao/models/user.model.js";
import { createHash } from "../configs/bcrypt.js";

const sessionRoutes = Router();

sessionRoutes.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/user-register-failed",
  }),
  async (req, res) => {
    res.render("user-ok");
  }
);

sessionRoutes.get("/user-register-failed", (req, res) => {
  res.status(400).send({ error: "Register failed" });
});

sessionRoutes.get("/github", (req, res) => {});

sessionRoutes.post("/restore-password", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    user.password = createHash(password);
    await user.save();
    res.send({ message: "Password updated" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error });
  }
});

sessionRoutes.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/fail-login" }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };
    res.redirect("/");
  }
);

sessionRoutes.post("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/login");
});

export default sessionRoutes;
