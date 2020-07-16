const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    office: String,
    age: Number,
    salary: Number,
    startingDate: String,
    email: String,
    phoneNumber: String,
})
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;