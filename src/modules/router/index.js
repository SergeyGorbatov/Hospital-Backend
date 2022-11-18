const Router = require("express").Router;
const routerUser = require("./users");
const routerAppointments = require("./appointments");

const router = new Router();

router.use("/", routerUser);
router.use("/", routerAppointments);

module.exports = router;
