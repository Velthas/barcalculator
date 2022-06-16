import domHandler from './domElements';
import timeHandler from './timeHandler';
import prices2022 from './2022';

const barCalculator = (function () {
  function calculateClassicsFare(type) {
    //Get how many rooms
    const noOfClassicSold = Number(domHandler.returnRoomsSold('Classic'));

    // Get the date and season
    const date = domHandler.returnDate();
    const season = timeHandler.extrapolateDateSeason(date);

    // Is argument passed is 0, this is a double single use, if 1 a double.
    const roomType = type;

    // Extract bar
    // Classic rooms only increase if other classic rooms are sold
    // The amount of triples and quadruples sold does not influence this rate
    let bar;

    switch (true) {
      case noOfClassicSold < 6:
        bar = 0;
        break;
      case noOfClassicSold < 9:
        bar = 1;
        break;
      case noOfClassicSold < 12:
        bar = 2;
        break;
      case noOfClassicSold < 14:
        bar = 3;
        break;
      case noOfClassicSold === 14:
        bar = 4;
        break;
      case noOfClassicSold === 15:
        bar = 5;
        break;
      case noOfClassicSold >= 16:
        bar = 6;
    }

    // Extract rate
    const rate = prices2022.seasonAndBar[season][bar][roomType];

    // Return an object with all the info
    let finalisedData = { season, bar, room: roomType, rate, date };

    return finalisedData;
  }

  function calculateTripleFare() {
    // See how many triples have been sold
    const noOfTriplesSold = Number(domHandler.returnRoomsSold('JST'));

    // Get the date and season
    const date = domHandler.returnDate();
    const season = timeHandler.extrapolateDateSeason(date);

    // Number two is for triple
    const roomType = 2;

    // We might need to reassign the bar
    let bar;

    // Quadruple and Triples are special
    // They increase in value only if a room of the same type is sold
    // If the rate of the M is greater than that of the JST for two people
    // Then the rate of the JST increases until it surpasses it
    // Similarly, JSQ cannot cost less than JST

    switch (true) {
      case noOfTriplesSold === 0:
        bar = 0;
        break;
      case noOfTriplesSold === 1:
        bar = 1;
        break;
      case noOfTriplesSold === 2:
        bar = 3;
        break;
      case noOfTriplesSold > 2:
        bar = 5;
    }

    // Calculate the rate for a triple;
    let tripleRate = prices2022.seasonAndBar[season][bar][roomType];

    //Fetch the rate for a double based on the available data;
    let doubleRate = calculateClassicsFare(1).rate;

    //Keep increasing the price until the following is true:
    // Triple for two people costs more than double room.
    while (tripleRate - 15 <= doubleRate) {
      bar += 1;
      tripleRate = prices2022.seasonAndBar[season][bar][roomType];
    }

    // Return an object with all the info
    let finalisedData = { season, bar, room: roomType, rate: tripleRate, date };

    return finalisedData;
  }

  function calculateQuadrupleFare() {
    // Get the number of quadruples sold
    const noOfQuadrupleSold = Number(domHandler.returnRoomsSold('JSQ'));

    // Get the date and season
    const date = domHandler.returnDate();
    const season = timeHandler.extrapolateDateSeason(date);

    // Number 3 is for quadruple
    const roomType = 3;

    // We might need to reassign the bar so it cannot be a const
    let bar;

    switch (true) {
      case noOfQuadrupleSold === 0:
        bar = 0;
        break;
      case noOfQuadrupleSold === 1:
        bar = 1;
        break;
      case noOfQuadrupleSold === 2:
        bar = 3;
      case noOfQuadrupleSold === 3:
        bar = 5;
    }

    let quadrupleRate = prices2022.seasonAndBar[season][bar][roomType];

    //Get the triple to see if by quadruple is lower
    const tripleRate = calculateTripleFare().rate;

    //Keep raising until a quadruple's rate for two people is more than a triple's for two
    while (quadrupleRate - 30 <= tripleRate - 15) {
      bar += 1;
      quadrupleRate = prices2022.seasonAndBar[season][bar][roomType];
    }

    let finalisedData = {
      season,
      bar,
      room: roomType,
      rate: quadrupleRate,
      date,
    };

    return finalisedData;
  }

  function calculateSuiteFare() {
    // The rate for our best room is directly influenced only by Classic rooms sold.
    // This is honestly out of this world
    // Why not all of em?
    const totalRoomsSold = domHandler.returnRoomsSold('Classic');

    // Get the date and season
    const date = domHandler.returnDate();
    const season = timeHandler.extrapolateDateSeason(date);

    // Room type is Suite
    const roomType = 4;

    let bar;

    // Now to calculate the price of the suite
    switch (true) {
      case totalRoomsSold < 6:
        bar = 0;
        break;
      case totalRoomsSold < 9:
        bar = 1;
        break;
      case totalRoomsSold < 12:
        bar = 2;
        break;
      case totalRoomsSold < 14:
        bar = 3;
        break;
      case totalRoomsSold === 14:
        bar = 4;
        break;
      case totalRoomsSold === 15:
        bar = 5;
        break;
      case totalRoomsSold >= 16:
        bar = 6;
    }

    const suiteRate = prices2022.seasonAndBar[season][bar][roomType];

    const finalisedData = {
      season,
      bar,
      room: roomType,
      date,
      rate: suiteRate,
    };

    return finalisedData;
  }

  // This function translates computer speak to human speak for the table.
  // Returns an object with humanised data.
  function makeItHuman(season, bar, room, fare, date) {
    // Create an object to store the data
    let data = {};

    //Translate number to season name
    switch (true) {
      case season === 0:
        data.season = 'Low Season';
        break;
      case season === 1:
        data.season = 'Middle Season';
        break;
      case season === 2:
        data.season = 'Middle-high Season';
        break;
      case season === 3:
        data.season = 'High Season';
        break;
      case season === 4:
        data.season = 'Peak Season';
    }

    //Change BAR to match real value
    if (bar === 6) data.bar = 'RACK';
    else data.bar = -(bar - 6);

    //Translate room number to room type
    switch (true) {
      case room === 0:
        data.room = 'MUS';
        break;
      case room === 1:
        data.room = 'M/XX';
        break;
      case room === 2:
        data.room = 'JST';
        break;
      case room === 3:
        data.room = 'JSQ';
        break;
      case room === 4:
        data.room = 'SUITE';
        break;
    }

    //Format the rate (currently impossible to get something with a decimal value)
    data.fare = `${fare}.00 EUR`;

    //Get the date in its raw value
    data.date = date;

    return data;
  }

  return {
    makeItHuman,
    calculateClassicsFare,
    calculateQuadrupleFare,
    calculateTripleFare,
    calculateSuiteFare,
  };
})();

export default barCalculator;
