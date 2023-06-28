import express from "express";

export const routerSession = express.Router();
// http://localhost:8080/session/login?username=pepe&password=pepepass
routerSession.get("/set-session", (req, res) => {
  if (req.session.cont) {
    req.session.cont++;
    res.send("visitas " + req.session.cont);
  } else {
    req.session.cont = 1;
    res.send("visitas " + req.session.cont);
  }
});

routerSession.get("/", (req, res) => {
  console.log("ID session : " + req.sessionID);
  console.log(req.session);
  res.send("datos de la session en consola del servidor");
});

routerSession.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "logout ERROR", body: err });
    }
    res.send("logout success");
  });
});

routerSession.get("/login", (req, res) => {
  const { username, password } = req.query;
  if (username !== "pepe" || password !== "pepepass") {
    return res.send("login failed");
  }
  req.session.user = username;
  req.session.admin = false;
  res.send("login success");
});

function auth(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    return res.status(401).send("no estas logeado");
  }
}

routerSession.get("/perfil", auth, (req, res) => {
  console.log(req.session);
  res.send("datos del perfil  en consola del servidor");
});
