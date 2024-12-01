// models/Trainer.js
const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qualification: { type: String, required: true },
    dob: { type: Date, required: true },
    doj: { type: Date, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    address: { type: String, required: true },
    aadhar: { type: String, required: true, unique: true },
    pan: { type: String, required: true, unique: true },
    trainingCourse: { type: String, required: true },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    workLocation: { type: String, required: true },
    employeeId: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    salaryDetails: { type: String, required: true },
    providentFund: { type: String, required: true },
    preferredShift: { type: String },
    weeklyWorkHours: { type: String, required: true },
    languageProficiency: { type: String, required: true },
    emergencyContactName: { type: String, required: true },
    emergencyContactRelationship: { type: String, required: true },
    emergencyContactNumber: { type: String, required: true },
    emergencyContactEmail: { type: String },
    highestQualification: { type: String, required: true },
    relevantExperience: { type: String, required: true },
    previousEmployment: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
});

const Trainer = mongoose.model('Trainer', trainerSchema);
module.exports = Trainer;
