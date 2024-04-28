sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'expenseapp/expenseapp/test/integration/FirstJourney',
		'expenseapp/expenseapp/test/integration/pages/ExpensesObjectPage'
    ],
    function(JourneyRunner, opaJourney, ExpensesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('expenseapp/expenseapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheExpensesObjectPage: ExpensesObjectPage
                }
            },
            opaJourney.run
        );
    }
);