const cds = require('@sap/cds');
const dbOperations = require('./sql'); // Import your SQL handlers

module.exports = cds.service.impl(function() {
  const { Expenses } = this.entities;

//   this.before('CREATE', Expenses, async (req) => {
//     const { employeeId, date, amount, description, title } = req.data;
//     await dbOperations.insertExpense(employeeId, date, amount, description, title);
//   });

//   this.on('READ', Expenses, async (req) => {
//     return dbOperations.getEmployeeExpenses(req.params[0]);
//   });

  // this.before('READ', 'Expenses', async (req) => {
  //   const expenses = await SELECT.from(Expenses).where(req.query);
  //   for (const expense of expenses) {
  //     const employee = await SELECT.one(['employee_name']).from(Employees).where({ employee_id: expense.employee_employee_id });
  //     expense.employee_employee_id = employee ? employee.employee_name : null;
  //     console.log(expense)
  //     console.log("hello")

  //   }
  //   return expenses;
  // });

  // this.after('READ', 'Expenses', async (expenses) => {
  //   for (const expense of expenses) {
  //     if (expense.employee_employee_id) { // Ensure there's an ID to query on
  //       const employee = await SELECT.one(['employee_name'])
  //         .from(Employees)
  //         .where({ employee_id: expense.employee_employee_id });
  //       expense.employeeName = employee ? employee.employee_name : null; // Populate virtual field
  //     }
  //   }
  // });
  
  
  this.after('READ', 'Expenses', async (expenses, req) => {
    console.log("jhdfgksdhfkj")
    const nonDraftExpenses = expenses.filter(expense => expense.status !== 'DRAFT');
    req.results = nonDraftExpenses; // Set the filtered results to be returned
  });
  
  
  

 
  
});
