const path = require("path");
const express = require("express");

function manifestRouteFactory(dirname) {
  return function manifestRoute(req, res) {
    return res.sendFile(path.resolve(dirname, "manifest.json"));
  };
}

function readmeRoute(req, res) {
  return res.redirect(
    `https://dashboard.hullapp.io/readme?url=https://${req.headers.host}`
  );
}

function staticRouter() {
  const applicationDirectory = path.dirname(
    path.join(require.main.filename, "..")
  );
  const router = express.Router();

  router.use(express.static(`${applicationDirectory}/dist`));
  router.use(express.static(`${applicationDirectory}/assets`));

  router.get("/manifest.json", manifestRouteFactory(applicationDirectory));
  router.get("/", readmeRoute);
  router.get("/readme", readmeRoute);

  return router;
}

module.exports = staticRouter;
