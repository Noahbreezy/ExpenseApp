const cds = require('@sap/cds');
const { SELECT, INSERT, UPDATE, DELETE } = cds.ql;
const { Expenses, Employees } = cds.entities;

// Insert an expense into the database
const insertExpense = (employeeId, date, amount, description, title) => {
    return INSERT.into(Expenses).entries({
        employee_ID: employeeId,
        date: date,
        amount: amount,
        description: description,
        title: title
    });
};

// Update an expense in the database
const updateExpense = (expenseId, date, amount, description, title, status, feedback) => {
    return UPDATE(Expenses).set({
        date: date,
        amount: amount,
        description: description,
        title: title,
        status: status,
        feedback: feedback
    }).where({ expense_ID: expenseId });
};

// Delete an expense from the database
const deleteExpense = expenseId => {
    return DELETE.from(Expenses).where({ expense_ID: expenseId });
};

// Get all expenses of a specific employee
const getEmployeeExpenses = employeeId => {
    return SELECT.from(Expenses).where({ employee_ID: employeeId });
};

// Get all expenses awaiting approval
const getPendingExpenses = () => {
    return SELECT.from(Expenses).where({ status: 'PENDING' });
};

// Approve an expense
const approvExpense = expenseId => {
    return UPDATE(Expenses).set({ status: 'APPROVED' }).where({ expense_ID: expenseId });
};

// Reject an expense
const rejectExpense = expenseId => {
    return UPDATE(Expenses).set({ status: 'REJECTED' }).where({ expense_ID: expenseId });
};

// Check if a specific employee ID exists in a specific cost ID
const checkEmployeeInCost = (costId, employeeId) => {
    return SELECT.one(Expenses).columns(['1 as exist']).where({ expense_ID: costId, employee_ID: employeeId });
};

// Check if the row with the specific employee ID has an employee rank of 1
const checkEmployeeRank = employeeId => {
    return SELECT.one(Employees).columns(['1 as exist']).where({ employee_ID: employeeId, employee_rank: 1 });
};

module.exports = {
    insertExpense,
    updateExpense,
    deleteExpense,
    getEmployeeExpenses,
    getPendingExpenses,
    approvExpense,
    rejectExpense,
    checkEmployeeInCost,
    checkEmployeeRank
};
