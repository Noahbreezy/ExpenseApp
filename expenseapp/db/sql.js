const mysql = require('mysql2');
require('dotenv').config({path:''});

class ExpenseManager {
  constructor() {
    // Create a connection pool using environment variables
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectionLimit: 10
    });
  }

  // Standard code for making queries and returning output if needed
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  // Insert a cost into the database
  insertCost(employeeId, date, amount, description, title) {
    const sql = "INSERT INTO costs (employee_id, date, amount, description, title) VALUES (?, ?, ?, ?, ?)";
    const args = [employeeId, date, amount, description, title];
    return this.query(sql, args);
  }

  // Update a cost in the database
  updateCost(costId, date, amount, description, title, status, feedback) {
    const sql = "UPDATE costs SET date = ?, amount = ?, description = ?, title = ?, status = ?, feedback = ? WHERE cost_id = ?";
    const args = [date, amount, description, title, status, feedback, costId];
    return this.query(sql, args);
  }

  // Delete a cost from the database
  deleteCost(costId) {
    const sql = "DELETE FROM costs WHERE cost_id = ?";
    return this.query(sql, [costId]);
  }

  // Get all costs of a specific employee
  getEmployeeCosts(employeeId) {
    const sql = "SELECT * FROM costs WHERE employee_id = ?";
    return this.query(sql, [employeeId]);
  }

  // Get all costs awaiting approval
  getPendingCosts() {
    const sql = "SELECT * FROM costs WHERE status = 'PENDING'";
    return this.query(sql);
  }

  // Approve a cost
  approveCost(costId) {
    const sql = "UPDATE costs SET status = 'APPROVED' WHERE cost_id = ?";
    return this.query(sql, [costId]);
  }

  // Reject a cost
  rejectCost(costId) {
    const sql = "UPDATE costs SET status = 'REJECTED' WHERE cost_id = ?";
    return this.query(sql, [costId]);
  }

  checkEmployeeInCost(costId, employeeId) {
    const sql = "SELECT EXISTS (SELECT 1 FROM costs WHERE cost_id = ? AND employee_id = ?) AS exist";
    const args = [costId, employeeId];
    return this.query(sql, args).then(rows => rows[0].exist === 1);
  }

  checkEmployeeRank(employeeId) {
    const sql = "SELECT EXISTS (SELECT 1 FROM employees WHERE employee_id = ? AND employee_rank = 1) AS exist";
    const args = [employeeId];
    return this.query(sql, args).then(rows => rows[0].exist === 1);
  }
}

module.exports = ExpenseManager;