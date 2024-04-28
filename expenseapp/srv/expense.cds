using{expenseApp as my} from '../db/core';
// using { Country, managed } from '@sap/cds/common';

service ExpenseService{
    entity Expenses @readonly as projection on my.Expenses;
    entity Employees @readonly as projection on my.Employees;

//     entity Employees {
//   key employee_id : Integer;
//   employee_surname : String(50);
//   employee_name : String(50);
//   employee_iban : String(34);
//   employee_rank : Integer;
//   employee_mail : String(100);
//   employee_password : String(100);
// }

// type ExpenseStatus : String enum {
//     DRAFT; PENDING; APPROVED; REJECTED;
// }

// entity Expenses : managed {
//   key expense_id : Integer;
//   employee : Association to Employees;
//   date : Date;
//   amount : Double;
//   description : String(1000);
//   title : String(100);
//   feedback : String(1000);
//   status : ExpenseStatus;
//   file1 : String(1000);
//   file2 : String(1000);
//   file3 : String(1000);
// }

}