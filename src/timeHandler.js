//Has information about seasons
const timeHandler = (function () {
  function extrapolateDateSeason(date) {
    let season;
    //When the year changes and rates are reset, these values have to be increased by one each
    const currentYear = '2022';
    const followingYear = '2023';
    const lastYear = '2021';

    switch (true) {
      //Check if it`s low season
      case (new Date(date) <= new Date(`${currentYear}-03-07`) &&
        new Date(date) >= new Date(`${currentYear}-01-03`)) ||
        (new Date(date) <= new Date(`${currentYear}-12-22`) &&
          new Date(date) >= new Date(`${currentYear}-10-26`)):
        season = 0;
        break;

      //Check for middle season
      case (new Date(date) <= new Date(`${currentYear}-04-11`) &&
        new Date(date) >= new Date(`${currentYear}-03-08`)) ||
        (new Date(date) <= new Date(`${currentYear}-10-25`) &&
          new Date(date) >= new Date(`${currentYear}-09-30`)) ||
        (new Date(date) <= new Date(`${currentYear}-12-29`) &&
          new Date(date) >= new Date(`${currentYear}-12-23`)):
        season = 1;
        break;

      //Mid-High Season
      case (new Date(date) <= new Date(`${currentYear}-04-25`) &&
        new Date(date) >= new Date(`${currentYear}-04-12`)) ||
        (new Date(date) <= new Date(`${currentYear}-06-09`) &&
          new Date(date) >= new Date(`${currentYear}-05-27`)) ||
        (new Date(date) <= new Date(`${currentYear}-09-29`) &&
          new Date(date) >= new Date(`${currentYear}-09-16`)):
        season = 2;
        break;

      //High Season
      case (new Date(date) <= new Date(`${currentYear}-05-26`) &&
        new Date(date) >= new Date(`${currentYear}-04-26`)) ||
        (new Date(date) <= new Date(`${currentYear}-08-08`) &&
          new Date(date) >= new Date(`${currentYear}-07-19`)) ||
          (new Date(date) <= new Date(`${currentYear}-07-18`) &&
          new Date(date) >= new Date(`${currentYear}-06-10`)) ||
        (new Date(date) <= new Date(`${currentYear}-09-15`) &&
          new Date(date) >= new Date(`${currentYear}-08-19`)):
        season = 3;
        break;

      //Peak Season
      case (new Date(date) <= new Date(`${currentYear}-08-18`) &&
        new Date(date) >= new Date(`${currentYear}-08-09`)) ||
        (new Date(date) <= new Date(`${followingYear}-01-02`) &&
          new Date(date) >= new Date(`${currentYear}-12-30`)) ||
        (new Date(date) <= new Date(`${currentYear}-01-02`) &&
          new Date(date) >= new Date(`${lastYear}-12-30`)):
        season = 4;
        break;
    }

    return season;
  }

  return { extrapolateDateSeason };
})();

export default timeHandler;
