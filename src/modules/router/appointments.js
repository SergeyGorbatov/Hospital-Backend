const Router = require("express").Router;
const createAppointmentValidator = require("../../middlewares/validationCreateAppointment");
const editAppointmentValidator = require("../../middlewares/validationEditAppointment");
const deleteAppointmentValidator = require("../../middlewares/validationDeleteAppointment")
const validationRequest = require("../../middlewares/validationRequest");
const {
  getAppointments,
  createAppointment,
  changeAppointment,
  deleteAppointment,
} = require("../controllers/appointments-controller");

const router = new Router();

router.get("/appointments", getAppointments);
router.post(
  "/appointments",
  createAppointmentValidator,
  validationRequest,
  createAppointment
);
router.patch(
  `/appointments/:_id`,
  editAppointmentValidator,
  validationRequest,
  changeAppointment
);
router.delete(
  '/appointments/:_id',
  deleteAppointmentValidator,
  validationRequest,
  deleteAppointment
);

module.exports = router;
