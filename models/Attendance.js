const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  email: { type: String, required: true },
  dob: { type: Date, required: true },
  name: { type: String, required: true },
  attendanceDetails: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
