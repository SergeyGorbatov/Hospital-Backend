const Router = require("express").Router;
const validationAuthorization = require("../../middlewares/validationAuthorization");
const validationRegistration = require("../../middlewares/validationRegistration");
const validationRequest = require("../../middlewares/validationRequest");
const {
  registration,
  authorization,
  logout,
  refresh,
} = require("../controllers/user-controller");
const router = new Router();

router.post(
  "/registration",
  validationRegistration,
  validationRequest,
  registration
);
router.post(
  "/authorization",
  validationAuthorization,
  validationRequest,
  authorization
);
router.get("/logout", logout);
router.get("/refresh", refresh);

module.exports = router;
