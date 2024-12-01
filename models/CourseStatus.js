const mongoose = require('mongoose');

const CourseStatusSchema = new mongoose.Schema({
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    name: { type: String, required: true },
    courseName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CourseStatus', CourseStatusSchema);
