const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    name: { type: String },
    position: { type: String },
    office: { type: String },
    salary: { type: Number }
});



var Company = mongoose.model('Company', {
    id: {type:Number},
    gmail: { type: String },
    personalNumber: { type: Number },
    name: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: String },
    category: { type: String },
    isactive: { type: Boolean },
});

module.exports = { Employee };
module.exports = { Company };