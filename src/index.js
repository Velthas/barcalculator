import './style.css'

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

        const tableBody = document.querySelector('#info')

        const newRow = tableBody.insertRow();

        const dateCell = newRow.insertCell();
        dateCell.textContent = dataData;

        const roomType = newRow.insertCell();
        roomType.textContent = typedata;
        
        const bar = newRow.insertCell();
        bar.textContent = bardata;

        const season =  newRow.insertCell();
        season.textContent = seasondata;

        const price = newRow.insertCell();
        price.setAttribute('class', 'price');
        price.textContent = pricedata;
    }

    function updateTotal() {

        const priceCells = document.querySelectorAll('.price');
        const totalCell = document.querySelector('#total')
        totalCell.textContent = '0.00 EUR'

        priceCells.forEach(cell => {
            //Slice into the total cell and the all the ones containing the fares
            let fare = Number(cell.textContent.split('.')[0]);
            let total = Number(totalCell.textContent.split('.')[0]);

            total += fare;
            totalCell.textContent = `${total}.00 EUR`;
        });

        


    };

    function checkForErrors() {

        const dateWidget = document.querySelector('#start');
        const roomsInput = document.querySelector('#hotelpop');

        if (dateWidget.value === '' && roomsInput.value === '') {
            createErrorDiv("Per calcolare la tariffa bisogna specificare il numero di camere vendute e la data!");
            return 1;
        }
        else if (isNaN(Number(roomsInput.value)) || roomsInput.value > 25) {
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

    function createErrorDiv(message) {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error');

        const main = document.querySelector('#main');
        const table = main.querySelector('#table');


        errorDiv.textContent = message;
        main.insertBefore(errorDiv, table);
    }

    function deleteErrorDiv() {
        const errorDiv = document.querySelector('.error');

        if (errorDiv === null) return;
        else errorDiv.remove();

    }
    

    return {returnDate, returnRoomsSold, returnRoomType, createNewTableRecord, updateTotal, checkForErrors, deleteErrorDiv}

}();

const prices2021 = function () {
    
    //Legenda Array: MUS, MATRIMONIALE, JST, JSQ, SUITE
    //Gli array partono da BAR 6 (indice 0) e arrivano a RACK (indice 6)
    const lowSeason = [
        [73, 88, 120, 140, 210],
        [76, 93, 130, 150, 220],
        [80, 96, 130, 150, 230],
        [85, 105, 145, 165, 240],
        [90, 115, 145, 165, 270],
        [95, 125, 160, 180, 300],
        [105, 140, 160, 180, 340],
    ]
    const middleSeason = [       
        [77, 93, 125, 145, 230],
        [80, 96, 135, 155, 240],
        [83, 105, 135, 155, 250],
        [86, 110, 155, 175, 270],
        [98, 120, 155, 175, 300],
        [105, 130, 175, 195, 320],
        [115, 155, 175, 195, 370],
    ]
    const midHighSeason = [
        [82, 100, 127, 147, 240],
        [87, 105, 135, 160, 250],
        [93, 110, 135, 160, 260],
        [98, 115, 160, 180, 280],
        [105, 125, 160, 180, 310],
        [110, 135, 185, 205, 340],
        [120, 165, 185, 205, 390],
    ]
    const highSeason = [
        [92, 107, 130, 150, 260],
        [95, 115, 140, 165, 270],
        [100, 120, 140, 165, 280],
        [105, 135, 175, 195, 300],
        [115, 145, 175, 195, 340],
        [120, 155, 200, 220, 370],
        [130, 175, 200, 220, 410],
    ]
    const peakSeason = [
        [100, 135, 155, 175, 310],
        [105, 140, 170, 190, 320],
        [110, 145, 170, 190, 330],
        [115, 150, 190, 210, 340],
        [125, 165, 190, 210, 390],
        [130, 175, 215, 240, 410],
        [145, 190, 215, 240, 450],
    ]

    //Array of arrays, each index from 0 to 4 represents a season.
    //Inside those seasonal arrays are stored fees for different BAR levels. 
    const seasonAndBar = [lowSeason, middleSeason, midHighSeason, highSeason, peakSeason]

    return {seasonAndBar}

}();


const timeHandler = function () {
    
    function extrapolateDateSeason(date) {

        let season;

        //AL MOMENTO L'ANNO È SCRITTO A MANO,
        //PER FARLO FUNZIONARE PER IL 2023 BISOGNA MODIFICARE L'ANNO AL PASSAGGIO
        //LO RENDERÒ AUTOMATICO QUANDO LO METTO IN FUNZIONE

        switch(true) {
            //Check if it's low season
            case (new Date(date) <=  new Date('2022-03-07') &&
            new Date(date) >=  new Date('2022-01-03') ||
            new Date(date) <=  new Date('2022-12-22') &&
            new Date(date) >=  new Date('2022-10-26')
             ):
             season = 0;
             break;

             //Check for middle season
            case (new Date(date) <=  new Date('2022-04-11') &&
            new Date(date) >=  new Date('2022-03-08') ||
            new Date(date) <=  new Date('2022-07-04') &&
            new Date(date) >=  new Date('2022-06-10') ||
            new Date(date) <=  new Date('2022-10-25') &&
            new Date(date) >=  new Date('2022-30-09') ||
            new Date(date) <=  new Date('2022-12-29') &&
            new Date(date) >=  new Date('2022-12-23') 
             ):
             season = 1;
             break;

            //Mid-High Season
            case (new Date(date) <= new Date('2022-04-25') &&
            new Date(date) >= new Date('2022-04-12') ||
            new Date(date) <= new Date('2022-06-09') &&
            new Date(date) >= new Date('2022-05-27') ||
            new Date(date) <=  new Date('2022-07-18') &&
            new Date(date) >=  new Date('2022-07-05') ||
            new Date(date) <=  new Date('2022-09-16') &&
            new Date(date) >=  new Date('2022-09-29') 
             ):
             season = 2;
             break;

             //High Season
            case (new Date(date) <=  new Date('2022-05-26') &&
            new Date(date) >=  new Date('2022-04-26') ||
            new Date(date) <=  new Date('2022-08-08') &&
            new Date(date) >=  new Date('2022-07-19') ||
            new Date(date) <=  new Date('2022-09-15') &&
            new Date(date) >=  new Date('2022-08-19')
            ):
             season = 3;
             break;

             //Peak Season
            case (new Date(date) <=  new Date('2022-08-18') &&
            new Date(date) >=  new Date('2022-08-09') ||
            new Date(date) <=  new Date('2023-01-02') &&
            new Date(date) >=  new Date('2022-12-30')
            ):
             season = 4;
             break;

        }

        return season;
    }

    return {extrapolateDateSeason}

}();

const barCalculator = function () {

    function calculateBarTier() {
        const numberOfRoomsSold = Number(domHandler.returnRoomsSold());
        let bar;

        switch(true) {
            case (numberOfRoomsSold < 6):
                bar = 0
                return bar;
            case (numberOfRoomsSold < 9):
                bar = 1
                return bar;
            case (numberOfRoomsSold < 12):
                bar = 2;
                return bar;
            case (numberOfRoomsSold < 14):
                bar = 3;
                return bar;
            case (numberOfRoomsSold >= 14 && numberOfRoomsSold < 16):
                bar = 4;
                return bar;
            case (numberOfRoomsSold === 16 || numberOfRoomsSold > 16 && numberOfRoomsSold < 24):
                bar = 5;
                return bar;
            case (numberOfRoomsSold >= 24):
                bar = 6;
                return bar;
        }


    }

    function elaborateDayFare() {

        //Get the date
        let date = domHandler.returnDate();

        //Extract all the relevant data 
        let season = timeHandler.extrapolateDateSeason(date);
        let bar = calculateBarTier();
        let room = domHandler.returnRoomType();

        //Use it to calculate the fare
        let fare = prices2021.seasonAndBar[season][bar][room];

        //Make the values 'edible' and return them
        let finalisedData =  makeItHuman(season, bar, room, fare, date)

        return finalisedData;
        
    }

    function displayData () {

        //Remove the error div if it's there.
        domHandler.deleteErrorDiv();

        //Check if user forgot input
        let error = domHandler.checkForErrors();
        if (error === 1) return;

        //Extract all the data from the form
        const data = elaborateDayFare();

        //Plug record into the board
        domHandler.createNewTableRecord(data.room, data.bar, data.season, data.fare, data.date);
        domHandler.updateTotal();


    }

    //This function translates computer speak to human speak for the table
    function makeItHuman(season, bar, room, fare, date) {

        //Create an object to store the data
        let data = {}

        switch (true) {
            case (season === 0):
                data.season = 'Low Season';
                break;
            case (season === 1):
                data.season = 'Middle Season';
                break;
            case (season === 2):
                data.season = 'Middle-high Season';
                break;
            case (season === 3):
                data.season = 'High Season';
                break;
            case (season === 4):
                data.season = 'Peak Season';
        }

        if (bar === 6) data.bar = 'RACK';
        else data.bar = -(bar - 6);

        switch (true) {
            case (room === 0):
                data.room = 'MUS';
                break;
            case (room === 1):
                data.room = 'M/XX';
                break;
            case (room === 2):
                data.room = 'JST';
                break;
            case (room === 3):
                data.room = 'JSQ';
                break;
            case (room === 4):
                data.room = 'SUITE';
                break;

        }

        data.fare = `${fare}.00 EUR`;

        data.date = date;

        return data

    }

    const button = document.querySelector('button');
    button.addEventListener('click', displayData);

    return {elaborateDayFare}

}();
