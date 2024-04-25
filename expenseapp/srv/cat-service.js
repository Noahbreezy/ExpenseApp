module.exports = (srv) => {

    // Reply mock data for Employees...
    srv.on('READ', 'Employees', () => [
      { employee_id: 1, employee_surname: 'Smith', employee_name: 'John', employee_iban: 'DE12345678901234567890', employee_rank: 1, employee_mail: 'john.smith@example.com', employee_password: 'password123' },
      { employee_id: 2, employee_surname: 'Doe', employee_name: 'Jane', employee_iban: 'DE09876543210987654321', employee_rank: 2, employee_mail: 'jane.doe@example.com', employee_password: 'securepassword' },
      { employee_id: 3, employee_surname: 'Brown', employee_name: 'Charlie', employee_iban: 'DE11223344556677889900', employee_rank: 3, employee_mail: 'charlie.brown@example.com', employee_password: 'mypassword' }
    ]);
  
    // Reply mock data for Expenses...
    srv.on('READ', 'Expenses', () => [
      { expense_id: 1, employee: 1, date: '2021-04-01', amount: 150.00, description: 'Business trip to Berlin', title: 'Berlin Trip', feedback: 'Approved', status: 'APPROVED', file1: 'berlin_trip_receipt.pdf', file2: 'berlin_trip_invoice.pdf', file3: 'berlin_trip_summary.pdf' },
      { expense_id: 2, employee: 2, date: '2021-04-15', amount: 450.00, description: 'Office equipment', title: 'Office Supplies', feedback: 'Pending approval', status: 'PENDING', file1: 'office_supplies_receipt.pdf', file2: 'office_supplies_invoice.pdf', file3: null },
      { expense_id: 3, employee: 3, date: '2021-05-10', amount: 200.00, description: 'Client entertainment expenses', title: 'Client Meeting', feedback: 'Needs more documentation', status: 'REJECTED', file1: 'client_meeting_receipt.pdf', file2: null, file3: null }
    ]);
  
  }
  