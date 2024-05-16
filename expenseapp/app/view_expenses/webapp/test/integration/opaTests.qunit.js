sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'expenseapp/viewexpenses/test/integration/FirstJourney',
		'expenseapp/viewexpenses/test/integration/pages/ExpensesList',
		'expenseapp/viewexpenses/test/integration/pages/ExpensesObjectPage'
    ],
    function(JourneyRunner, opaJourney, ExpensesList, ExpensesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('expenseapp/viewexpenses') + '/index.html'
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