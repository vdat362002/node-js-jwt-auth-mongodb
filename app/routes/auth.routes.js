const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

const app = require("express").Router();

  app.use(function(req, res, next) {
    next();
  });

  app.post(
    "/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/auth/signin", controller.signin);



  module.exports = app;