import './style.css'
import domHandler from './domElements';
import barCalculator from './bar';

const displayResults = (function () {

    function displayData () {

        //Remove the error div if it's there.
        domHandler.deleteErrorDiv();

        //Check if user forgot input, if so, abort
        let error = domHandler.checkForErrors();
        if (error === 1) return;

        //Extract all the data from the form
        const data = barCalculator.elaborateDayFare();

        //Plug record into the board
        domHandler.createNewTableRecord(data.room, data.bar, data.season, data.fare, data.date);
        domHandler.updateTotal();

    }

    function bindEventListeners() {

        //Button to display data
        const button = document.querySelector('#ratecalc');
        button.addEventListener('click', displayData);

        const btn = document.querySelector('#dorder');
        btn.addEventListener('click', domHandler.orderByDate);

    }
    
    bindEventListeners();

})();