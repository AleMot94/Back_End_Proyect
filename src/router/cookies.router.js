import express from "express";

export const routerCookies = express.Router();

routerCookies.get("/set-cookie", (req, res) => {
  res
    .cookie("nombre de la cookie", "el valor de la cookie", { maxAge: 1000000 })
    .cookie("nombre de la cookie 2", "el valor de la cookie 2", {
      maxAge: 1000000,
      signed: true,
    })
    .send("Cookie");
});

routerCookies.get("/", (req, res) => {
  console.log(req.cookies);
  console.log(req.signedCookies);
  res.send("console.log de la cookies en servidor");
});

routerCookies.get("/delete-cookie", (req, res) => {
  res.clearCookie("nombre de la cookie");
  res.clearCookie("nombre de la cookie 2").send("Cookie");
});
