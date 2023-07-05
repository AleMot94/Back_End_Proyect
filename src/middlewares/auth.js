export function auth(req, res, next) {
  if (req.session.user?.email) {
    return next();
  } else {
    return res
      .status(401)
      .render("error-page", { msg: "es necesario estar logeado" });
  }
}

export function authAdmin(req, res, next) {
  if (req.session.user.email && req.session.user.admin == true) {
    return next();
  }
  return res.status(403).render("error-page", { msg: "solo para admin" });
}

//  CLAVE LOGIN GITHUB
//  7f1e06e6c9e48e0c173e893ea092ecba0d250af5
