const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const Employee = require("./Models/employeemodel")
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://hirdesh:hirdesh@cluster0.nlo5k.mongodb.net/EmployeeData?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Mongo Db connected !")
});
app.get("/", (req, res) => {
    res.render("home");
})
app.get("/employee/add", (req, res) => {
    res.render("form", { title: "Add Employee", router: "/employee/add" });
})
app.get("/employee/edit/:id", (req, res) => {
    res.render("form", { title: "Edit Employee", router: "/employee/edit/" + req.params.id });
})
app.post("/employee/edit/:id", (req, res) => {
    Employee.findByIdAndUpdate(req.params.id, { $set: req.body }, err => {
        console.log(err);
    })
    res.redirect("/employee/list")
})
app.post("/employee/add", (req, res) => {
    console.log(req.body)
    const newEmployee = new Employee(req.body);
    newEmployee.save(err => {
        console.log(err);
    })
    res.redirect("/employee/list")
})
app.get("/employee/delete/:id", (req, res) => {
    Employee.findByIdAndDelete(req.params.id, err => {
        console.log(err)
    });
    res.redirect("/employee/list")
})
app.get("/employee/list", (req, res) => {
    Employee.find({}, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            res.render("table", { tableData: docs });
        }
    })
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Express app started at port ${port}`);
})