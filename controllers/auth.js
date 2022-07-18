const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      console.log("user: " + user.name);
      req.session.isLoggedIn = true;
      console.log(
        "colocando req.session.isLoggedIn como: " + req.session.isLoggedIn
      );
      req.session.user = user;
      res.redirect("/nfts");
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
