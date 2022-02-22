import domHandler from "./domElements";
import timeHandler from "./timeHandler";
import prices2022 from "./2022";

const barCalculator = function () {

    //This function looks at rooms sold and returns the bar tier.
    //At the moment, RACK is only displayed when 24 rooms are sold.
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

    //This function gathers all the data and looks into the appropriate seasonAndBar slot.
    //Returns an object with all the data for that day.
    function elaborateDayFare() {

        //Get the date
        let date = domHandler.returnDate();

        //Extract all the relevant data 
        let season = timeHandler.extrapolateDateSeason(date);
        let bar = calculateBarTier();
        let room = domHandler.returnRoomType();

        //Use it to calculate the fare
        let fare = prices2022.seasonAndBar[season][bar][room];

        //Make the values 'edible' and return them
        let finalisedData =  makeItHuman(season, bar, room, fare, date)

        return finalisedData;
        
    }

    //This function translates computer speak to human speak for the table.
    //Returns an object with humanised data.
    function makeItHuman(season, bar, room, fare, date) {

        //Create an object to store the data
        let data = {}

        //Translate number to season name
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

        //Change BAR to match real value
        if (bar === 6) data.bar = 'RACK';
        else data.bar = -(bar - 6);

        //Translate room number to room type
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

        //Format the rate (currently impossible to get something with a decimal value)
        data.fare = `${fare}.00 EUR`;

        //Get the date in its raw value
        data.date = date;

        return data;

    }

    return {elaborateDayFare}

}();

export default barCalculator