import './style.css';
import domHandler from './domElements';
import barCalculator from './bar';

const displayResults = (function () {
  function displayData() {
    //Remove the error div if it's there.
    domHandler.deleteErrorDiv();

    //Check if user forgot input, if so, abort
    let error = domHandler.checkForErrors();
    if (error === 1) return;

    // Check to see what room is selected
    let room = domHandler.returnRoomType();

    //We will store raw data about or table entry here
    let data;

    //Execute functions relevant to each room type
    switch (true) {
      case room === 0:
        data = barCalculator.calculateClassicsFare(0);
        break;
      case room === 1:
        data = barCalculator.calculateClassicsFare(1);
        break;
      case room === 2:
        data = barCalculator.calculateTripleFare();
        break;
      case room === 3:
        data = barCalculator.calculateQuadrupleFare();
        break;
      case room === 4:
        data = barCalculator.calculateSuiteFare();
        break;
    }

    // Take the data and make it palatable
    const humanisedData = barCalculator.makeItHuman(
      data.season,
      data.bar,
      data.room,
      data.rate,
      data.date
    );

    // Plug record into the board
    domHandler.createNewTableRecord(
      humanisedData.room,
      humanisedData.bar,
      humanisedData.season,
      humanisedData.fare,
      humanisedData.date
    );

    // Update the total cells
    domHandler.updateTotal('.price', '#total', '#average');

    // Do not calculate the early booking total for now
    //domHandler.updateTotal('.ebprice', '#ebtotal', '#ebavg');

    domHandler.updateTotal('.lmprice', '#lmtotal', '#lmavg');
  }

  function bindEventListeners() {
    //Button to display data
    const button = document.querySelector('#ratecalc');
    button.addEventListener('click', displayData);

    //Button to order fares
    const btn = document.querySelector('#dorder');
    btn.addEventListener('click', domHandler.orderByDate);
  }

  bindEventListeners();
})();
