const mysql = require("mysql2");
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

  // Insert a expense into the database
  insertExpense(employeeId, date, amount, description, title) {
    const sql = "INSERT INTO expenses (employee_id, date, amount, description, title) VALUES (?, ?, ?, ?, ?)";
    const args = [employeeId, date, amount, description, title];
    return this.query(sql, args);
  }

  // Update a expense in the database
  updateExpense(expenseId, date, amount, description, title, status, feedback) {
    const sql = "UPDATE expenses SET date = ?, amount = ?, description = ?, title = ?, status = ?, feedback = ? WHERE expense_id = ?";
    const args = [date, amount, description, title, status, feedback, expenseId];
    return this.query(sql, args);
  }

  // Delete a expense from the database
  deleteExpense(expenseId) {
    const sql = "DELETE FROM expenses WHERE expense_id = ?";
    return this.query(sql, [expenseId]);
  }

  // Get all expenses of a specific employee
  getEmployeeExpenses(employeeId) {
    const sql = "SELECT * FROM expenses WHERE employee_id = ?";
    return this.query(sql, [employeeId]);
  }

  // Get all expenses awaiting approval
  getPendingExpenses() {
    const sql = "SELECT * FROM expenses WHERE status = 'PENDING'";
    return this.query(sql);
  }

  // Approve a expense
  approvExpense(expenseId) {
    const sql = "UPDATE expenses SET status = 'APPROVED' WHERE expense_id = ?";
    return this.query(sql, [expenseId]);
  }

  // Reject a expense
  rejectExpense(expenseId) {
    const sql = "UPDATE expenses SET status = 'REJECTED' WHERE expense_id = ?";
    return this.query(sql, [expenseId]);
  }
}

module.exports = ExpenseManager;
