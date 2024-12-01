const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    email: { type: String, required: true },
    weeklyAssessment: { type: Number, required: true, max: 10 },
    monthlyAssessment: { type: Number, required: true, max: 10 },
    practicalExam: { type: Number, required: true, max: 30 },
    finalExam: { type: Number, required: true, max: 50 },
    totalMarks: { type: Number, required: true },
    grade: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Progress', ProgressSchema);
