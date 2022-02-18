const prices2022 = function () {
    
    //This is the legend for the array: MUS, MATRIMONIALE, JST, JSQ, SUITE
    //Each season array has 6 BAR Arrays within, starting at BAR 6 and culminating in RACK (BAR 0)
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

    //Array of arrays of arrays (hi), each index from 0 to 4 represents a season.
    //Inside those seasonal arrays are stored fees for different BAR levels. 
    const seasonAndBar = [lowSeason, middleSeason, midHighSeason, highSeason, peakSeason]

    return {seasonAndBar}

}();

export default prices2022;