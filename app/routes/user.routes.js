const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

const app = require("express").Router();

  app.use(function(req, res, next) {
    res.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600');
    res.setHeader('CDN-Cache-Control', 'max-age=60');
    res.setHeader('Cache-Control', 'max-age=10');
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
