# Weekend Fare Finder

WeekendFareFinder is a web application that helps you find the best flight deals for weekend getaways in New Zealand. It uses the Express framework to handle HTTP requests and fetches data from the [grabaseat.co.nz](https://grabaseat.co.nz/) website's low fare finder API to provide information about low-cost flights between different airports, making it easier for you to plan a quick and affordable weekend trip.

## How to Use
1. Select your Outbound Airport: Choose your departure airport from the list provided.

2. Select your Return Airport: Choose your return airport from the list provided.

3. WeekendFareFinder will retrieve any upcoming weekend flight deals between the selected airports.

4. You will see a list of available flights, including dates and fares.

5. Click on the booking links to make your reservation on the Grabaseat website.

## Integration with Apple Shortcuts  
This API can be integrated with Apple Shortcuts to allow you to quickly query flight fares and display the results on your phone. Below is a custom Apple Shortcut that sends GET requests to the /v1/fares/:outbound/:return endpoint, and then displays the results in a user-friendly format on your device. Outbound and return cities can be changed within the Shortcut.

[WeekendFareFinder Shortcut](https://www.icloud.com/shortcuts/bbc07573d80a4174b3006afa66be5947)  
![Shortcut screenshot 1](/screenshots/1.jpg)  ![Shortcut screenshot 2](/screenshots/2.jpg)  ![Shortcut screenshot 3](/screenshots/3.jpg)  ![Shortcut screenshot 4](/screenshots/4.jpg)

## Technology Stack
Frontend: The frontend of the application is built using React, and it fetches data from the backend API.

Backend: The backend API is built with Node.js and Express.

Data Source: WeekendFareFinder uses data from Grabaseat to find low-fare flights.

## Disclaimer  

WeekendFareFinder is a demonstration application and uses data from Grabaseat for informational purposes. Flight availability and prices may change over time. Be sure to double-check with the airline or travel service for the most up-to-date information.