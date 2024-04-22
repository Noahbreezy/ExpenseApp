require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const morgan = require('morgan');
const ExpenseManager = require('../db/sql.js');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});
const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const db = new ExpenseManager();

app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json(req.file);
});

app.post('/user/insertExpense', async (req, res) => {
    const { employeeId, date, amount, description, title } = req.body;
    try {
        await db.insertExpense(employeeId, date, amount, description, title);
        res.status(201).send("Expense inserted successfully.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/user/getExpense', async (req, res) => {
    //check of userId is owner or has role admin

    const { expenseId } = req.query;
    try {
        const result = await db.getEmployeeExpenses(expenseId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/user/updateExpense', async (req, res) => {
    //check of userId is owner or has role admin

    const { expenseId, date, amount, description, title, status, feedback } = req.body;
    try {
        await db.updateExpense(expenseId, date, amount, description, title, status, feedback);
        res.status(200).send("Expense updated successfully.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/user/deleteExpense', async (req, res) => {
  //check of userId is owner or has role admin
    const { expenseId } = req.query;
    try {
        await db.deleteExpense(expenseId);
        res.status(200).send("Expense deleted successfully.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/admin/getEmployeeExpense', async (req, res) => {
    //check of userId is owner 

    const { employeeId } = req.query;
    try {
        const result = await db.getEmployeeExpenses(employeeId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/admin/getPendingExpense', async (req, res) => {
    //check has role admin

    try {
        const result = await db.getPendingExpenses();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/admin/approveExpense', async (req, res) => {
    //check  has role admin

    const { expenseId } = req.body;
    try {
        await db.approveExpense(expenseId);
        res.status(200).send("Expense approved successfully.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/admin/rejectExpense', async (req, res) => {
    //check has role admin

    const { expenseId } = req.body;
    try {
        await db.rejectExpense(expenseId);
        res.status(200).send("Expense rejected successfully.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/admin/getExpensesByPeriod', async (req, res) => {
    //check has role admin

    const { startDate, endDate } = req.query;
    try {
        // Assuming there's a method in ExpenseManager for this query
        const result = await db.getExpensesByPeriod(startDate, endDate);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 8000;
const httpsOptions = {
  key: fs.readFileSync('path/to/your/key.pem'),
  cert: fs.readFileSync('path/to/your/cert.pem')
};
https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`HTTPS server running on port ${PORT}`);
});
