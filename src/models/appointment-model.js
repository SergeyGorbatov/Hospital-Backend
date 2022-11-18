const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema({
  patient: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  complaint: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = model("Appointments", appointmentSchema);
