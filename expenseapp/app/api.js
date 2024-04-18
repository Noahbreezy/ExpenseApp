require('dotenv').config({ path: '' });
const express = require('express');
const https = require('https');
const fs = require('fs');
const morgan = require('morgan');
const ExpenseManager = require('../db/sql')
// Importing the necessary packages and modules.

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const db = new ExpenseManager()

app.post('/user/insertCost', async (req, res) => {
    // Endpoint for adding a expense to the database
})

app.get('/user/getCost', async (req, res) => {
    // Endpoint for getting a specific expense from the database
})

app.update('/user/updateCost', async (req, res) => {
    // Endpoint for updating a expense in the database
})

app.delete('/user/deleteCost', async (req, res) => {
    // Endpoint for deleting a expense from the database
})

app. get('/admin/totalCost', async (req, res) => {
    // Endpoint for getting total ever expense
})

app.get('/admin/getEmployeeCost', async (req, res) => {
    // Endpoint for getting all expenses of an employee
})

app.get('/admin/getPendingCost', async (req, res) => {
    // Endpoint for getting all pending expenses
})

app.update('/admin/approveCost', async (req, res) => {
    // Endpoint for approving a specific expense
})

app.update('/admin/rejectCost', async (req, res) => {
    // Endpoint for rejecting a specific expense
})

app.get('/admin/getExpensesByPeriod', async (req, res) => {
    // Endpoint for getting expenses over a period
    const { startDate, endDate} = req.body;
})

const PORT = process.env.PORT || 3000;
https.createServer(app).listen(PORT, () => {
    console.log(`HTTPS server running on port ${PORT}`);
});
