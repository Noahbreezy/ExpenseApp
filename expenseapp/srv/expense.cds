using{expenseApp as my} from '../db/core';

service ExpenseService{
    entity Employees as projection on my.Employees;
     entity Expenses as projection on my.Expenses;
     
}