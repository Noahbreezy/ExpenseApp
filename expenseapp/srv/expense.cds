using{expenseApp as my} from '../db/core';

service ExpenseService{

    entity Expenses as projection on my.Expenses;
    entity Employees as projection on my.Employees;

}