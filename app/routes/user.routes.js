const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

const app = require("express").Router();

  app.use(function(req, res, next) {
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    next();
  });

  app.get("/test/all", controller.allAccess);

  app.get("/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  module.exports = app;
