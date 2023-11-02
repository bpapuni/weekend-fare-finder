const express = require('express');
const app = express();
const { PORT = 3001 } = process.env;



// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
// app.use(express.json());

// Serve API requests from the router
// app.use('/api', router);

// Serve app production bundle
// app.use(express.static('dist/app'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const airportDict = {
    'timaru': 'TIU',
    'auckland': 'AKL',
    'napier': 'NPE',
    'hastings': 'NPE',
    'kerikeri': 'KKE',
    'nelson': 'NSN',
    'tauranga': 'TRG',
    'hokitika': 'HKK',
    'new plymouth': 'NPL',
    'whangarei': 'WRE',
    'taupo': 'TUO',
    'gisborne': 'GIS',
    'dunedin': 'DUD',
    'wellington': 'WLG',
    'palmerston north': 'PMR',
    'rotorua': 'ROT',
    'queenstown': 'ZQN',
    'hamilton': 'HLZ',
    'invercargill': 'IVC',
    'blenheim': 'BHE',
    'christchurch': 'CHC',
};
  
app.get('/api/v1/fares/:outbound/:return', (req, res) => {
const outboundCity = req.params.outbound.toLowerCase();
const returnCity = req.params.return.toLowerCase();

if (!airportDict[outboundCity] || !airportDict[returnCity]) {
    return res.status(400).json({ error: 'Invalid airport codes' });
}

Promise.all([
    fetch(`https://grabaseat.co.nz/api/v1/feed/lowfarefinder/${airportDict[outboundCity]}/${airportDict[returnCity]}`),
    fetch(`https://grabaseat.co.nz/api/v1/feed/lowfarefinder/${airportDict[returnCity]}/${airportDict[outboundCity]}`),
])
.then((responses) => {
const [outboundResponse, returnResponse] = responses;

if (!outboundResponse.ok || !returnResponse.ok) {
    throw new Error('Network response was not ok');
}

    return Promise.all([outboundResponse.json(), returnResponse.json()]);
})
.then((data) => {
    const [outboundData, returnData] = data;
    const processedResults = processResults(outboundData, returnData);
    res.json(processedResults);
})
.catch((error) => {
    console.error('Fetch error:', error);
});

function processResults(outboundData, returnData) {
    var results = `Fly to ${capitalise(returnCity)} : Return to ${capitalise(
    outboundCity
    )} : Price\n\n`;
    var outboundDates = [];
    var validFlightDates = [];
    var validFlightData = [];

    outboundData.priceAvailability.forEach(function (date) {
    let price = date.farePrice;
    let day = new Date(date.outboundDate).getDay();
    if (day == 5) {
        outboundDates.push({ date: date.outboundDate, price: price });
    }
    });

    returnData.priceAvailability.forEach(function (date) {
    let price = date.farePrice;
    let day = new Date(date.outboundDate).getDay();
    if (day == 0) {
        outboundDates.forEach(function (dDate) {
        let outboundDate = new Date(dDate.date);
        let returnDate = new Date(date.outboundDate);
        let DateDiff = Math.ceil(
            (returnDate.getTime() - outboundDate.getTime()) /
            (1000 * 60 * 60 * 24)
        );
        if (DateDiff == 2) {
            let outboundData = outboundDate.toString().split(' ');
            let returnData = returnDate.toString().split(' ');
            validFlightData.push({
            outbound: { month: outboundData[1], day: outboundData[2] },
            return: { month: returnData[1], day: returnData[2] },
            });
            validFlightDates.push({
            dates: `${outboundDate.toString().slice(0, 15)} : ${returnDate
                .toString()
                .slice(0, 15)}`,
            price: +dDate.price + +price,
            });
        }
        });
    }
    });

    validFlightDates.forEach(function (d, i) {
    results +=
        d.dates +
        ' : $' +
        d.price +
        ` <a href=${searchLink(validFlightData[i])}>Book Now</a>` +
        '\n';
    });

    return results;
}

function searchLink(obj) {
    const link = `https://flightbookings.grabaseat.co.nz/vbook/actions/ext-search?depart-from=${airportDict[outboundCity]}&depart-to=${airportDict[returnCity]}&searchLegs%5B0%5D.originPoint=${airportDict[outboundCity]}&searchLegs%5B0%5D.destinationPoint=${airportDict[returnCity]}&searchLegs%5B1%5D.originPoint=${airportDict[returnCity]}&searchLegs%5B1%5D.destinationPoint=${airportDict[outboundCity]}&tripType=return&searchType=flexible&searchLegs%5B0%5D.tripStartMonth=${obj.outbound.month}&searchLegs%5B0%5D.tripStartDate=${obj.outbound.day}&searchLegs%5B1%5D.tripStartMonth=${obj.return.month}&searchLegs%5B1%5D.tripStartDate=${obj.return.day}&adults=1&bookingClass=ECONOMY&promoCode=&submitSearch=&doSearch=search&internalRevenueSource=cms%20home`;
    return link;
}

function capitalise(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
}
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

module.exports = app