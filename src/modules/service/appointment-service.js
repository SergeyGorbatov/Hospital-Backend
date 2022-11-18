const AppointmentModel = require("../../models/appointment-model");
const { validateAccessToken } = require("./token-service");

const getAppointmentsService = (accessToken) => {
  const userId = validateAccessToken(accessToken);
  return userId.id;
};

const createAppointmentService = (
  accessToken,
  patient,
  doctor,
  date,
  complaint
) => {
  const userId = validateAccessToken(accessToken);
  const appointment = AppointmentModel.create({
    patient,
    doctor,
    date,
    complaint,
    userId: userId.id,
  });

  return appointment;
};

const editAppointment = (patient, doctor, date, complaint, _id) => {
  const appointment = AppointmentModel.findOneAndUpdate(
    { _id },
    { $set: { patient, doctor, date, complaint } },
    { new: true }
  );

  return appointment;
};

const deleteOneAppointment = (_id) => {
  const appointment = AppointmentModel.deleteOne({ _id });
  return appointment;
};

module.exports = {
  getAppointmentsService,
  createAppointmentService,
  editAppointment,
  deleteOneAppointment
};
