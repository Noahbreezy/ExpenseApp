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
    res.json(req.file);
});

app.post('/user/insertCost', async (req, res) => {
    const { employeeId, date, amount, description, title } = req.body;
    try {
        await db.insertCost(employeeId, date, amount, description, title);
        res.status(201).send("Cost inserted successfully.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/user/getCost', async (req, res) => {
    //check of userId is owner or has role admin

    const { costId } = req.query;
    try {
        const result = await db.getEmployeeCosts(costId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/user/updateCost', async (req, res) => {
    //check of userId is owner or has role admin

    const { costId, date, amount, description, title, status, feedback } = req.body;
    try {
        await db.updateCost(costId, date, amount, description, title, status, feedback);
        res.send("Cost updated successfully.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/user/deleteCost', async (req, res) => {
  //check of userId is owner or has role admin
    const { costId } = req.query;
    try {
        await db.deleteCost(costId);
        res.send("Cost deleted successfully.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/admin/getEmployeeCost', async (req, res) => {
    //check of userId is owner 

    const { employeeId } = req.query;
    try {
        const result = await db.getEmployeeCosts(employeeId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/admin/getPendingCost', async (req, res) => {
    //check has role admin

    try {
        const result = await db.getPendingCosts();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/admin/approveCost', async (req, res) => {
    //check  has role admin

    const { costId } = req.body;
    try {
        await db.approveCost(costId);
        res.send("Cost approved successfully.");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/admin/rejectCost', async (req, res) => {
    //check has role admin

    const { costId } = req.body;
    try {
        await db.rejectCost(costId);
        res.send("Cost rejected successfully.");
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
        res.json(result);
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
