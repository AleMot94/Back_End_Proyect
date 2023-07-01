export function auth(req, res, next) {
  if (req.session.email) {
    return next();
  } else {
    return res
      .status(401)
      .render("error-page", { msg: "es necesario estar logeado" });
  }
}

export function authAdmin(req, res, next) {
  if (req.session.email && req.session.admin == true) {
    return next();
  }
  return res.status(403).render("error-page", { msg: "solo para admin" });
}
