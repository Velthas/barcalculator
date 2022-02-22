import x from './images/x.png'

const domHandler = function () {

    //Gets date from form
    function returnDate() {

        const inputDate = document.querySelector('#start');
        let dateString = inputDate.value;

        return dateString;

    }

    //Gets rooms occupied from form
    function returnRoomsSold() {

        const peopleField = document.querySelector('#hotelpop');
        const hotelPopulation = peopleField.value;

        return hotelPopulation;

    }

    //Gets the type of room the fare is for
    function returnRoomType() {
        //Get the div with the form to avoid caching the dom every time
        const radioForm = document.getElementById('rooms');

        //Get all of the radio buttons
        const musButton = radioForm.querySelector('#mus');
        const mButton = radioForm.querySelector('#m');
        const jstButton = radioForm.querySelector('#jst');
        const jsqButton = radioForm.querySelector('#jsq');
        const suiteButton = radioForm.querySelector('#suite');

        //Check which one is checked
        switch(true) {
            case (musButton.checked):
                return 0;
            case (mButton.checked):
                return 1;
            case (jstButton.checked):
                return 2;
            case (jsqButton.checked):
                return 3;
            case (suiteButton.checked):
                return 4;
        }

    }

    //Creates a new entry for the table
    function createNewTableRecord(typedata, bardata, seasondata, pricedata, dataData) {

        //Get the body of the table
        const tableBody = document.querySelector('#info')

        //Create a new row and appends it to the body
        const newRow = tableBody.insertRow();

        //Add a button to delete entries
        const deleteCell = newRow.insertCell();
        const xIcon = new Image();
        xIcon.src = x;
        deleteCell.classList.add('delete')
        deleteCell.appendChild(xIcon)
        xIcon.addEventListener('click', () => {
            newRow.remove();
            updateTotal();
        })

        //Create relevant cells and plug data in
        const dateCell = newRow.insertCell();
        dateCell.textContent = dataData;

        const roomType = newRow.insertCell();
        roomType.textContent = typedata;
        
        const bar = newRow.insertCell();
        bar.textContent = bardata;

        const season =  newRow.insertCell();
        season.textContent = seasondata;

        //Add a class to 'mark' the price cells for retrieval.
        const price = newRow.insertCell();
        price.setAttribute('class', 'price');
        price.textContent = pricedata;
    }

    //Each time a new cell is added, calculate the total by querying the dom for price cells
    function updateTotal() {

        //Query the dom for the price cells, total and average
        const priceCells = document.querySelectorAll('.price');
        const totalCell = document.querySelector('#total');
        const averageCell = document.querySelector('#average');

        //The calculation is always re-done on new entry, so total must be reset each time.
        totalCell.textContent = '0.00 EUR'
        totalCell.textContent = '0.00'


        //For each node (cell) get the number and update the total
        priceCells.forEach(cell => {

            //Slice into the total cell and the ones containing the rates
            let fare = Number(cell.textContent.split('.')[0]);
            let total = Number(totalCell.textContent.split('.')[0]);

            total += fare;
            let average = (total / priceCells.length).toFixed(2);

            //Slot everything in place
            if (priceCells.length === 0) averageCell.textContent = '0.00 EUR'
            else averageCell.textContent = average + " EUR";

            totalCell.textContent = `${total}.00 EUR`;
        });

    };

    function orderByDate() {

        //Get all the rows
        const tbody = document.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        //If there is not at least two records, just do nothing;
        if (rows.length < 2) return;

        //Extract each date from the appropriate cell and use it to create an array of ordered nodes
        const sortedRows = rows.sort(function compareDates(a, b) {
            if (new Date(a.cells[1].textContent) < new Date(b.cells[1].textContent)) {
                return -1;
            }
    
            if (new Date(a.cells[1].textContent) > new Date(b.cells[1].textContent)) {
                return 1;
            }   
            
            return 0;
        });

        //Delete the existing ones and append the ordered ones.
        //Total and average don't change
        rows.forEach(node => node.remove());
        sortedRows.forEach(node => tbody.appendChild(node));

    }

    //Returns 1 if an error is detected, 0 if everything is fine. 
    //Also appends error div on error. Maybe should split responsibilities for SRP?
    function checkForErrors() {

        const dateWidget = document.querySelector('#start');
        const roomsInput = document.querySelector('#hotelpop');

        if (dateWidget.value === '' && roomsInput.value === '') {
            createErrorDiv("Per calcolare la tariffa bisogna specificare il numero di camere vendute e la data!");
            return 1;
        }
        else if (isNaN(Number(roomsInput.value)) === NaN || roomsInput.value > 25) {
            createErrorDiv("Il numero delle stanze deve essere inserito in formato numerico e non può eccedere le 25 unità (l'hotel ha solo 25 stanze)")
            return 1;
        }
        else if (dateWidget.value === '') {
            createErrorDiv("Non dimenticare di inserire la data per la quale calcolare la tariffa!")
            return 1; 
        }
        else if (roomsInput.value === '') {
            createErrorDiv("Non dimenticare di inserire il numero di camere vendute per calcolare la BAR!")
            return 1;
        }
        else return 0;

    }

    //Creates an error div and appends it
    function createErrorDiv(message) {

        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error');

        const main = document.querySelector('#main');
        const table = main.querySelector('#table');


        errorDiv.textContent = message;
        main.insertBefore(errorDiv, table);

    }

    //Deletes the error div
    function deleteErrorDiv() {

        const errorDiv = document.querySelector('.error');

        if (errorDiv === null) return;
        else errorDiv.remove();

    }
    
    return {returnDate, returnRoomsSold, returnRoomType, createNewTableRecord, updateTotal, checkForErrors, deleteErrorDiv, orderByDate}

}();

export default domHandler;