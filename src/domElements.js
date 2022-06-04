import x from './images/x.png';
import federico from './media/federico.mp3'

const domHandler = (function () {
  //Gets date from form
  function returnDate() {
    const inputDate = document.querySelector('#start');
    let dateString = inputDate.value;

    return dateString;
  }

  //Gets rooms occupied from form
  //UPDATE 26/05: THIS FUNCTION CAN NOW RETURN NUMBERS FROM MULTIPLE INPUTS
  function returnRoomsSold(roomType) {
    //Get the container to avoid querying the DOM repeatedly
    const roomPopContainer = document.querySelector('.container#room-field');

    //Based on the room type requested, return value of input
    switch (true) {
      case roomType === 'Classic':
        return roomPopContainer.querySelector('#classic-pop').value;
        break;
      case roomType === 'JST':
        return roomPopContainer.querySelector('#triple-pop').value;
        break;
      case roomType === 'JSQ':
        return roomPopContainer.querySelector('#quadruple-pop').value;
        break;
      case roomType === 'All':
        return Number(
          Number(roomPopContainer.querySelector('#quadruple-pop').value) +
            Number(roomPopContainer.querySelector('#triple-pop').value) +
            Number(roomPopContainer.querySelector('#classic-pop').value)
        );
    }
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
    switch (true) {
      case musButton.checked:
        return 0;
      case mButton.checked:
        return 1;
      case jstButton.checked:
        return 2;
      case jsqButton.checked:
        return 3;
      case suiteButton.checked:
        return 4;
    }
  }

  //Creates a new entry for the table
  function createNewTableRecord(
    typedata,
    bardata,
    seasondata,
    pricedata,
    dataData
  ) {
    //Get the body of the table
    const tableBody = document.querySelector('#info');

    //Create a new row and appends it to the body
    const newRow = tableBody.insertRow();

    //Add a button to delete entries
    const deleteCell = newRow.insertCell();
    const xIcon = new Image();
    xIcon.src = x;
    deleteCell.classList.add('delete');
    deleteCell.appendChild(xIcon);
    xIcon.addEventListener('click', () => {
      newRow.remove();
      updateTotal('.price', '#total', '#average');
      //20/03: THIS UPDATES TOTAL FOR LAST MINUTE AND EARLY BOOKING
      updateTotal('.ebprice', '#ebtotal', '#ebavg');
      updateTotal('.lmprice', '#lmtotal', '#lmavg');
    });

    //Create relevant cells and plug data in
    const dateCell = newRow.insertCell();
    dateCell.textContent = dataData;

    const roomType = newRow.insertCell();
    roomType.textContent = typedata;

    const bar = newRow.insertCell();
    bar.textContent = bardata;

    const season = newRow.insertCell();
    season.textContent = seasondata;

    //Add a class to 'mark' the price cells for retrieval.
    const price = newRow.insertCell();
    price.setAttribute('class', 'price');
    price.textContent = pricedata;

    addLastMinuteAndEarlyBooking(pricedata, newRow);
    //19/03 ADD CODE TO DISPLAY LAST MINUTE AND EARLY BOOKING FARES
  }

  function addLastMinuteAndEarlyBooking(price, row) {
    //Convert the string into a number again
    const numberPrice = Number(price.split('.')[0]);

    let EarlyBookingDiscount;
    let LastMinuteDiscount;

    //Calculate the discount amounts
    if (row.cells[2].textContent === 'JSQ') {
      EarlyBookingDiscount = (numberPrice - 30) * 0.15;
      LastMinuteDiscount = (numberPrice - 30) * 0.1;
    } else if (row.cells[2].textContent === 'JST') {
      EarlyBookingDiscount = (numberPrice - 15) * 0.15;
      LastMinuteDiscount = (numberPrice - 15) * 0.1;
    } else {
      EarlyBookingDiscount = numberPrice * 0.15;
      LastMinuteDiscount = numberPrice * 0.1;
    }

    //Get the prices for both packages
    let EarlyBookingPrice = (numberPrice - EarlyBookingDiscount).toFixed(2);
    let LastMinutePrice = (numberPrice - LastMinuteDiscount).toFixed(2);

    const EarlyBooking = row.insertCell();
    EarlyBooking.classList.add('ebprice');
    EarlyBooking.textContent = `${EarlyBookingPrice} EUR`;

    const lastMinute = row.insertCell();
    lastMinute.classList.add('lmprice');
    lastMinute.textContent = `${LastMinutePrice} EUR`;
  }

  //Each time a new cell is added, calculate the total by querying the dom for price cells
  //SINCE 20/03: to reuse with other columns it now takes as arguments the classes and ids of the cells
  //it wants to calculate the totals and average for
  function updateTotal(pricecells, totalcell, avgcell) {
    //Query the dom for the price cells, total and average
    const priceCells = document.querySelectorAll(pricecells);
    const totalCell = document.querySelector(totalcell);
    const averageCell = document.querySelector(avgcell);

    //The calculation is always re-done on new entry, so total must be reset each time.
    totalCell.textContent = '0.00 EUR';
    averageCell.textContent = '0.00 EUR';

    //For each node (cell) get the number and update the total
    priceCells.forEach((cell) => {
      //Slice into the total cell and the ones containing the rates
      let fare = Number(cell.textContent.split(' ')[0]);
      let total = Number(totalCell.textContent.split(' ')[0]);

      total = (total + fare).toFixed(2);
      let average = (total / priceCells.length).toFixed(2);

      //Slot everything in place
      if (priceCells.length === 0) averageCell.textContent = '0.00 EUR';
      else averageCell.textContent = average + ' EUR';

      totalCell.textContent = `${total} EUR`;
    });
  }

  //Order table records by date
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
    rows.forEach((node) => node.remove());
    sortedRows.forEach((node) => tbody.appendChild(node));
  }

  //Returns 1 if an error is detected, 0 if everything is fine.
  //Also appends error div on error. Maybe should split responsibilities for SRP?
  function checkForErrors() {
    const dateWidget = document.querySelector('#start');
    const roomsInput = document.querySelector('#classic-pop');
    const tripleRoomsInput = document.querySelector('#triple-pop');
    const quadrupleRoomsInput = document.querySelector('#quadruple-pop');

    if (dateWidget.value === '' && roomsInput.value === '') {
      createErrorDiv(
        'Per calcolare la tariffa bisogna specificare il numero di camere vendute e la data!'
      );
      return 1;
    } else if (
      isNaN(Number(roomsInput.value)) === NaN ||
      roomsInput.value > 25
    ) {
      createErrorDiv(
        "Il numero delle stanze deve essere inserito in formato numerico e non può eccedere le 25 unità (l'hotel ha solo 25 stanze)"
      );
      return 1;
    } else if (dateWidget.value === '') {
      createErrorDiv(
        'Non dimenticare di inserire la data per la quale calcolare la tariffa!'
      );
      return 1;
    } else if (roomsInput.value === '') {
      createErrorDiv(
        'Non dimenticare di inserire il numero di camere vendute per calcolare la BAR!'
      );
      return 1;
    } else if (quadrupleRoomsInput.value > 3 || tripleRoomsInput.value > 4) {
      createErrorDiv(
      'Il numero di camere elencate in uno degli slot è superiore a quelle dello stesso tipo presenti in hotel'
      );
      return 1; 
    } else if ( quadrupleRoomsInput.value < 0 || tripleRoomsInput.value < 0 || roomsInput.value < 0 ) {
      let weeWeeBoobert = new Audio(federico);
      weeWeeBoobert.play();
      createErrorDiv('Quindi per calcolare le bar devo andare dal CRM Guest In House?')
      return 1;
    }   else return 0;
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

  return {
    returnDate,
    returnRoomsSold,
    returnRoomType,
    createNewTableRecord,
    updateTotal,
    checkForErrors,
    deleteErrorDiv,
    orderByDate,
  };
})();

export default domHandler;
