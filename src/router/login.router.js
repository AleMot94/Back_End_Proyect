import express from "express";
import passport from "passport";

export const routerLogin = express.Router();

// PASSPORT LOCAL
routerLogin.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    if (!req.user) {
      return res.json({ error: "something went wrong" });
    }
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      admin: req.user.admin,
    };

    //return res.json({ msg: "ok", payload: req.user });
    return res.redirect("/profile");

    // REGISTER SIN PASSPORT
    /*   try {
    const { firstName, lastName, password, email, age } = req.body;
    if (!firstName || !lastName || !password || !email || !age) {
      return res.status(400).render("error-page");
    }
    await UserModel.create({
      firstName,
      lastName,
      password: createHash(password),
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
  } */
  }
);

routerLogin.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    if (!req.user) {
      return res.json({ error: "invalid credentials" });
    }
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      admin: req.user.admin,
    };

    //return res.json({ msg: "ok", payload: req.user });
    return res.redirect("/vista/productos");
    // LOGIN SIN PASSPORT
    /* try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render("error-page", { msg: "faltan datos" });
    }
    const foundUser = await UserModel.findOne({ email });
    if (
      foundUser &&
      isValidPassword(
        password,
        foundUser.password
      )
    ) {
      req.session.firstName = foundUser.firstName;
      req.session.email = foundUser.email;
      req.session.admin = foundUser.admin;
      return res.redirect("/vista/productos");
    } else {
      return res
        .status(401)
        .render("error-page", { msg: "email o pass incorrectos" });
    }
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .render("error-page", { msg: "error inesperado en servidor" });
  } */
  }
);

// PASSPORT CON GITHUB
routerLogin.get(
  "/github",
  passport.authenticate("github", { scope: ["user.email"] })
);

routerLogin.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/vista/productos");
  }
);

routerLogin.get("/logout", (req, res) => {
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
