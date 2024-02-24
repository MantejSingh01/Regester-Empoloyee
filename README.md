# Employee Management System

## Introduction
This project is a sample Employee Management System built using Node.js, Express.js, MongoDB/PostgreSQL, and React. It provides APIs to perform CRUD (Create, Read, Update, Delete) operations on an Employee collection in the database. Additionally, it includes a React-based front end to interact with the APIs and manage employees.

## Prerequisites
- Node.js installed on your machine
- MongoDB database set up and running
- React knowledge for understanding and modifying the front end
- Basic understanding of RESTful APIs

## Project Structure

### backend
- `index.js`: Main file containing the Express server setup and API endpoints.
- `models/index.js`: Contains the Mongoose schema for the Employee model.
- `connection/connect.js`: Handles database connection.
- `commonFunction.js`: Utility functions used across the application.

### Frontend
- `App.js`: Main file containing the react app starting point.
- `./components`: This contains the components Employee list and modal.
- `./constants`: contains the constants information.
- `context.js`: Creates a context API at the Global level and handling states.

## Dependencies
### Backend
- `body-parser`: Middleware to parse incoming request bodies.
- `cors`: Middleware for enabling Cross-Origin Resource Sharing.
- `express`: Web framework for Node.js.
- `mongoose`: MongoDB object modeling tool designed to work in an asynchronous environment.

### Frontend
- `axios`: It is used for calling HTTP APIs.
- `react`: Frontend Library used to build UI.
- `react-dom`: Frontend library used to manage routes.

## API Endpoints
- `POST /addEmployee`: Add a new employee to the database.
- `GET /getEmployee`: Retrieve details of a specific employee by ID.
- `GET /getAllEmployee`: Retrieve details of all active employees.
- `PUT /deleteEmployee/:userId`: Soft delete an employee by marking them as inactive.
- `POST /updateEmployee`: Update details of an existing employee.

## Frontend
The frontend is built using React hooks and Context API. It provides the following features:
- Displaying a list of all employees.
- Adding a new employee via a form.
- Deleting an employee.
- Editing an employee's details.

## Installation
### Backend
1. Navigate to the project directory.
2. Run `npm install` to install dependencies. Node version should be v18.17.1.
3. Start the server by running `npm start`.
4. The server will be running at `http://localhost:3008`.

### Frontend
1. Navigate to the project directory.
2. Run `npm install` to install dependencies. Node version should be v18.17.1.
3. Start the server by running `npm start`.
4. The server will be running at `http://localhost:3000`.

## Usage
1. Access the frontend by visiting `http://localhost:3000` in your browser.
2. Use the provided interface to add, edit, or delete employees.
3. Interact with the APIs directly for more advanced operations.

---
Developed with ❤️ by Mantej Singh
