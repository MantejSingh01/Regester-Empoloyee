const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;


var EmployeeModel = new Schema({
    name: {
        type: String
    },
    age: {
        type: Number,
        default: null
    },
    email: { type: String, unique: true },
    dateOfBirth: { type: String, default: null },
    phone: {
        type: Number,
        default: null
    },
    photo: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

module.exports = mongoose.model('employee', EmployeeModel);