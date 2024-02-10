import { Router } from "express";
import { isValidPassword } from "../config/bcrypt.js";
import passport from "passport";

const sessionRoutes = Router();

sessionRoutes.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    res.status(201).send({ message: "User registered" });
  }
);

sessionRoutes.get("/failregister", (req, res) => {
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

sessionRoutes.post("/login", passport.authenticate("login", { failureRedirect: "/fail-login" }), (req, res) => {
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
    res.redirect('/login');
});

export default sessionRoutes;
