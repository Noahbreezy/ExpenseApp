using{expenseApp as my} from '../db/core';

service EmployeeService{
    entity Employees as projection on my.Employees;
}