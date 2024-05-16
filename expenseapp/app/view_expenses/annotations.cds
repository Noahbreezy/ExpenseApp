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
            Label : 'Owner',
            Value : employee.employee_name,  // Assuming 'employee' is the navigation property and 'employee_name' is the field
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
        {
            $Type : 'UI.DataField',
            Label : 'Status',
            Value : status,
            Criticality : status,
            CriticalityRepresentation : #WithIcon,
            ![@UI.Importance] : #High,
        },
    ]
);

