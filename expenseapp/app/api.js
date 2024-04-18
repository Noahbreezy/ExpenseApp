require('dotenv').config({ path: '' });
const express = require('express');
const https = require('https');
const fs = require('fs');
const morgan = require('morgan');
const ExpenseManager = require('../db/sql.js')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
const upload = multer({ storage })

// Importing the necessary packages and modules.

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const db = new ExpenseManager()

app.post('/api/upload', upload.single('file'), (req, res) => {
    res.json(req.file)
})

app.post('/user/insertCost', async (req, res) => {
    // Endpoint for adding a cost to the database
})

app.get('/user/getCost', async (req, res) => {
    // Endpoint for getting a specific cost from the database
})

app.patch('/user/updateCost', async (req, res) => {
    // Endpoint for updating a cost in the database
})

app.delete('/user/deleteCost', async (req, res) => {
    // Endpoint for deleting a cost from the database
})

app. get('/admin/totalCost', async (req, res) => {
    // Endpoint for getting total ever cost
})

app.get('/admin/getEmployeeCost', async (req, res) => {
    // Endpoint for getting all costs of an employee
})

app.get('/admin/getPendingCost', async (req, res) => {
    // Endpoint for getting all pending costs
})

app.patch('/admin/approveCost', async (req, res) => {
    // Endpoint for approving a specific cost
})

app.patch('/admin/rejectCost', async (req, res) => {
    // Endpoint for rejecting a specific cost
})

app.get('/admin/getExpensesByPeriod', async (req, res) => {
    // Endpoint for getting expenses over a period
    const { startDate, endDate} = req.body;
})

const PORT = process.env.PORT || 8000;
https.createServer(app).listen(PORT, () => {
    console.log(`HTTPS server running on port ${PORT}`);
});
