const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Models = require('./models/index');
const connection = require('./connection/connect');
const commonFunction = require('./commonFunction');
const cors = require('cors');
const { ObjectId } = require('mongoose').Types;


const app = express();
app.use(bodyParser.json({limit:'100mb'}));
app.use(cors());



app.post('/addEmployee', async (req, res) => {
    try {
        const { name, email, age, dateOfBirth, phone, photo, address } = req.body;
        const requiredValues = [email, name];
        if (commonFunction.checkBlank(requiredValues)) {
            res.status(422).json({ message: 'Parameter missing or parameter type is wrong' });
        }
        let employeeDetails = {
            email: email,
            name: name,
            age: age,
            dateOfBirth: dateOfBirth,
            address: address,
            phone: phone,
            photo: photo
        }

        const registerEmployeeDetails = await Models.EmployeeModel.create(employeeDetails);
        console.log('registerEmployeeDetails======>', registerEmployeeDetails);

        res.status(201).json({ message: 'Employee registered successfully', registerEmployeeDetails });
    } catch (error) {
       
        if(error.code == 11000){
            console.log('Error registering employee:', error);
            res.status(409).json({ message: 'Email arleady exist' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/getEmployee', async (req, res) => {
    try {
        const { userId } = req.body;
        const requiredValues = [userId];
        if (commonFunction.checkBlank(requiredValues)) {
            res.status(422).json({ message: 'Parameter missing or parameter type is wrong' });
        }
        const fetchEmployeeDetails = await Models.EmployeeModel.findOne({ _id: userId, isDeleted: false });
        if (!fetchEmployeeDetails) {
            res.status(401).json({ message: 'No Employee Found' });
            return;
        }
        res.status(201).json({ message: 'Employee Details Fetched Successfully', employeeDetails: fetchEmployeeDetails });
    } catch (error) {
        console.error('Error fetching details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/getAllEmployee', async (req, res) => {
    try {
        const fetchAllEmployeeDetails = await Models.EmployeeModel.find({isDeleted: false});
        if (!fetchAllEmployeeDetails) {
            res.status(401).json({ message: 'No Employee Found' });
            return;
        }
        res.status(201).json({ message: 'Employee Details Fetched Successfully', employeeDetails: fetchAllEmployeeDetails });
    } catch (error) {
        console.error('Error fetching details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/deleteEmployee/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const requiredValues = [userId];
        if (commonFunction.checkBlank(requiredValues)) {
            res.status(422).json({ message: 'Parameter missing or parameter type is wrong' });
        }
       
        const updateEmployeeDetails = await Models.EmployeeModel.findByIdAndDelete(userId);
        if (!updateEmployeeDetails) {
            res.status(401).json({ message: 'Operation failed' });
        }
        res.status(201).json({ message: 'Employee Deleted Successfully', employeeDetails: updateEmployeeDetails });
    } catch (error) {
        console.error('Error fetching details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/updateEmployee', async (req, res) => {
    try {
        const { userId } = req.body;
        const requiredValues = [userId];
        const updateData = req.body;
        if (commonFunction.checkBlank(requiredValues)) {
            res.status(422).json({ message: 'Parameter missing or parameter type is wrong' });
        }
       
        const updateEmployeeDetails = await Models.EmployeeModel.findByIdAndUpdate(userId, updateData , { new: true });
        if (!updateEmployeeDetails) {
            res.status(401).json({ message: 'Updated Employee Details' });
        }
        res.status(201).json({ message: 'Employee Updated Successfully', employeeDetails: updateEmployeeDetails });
    } catch (error) {
        console.error('Error fetching details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

async function startServer() {
    try {
        await connection.connect();
        await app.listen(3008);
        console.log(`Employee Management Service is running on http://localhost:3008`);
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}
startServer();