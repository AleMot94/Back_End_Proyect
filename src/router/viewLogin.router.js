import express from "express";
import { auth, authAdmin } from "../middlewares/auth.js";

export const routerViewLogin = express.Router();

routerViewLogin.get("/login", (req, res) => {
  return res.render("login", {});
});

routerViewLogin.get("/register", (req, res) => {
  return res.render("register", {});
});

routerViewLogin.get("/profile", auth, (req, res) => {
  return res.render("profile", {});
});

routerViewLogin.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.render("error-page", {
        msg: "error al querer cerrar session",
      });
    }
    res.send("logout success");
  });
  return res.redirect("/login");
});

routerViewLogin.get("/solo-admin", authAdmin, (req, res) => {
  res.render("admin", {});
});
