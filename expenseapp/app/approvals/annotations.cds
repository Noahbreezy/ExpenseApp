using ExpenseService as service from '../../srv/expense';
annotate service.Expenses with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'expense_id',
            Value : expense_id,
        },
        {
            $Type : 'UI.DataField',
            Label : 'employee_employee_id',
            Value : employee_employee_id,
        },
        {
            $Type : 'UI.DataField',
            Label : 'date',
            Value : date,
        },
        {
            $Type : 'UI.DataField',
            Label : 'amount',
            Value : amount,
        },
        {
            $Type : 'UI.DataField',
            Label : 'description',
            Value : description,
        },
    ]
);

