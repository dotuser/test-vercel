const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  fatherName: { type: String, trim: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
    unique: true
  },
  mobileNo: {
    type: String,
    required: true,
    match: [/^\d{11}$/, 'Invalid mobile number'],
    unique: true
  },
  dob: { type: Date },
  linkedIn: { type: String, trim: true },
  gitHub: { type: String, trim: true },
  cv: { type: String, trim: true },
  expYears: { type: Number },
  prevJobs: { type: String, trim: true },
  expSalary: { type: Number },
  expJoining: { type: Date },
  onSite: { type: Boolean },
  position: { type: String, trim: true },
  skills: [{ type: String, trim: true }],
  portfolio: [{ type: String, trim: true }],
  refs: [{ type: String, trim: true }],
  questions: { type: String, trim: true }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('User', userSchema);