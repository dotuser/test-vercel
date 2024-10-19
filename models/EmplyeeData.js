const mongoose = require('mongoose');

const employeeDataSchema = new mongoose.Schema({
  salary: { type: Number, required: true },
  designation: { type: String, required: true, trim: true },
  joiningDate: { type: Date, required: true },
  createdBy: { type: String, required: true, trim: true },
  updatedBy: { type: String, trim: true }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('EmployeeData', employeeDataSchema);