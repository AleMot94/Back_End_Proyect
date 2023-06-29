import express from "express";
import { UserModel } from "../DAO/models/user.model.js";

export const routerLogin = express.Router();

routerLogin.post("/register", async (req, res) => {
  const { firstName, lastName, password, email, age } = req.body;
  if (!firstName || !lastName || !password || !email || !age) {
    return res.status(400).render("error-page");
  }
  try {
    await UserModel.create({
      firstName,
      lastName,
      password,
      email,
      age,
      admin: false,
    });
    req.session.firstName = firstName;
    req.session.email = email;
    req.session.admin = false;
    return res.redirect("/profile");
  } catch (error) {
    console.log(error);
    return res.status(400).render("error-page", { msg: "mail ya existente" });
  }
});

routerLogin.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).render("error-page", { msg: "faltan datos" });
  }
  try {
    const foundUser = await UserModel.findOne({ email });
    if (foundUser && foundUser.password === password) {
      req.session.firstName = foundUser.firstName;
      req.session.email = foundUser.email;
      req.session.admin = foundUser.admin;
      return res.redirect("/vista/productos");
    } else {
      return res
        .status(400)
        .render("error-page", { msg: "email o pass incorrectos" });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .render("error-page", { msg: "error inesperado en servidor" });
  }
});

/* routerLogin.get("/perfil", auth, (req, res) => {
  res.render("perfil");
}); */
