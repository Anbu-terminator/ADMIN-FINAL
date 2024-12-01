const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    dob: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    courseName: { type: String, required: true },
});

module.exports = mongoose.model('Exam', examSchema);
