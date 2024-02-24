const mongoose = require('mongoose');
const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:23000/employee_db', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        process.conn1 = mongoose.connection;
        console.log('employee_db successfully connected!');
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    connect: connect
};
