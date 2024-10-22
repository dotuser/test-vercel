const mongoose = require('mongoose');

const employeeDataSchema = new mongoose.Schema({
  code: { type: String },
  salary: { type: Number },
  designation: { type: String, trim: true },
  joiningDate: { type: Date },
  leavingDate: { type: Date, default: null },
  createdBy: { type: String, trim: true },
  updatedBy: { type: String, trim: true }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('EmployeeData', employeeDataSchema);