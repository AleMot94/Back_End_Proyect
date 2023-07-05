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

routerViewLogin.get("/solo-admin", authAdmin, (req, res) => {
  res.render("admin", {});
});

routerViewLogin.get("/failregister", async (req, res) => {
  return res.render("failregister", {});
});
