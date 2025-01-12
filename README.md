# G-Weather-Forecast backend

API for searching for a city or country and displaying weather information

## Used Technologies

- Back-end: Express, MongoDB, NodeMailer
- Front-end: Bootstrap 5

## Features

- Customers can find weather information of a city.
- Customers can register emails to receive daily weather forecasts.

## Installation

1. Install Node and npm: [link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Install pm2 as a global package: [link](https://pm2.keymetrics.io/)
3. Install VSCode and Live Server: [link](https://www.geeksforgeeks.org/how-to-enable-live-server-on-visual-studio-code/)
4. Create a MongoDB account: [link](https://www.mongodb.com)
5. Get a Weather Api key: [link](https://www.weatherapi.com/)
6. Copy .env.example to a .env file in the api directory, add MongoDB uri and weather api key to it.
7. Open terminal in the directory and type: npm install && npm start.
8. Open another terminal in the directory and type: node src/daemons/subscription.daemon.js
9. Navigate to index.html file in client directory and open with Live Server: [link](https://github.com/phamcanhhung2002/g-weather-forecast-frontend)

## Screenshots

![dashboard](/src/metadata/img/screenshot.png)
