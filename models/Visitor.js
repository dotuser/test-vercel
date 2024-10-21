
const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    fatherName: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, match: /.+\@.+\..+/ },
    mobileNo: { type: String, required: true, match: /^\d{11}$/ },
    dob: { type: Date, required: true },
    linkedIn: { type: String, trim: true },
    gitHub: { type: String, trim: true },
    cv: { type: Buffer, contentType: String }, // Store CV as binary buffer
    yearsOfExperience: { type: Number, required: true },
    previousJobs: { type: String, trim: true },
    expectedSalary: { type: Number, required: true },
    availableToStartOn: { type: Date, required: true },
    onSiteAwareness: { type: Boolean, required: true },
    positionAppliedFor: { type: String, required: true, trim: true },
    skillsAndTechnologies: [{ type: String, trim: true }],
    portfolioLinks: [{ type: String, trim: true }],
    references: [{ type: String, trim: true }],
    questionsForUs: { type: String, trim: true }
});

module.exports = mongoose.model('Visitor', visitorSchema);

// const mongoose = require('mongoose');

// const visitorSchema = new mongoose.Schema({
//     fullName: { type: String, required: true },
//     fatherName: { type: String },
//     email: { type: String, required: true, lowercase: true, match: /.+\@.+\..+/ },
//     mobileNo: { type: String, required: true, match: /^\d{11}$/ },
//     dob: { type: Date },
//     linkedIn: { type: String },
//     gitHub: { type: String },
//     cv: { type: Buffer, contentType: String },
//     expYears: { type: Number },
//     prevJobs: { type: String },
//     expSalary: { type: Number },
//     expJoining: { type: Date },
//     onSite: { type: Boolean },
//     position: { type: String },
//     skills: [{ type: String }],
//     portfolio: [{ type: String }],
//     refs: [{ type: String }],
//     questions: { type: String }
// }, { timestamps: true });

// visitorSchema.pre('save', function (next) {
//     Object.keys(this.toObject()).forEach((key) => {
//         if (typeof this[key] === 'string') {
//             this[key] = this[key].trim();
//         }
//     });
//     next();
// });

// module.exports = mongoose.model('Visitor', visitorSchema);
