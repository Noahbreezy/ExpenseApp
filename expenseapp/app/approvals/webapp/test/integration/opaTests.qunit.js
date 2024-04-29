sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'expenseapp/approvals/test/integration/FirstJourney',
		'expenseapp/approvals/test/integration/pages/ExpensesList',
		'expenseapp/approvals/test/integration/pages/ExpensesObjectPage'
    ],
    function(JourneyRunner, opaJourney, ExpensesList, ExpensesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('expenseapp/approvals') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheExpensesList: ExpensesList,
					onTheExpensesObjectPage: ExpensesObjectPage
                }
            },
            opaJourney.run
        );
    }
);