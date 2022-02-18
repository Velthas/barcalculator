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

        const button = document.querySelector('button');
        button.addEventListener('click', displayData);

    }
    
    bindEventListeners();

})();