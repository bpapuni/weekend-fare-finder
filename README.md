# Weekend Fare Finder

This is a Node.js application that serves as a simple API for fetching flight fares between two New Zealand airports. It uses the Express framework to handle HTTP requests and fetches data from the [grabaseat.co.nz](https://grabaseat.co.nz/) website's low fare finder API.

## How It Works

This API exposes a single endpoint `/v1/fares/:depart/:return` where `:depart` and `:return` are placeholders for departure and return airport codes. The API uses a predefined dictionary (`airportDict`) to map human-readable city names to IATA airport codes.

- **Example Request**: `/v1/fares/wellington/timaru`
- **Example Response**:

> **Fly to Timaru : Return to Wellington : Price**
>
> Fri Dec 08 2023 : Sun Dec 10 2023 : $158   
> Fri Jan 19 2024 : Sun Jan 21 2024 : $148

The API performs the following steps when a request is made:

1. It checks if the provided airport codes are valid. If either the departure or return airport is not in the dictionary, it returns a 400 Bad Request response with an error message.

2. It makes two HTTP requests to the `grabaseat.co.nz` API to fetch low fare data for both the outbound and return flights. The API queries are made with the airport codes, and the results are fetched asynchronously.

3. It processes the data received from both API calls to find round-trip flights departing on a Friday and returning on a Sunday. It then calculates the total fare for these valid flights.

4. The API responds with a formatted list of flight options, including the departure date, return date, and the total price for each valid flight.

## How to Use

1. Clone this repository.

2. Install the required packages:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

4. Make GET requests to the /v1/fares/:depart/:return endpoint with the desired departure and return airports. Replace :depart and :return with the airport codes or city names.

## Integration with Apple Shortcuts  
This API can be integrated with Apple Shortcuts to allow you to quickly query flight fares and display the results on your phone. Below is a custom Apple Shortcut that sends GET requests to the /v1/fares/:depart/:return endpoint, and then displays the results in a user-friendly format on your device. Outbound and return cities can be changed within the Shortcut.

[WeekendFareFinder Shortcut](https://www.icloud.com/shortcuts/bbc07573d80a4174b3006afa66be5947)  
![Shortcut screenshot 1](/screenshots/1.jpg)  ![Shortcut screenshot 2](/screenshots/2.jpg)  ![Shortcut screenshot 3](/screenshots/3.jpg)  ![Shortcut screenshot 4](/screenshots/4.jpg)

## Disclaimer  

This code is provided as-is for educational purposes and may require updates or modifications to work correctly in a production environment.