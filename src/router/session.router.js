import express from "express";

export const routerSession = express.Router();

routerSession.get("/set-session", (req, res) => {
  if (req.session.cont) {
    req.session.cont++;
    res.send("visitas " + req.session.cont);
  } else {
    req.session.cont = 1;
    req.session.nombre = "tu vieja";
    req.session.isAdmin = true;
    res.send("visitas " + req.session.cont);
  }
});

routerSession.get("/", (req, res) => {
  res.send("cookies");
});

routerSession.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "logout ERROR", body: err });
    }
    res.send("logout success");
  });
});
