import { Router } from "express";
import { isValidPassword } from "../config/bcrypt.js";
import passport from "passport";


const sessionRoutes = Router();

sessionRoutes.post("/register", passport.authenticate('register', {failureRedirect: '/failregister'}), async (req, res) => {
  res.status(201).send({message: 'User registered'});
});

sessionRoutes.get('/failregister', (req, res) => {
  res.status(400).send({error: 'Register failed'});
});

sessionRoutes.get("/github", (req, res) => {});

sessionRoutes.post('/restore-password', async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(401).send({message: 'Unauthorized'});
    }
    user.password = createHash(password);
    await user.save();
    res.send({message: 'Password updated'});
  } catch (error) {
    console.error(error);
    res.status(400).send({error});
  }
});


sessionRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!isValsidPassword(user, password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session.user = user;
    res.redirect("/");
  } catch (error) {
    res.status(400).send({ error });
  }
});

sessionRoutes.post("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
    });
    res.send({ redirect: "http://localhost:8080/login" });
  } catch (error) {
    res.status(400).send({ error });
  }
});

export default sessionRoutes;
