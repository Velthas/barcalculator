# Bar Calculator
![Bar Calculator](https://user-images.githubusercontent.com/89540144/154411365-a91b58c7-7829-4d40-a0c8-95059eedf63c.png)

A small application meant to help the receptionists of **Villa Carlotta** (4* Hotel) determine the **BAR (Best Available Rate)** for the hotel's rooms in the year 2022. Using this application is meant to cut waiting times of clients on the phone significantly while making the process of determining rates easier for employees. 

## Overview
Upon first loading the one and only webpage of this project you will be presented with a form and a table. The relevant information we are looking to get from the user is:
+ Number of rooms booked for that day.
+ Date of the guest's stay.
+ Type of room the guest desires for that day.

Once the form has been filled out, clicking on 'Calcola Tariffa' will add the record to the table right below, displaying information about the season (which can be either Low, Middle, Middle-high, High or Peak), the BAR Tier depending on how many rooms are sold and finally the rate for the specified date. On top of that, for situations where multiple days need to be counted, the table is built with a 'total' cell that automatically gathers all of the prices listed into a single figure. 

As of 23/02, I have updated this application to support an 'average' cell containing the average rate for all the records listed, as well as a reorder button allowing the user to sort the records from the earliest to the latest date available. Each record on the table is also now accompanied by a delete button, allowing users to delete records at will.

## Future Updates

This is my first application to ever solve a real-life problem of mine. As you can imagine I am very proud, and very eager to keep adding features to it. My hope is that my co-workers will find it as useful as me and keep coming up with suggestions to improve it. For the time being, here are some additions I thought of myself:

+ **Reset Button/Delete Entry**: as of now, there is no way to remove one particular record from the list without resetting it all. I imagine it could be nice if I added a way of doing so, and I believe it could be easily implemented by using data-attributes. // UPDATE 23/02: DONE
+ **Cross Season Calculations**: occasionally a client will stay at the hotel on dates that cross different "seasons": how to behave then? The hotel's policy is to take the average between the rates and use that. Of course, calculating an average is not difficult at all, but having the website to do it for you is always more comfy then opening another page. The whole point of this app was to be more efficient while being lazy after all, no? // UPDATE 23/02: DONE
+ **Multiple Dates**: business clients usually stay for about a day, but for longer stays having to punch in each single date (even though it can be done rather fast) can get very tedious fast. The logic to calculate and plug the data into the board for a day is already there, so I am sure I can automate the process for periods of time aswell. It's not super necessary, but would be a great quality of life change.  // AFTER REVIEWING THIS POSSIBILITY I CONCLUDED THAT IT WOULD BECOME TOO CLUNKY WITH HAVING TO SPECIFY HOW MANY ROOMS ARE SOLD FOR EACH DAY, MUCH BETTER TO JUST HAVE IT THE WAY IT IS
+ **Module Separation**: this is more of a suggestion to improve the architecture of what I've built. Even though I made use of closures and attempted to limit pollution of the namespace, I wish to do an even better job and store each module in its own file, importing and exporting exactly what I need if only to make everything a little tidier. I don't think this is too hard either, I just need be patient and commit a little time to it. // UPDATE 20/02: DONE

## Updates

**03/06**: I have changed the limitation section of this readme to updates. How wonderful! 
Anyway, today I pushed a moderately big update to Bar Calculator, here is what's new:
+ The period 10/06 to 18/07 has now been moved from middle season and middle-high season to high season on request of the reception staff
+ Before, we only had one input for number of rooms sold, now we have three, one for each room type (classic, triple and quadruple). Suite input is not there because it does not influence other rooms in any way. 
+ The rooms' rate scale based on how many of them are sold, and prices of different room types influence each other. Example: a junior suite triple can never cost less than a classic room, so in the event the price for them is the same, the triple will automatically increase. After the change, if the quadruple now cost less than the triple, the price of the quadruple will increase aswell, and so on. 
+ Fixed a small problem with Early Booking and Last Minute packages: it seems our PMS calculated them on the rate of the room for two people rather than its full capacity, so that caused some small fluctuations in the amount of discount offered. This issue is no more, as the code's way of calculating the price has been uniformed to our PMS
+ RACK rates will now be displayed when the appropriate number of rooms are sold, so no longer do you need to type in 25 to display it.

## Credits
As cheesy as it sounds, I wanted to leave this here to my future self for review: just keep working, especially during those long night shifts.
I also wanted to say hi to the receptionists over at Villa Carlotta's. I know they'll never read this most likely, which is okay, and they probably think I am kind of a dork, but I love them and am blessed to be able to work with good people like them.
