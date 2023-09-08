const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

const app = require("express").Router();

  app.use(function(req, res, next) {
    res.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600');
    res.setHeader('CDN-Cache-Control', 'max-age=60');
    res.setHeader('Cache-Control', 'max-age=10');
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