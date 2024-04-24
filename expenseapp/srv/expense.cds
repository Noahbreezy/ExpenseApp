using{expenseApp as my} from '../db/core';

service ExpenseService{
    // entity Expenses as projection on my.Expenses;
    entity Expenses as projection on my.Expenses;
}