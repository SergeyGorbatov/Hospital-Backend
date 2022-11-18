const Appointment = require("../../models/appointment-model");
const {
  getAppointmentsService,
  createAppointmentService,
  editAppointment,
  deleteOneAppointment,
} = require("../service/appointment-service");

const getAppointments = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    const id = await getAppointmentsService(accessToken);
    const appointments = await Appointment.find({ userId: id });
    res.status(200).send(appointments);
  } catch (error) {
    next(error);
  }
};

const createAppointment = async (req, res, next) => {
  try {
    const { patient, doctor, date, complaint } = req.body;
    const { accessToken } = req.cookies;
    const appointment = await createAppointmentService(
      accessToken,
      patient,
      doctor,
      date,
      complaint
    );
    res.status(200).send(appointment);
  } catch (error) {
    next(error);
  }
};

const changeAppointment = async (req, res, next) => {
  try {
    const { patient, doctor, date, complaint } = req.body;
    const _id = req.params._id;
    const appointment = await editAppointment(
      patient,
      doctor,
      date,
      complaint,
      _id
    );
    res.status(200).send(appointment);
  } catch (error) {
    next(error);
  }
};

const deleteAppointment = async (req, res, next) => {
  try {
    const _id = req.params._id;
    const appointment = await deleteOneAppointment(_id);
    res.status(200).send(appointment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAppointments,
  createAppointment,
  changeAppointment,
  deleteAppointment,
};
