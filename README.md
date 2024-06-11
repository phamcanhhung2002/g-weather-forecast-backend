# G-Weather-Forecast backend

> API for searching for a city or country and displaying weather information

## Setup

Prepare **.env** file:

* HOST: your host name.
* PORT: your port.
* CLIENT_URL: your frontend url.
* WEATHER_API_KEY: your [weather api](https://www.weatherapi.com/) key.
* MONGODB_URI: your [mongo db](https://www.mongodb.com) uri.
* MAIL_HOST: your mail host.
* MAIL_USER: your email address.
* MAIL_PASS: your email password.
* SECRET: email confirmation jwt secret.
* TOKEN_EXPIRE_TIME: email confirm token expiration time.

Install global packages:

```bash
npm install -g pm2 nodemon
```

Install packages:

```bash
npm install
```

Run in dev mode:

```bash
npm run dev
```

```bash
node src/daemons/subscription.daemon.js
```

Run in prod mode:

```bash
npm start
```
