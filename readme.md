# Quick Air ☁️

> Check air quality near you quickly, using [Airly](https://airly.eu/) API

[![Build Status](https://travis-ci.org/xxczaki/quick-air.svg?branch=master)](https://travis-ci.org/xxczaki/quick-air)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

---

## Highlights

- Built with modern technologies
- Great performance
- Shows data in a friendly way
- Utilizes the [airly](https://github.com/xxczaki/airly) package
- Caches data
- Works offline

## Development

> Hosted with [now Δ](https://zeit.com/now)

First of all, you will need Airly API key. Get it [here](https://developer.airly.eu/login) for free.

You should then export the `AIRLY_KEY` environment variable.

```
# Start in development mode
$ AIRLY_KEY=yourapikey npm run dev

# Build for production
$ AIRLY_KEY=yourapikey npm run build
```

**NOTE: If you are using `now dev` command and/or you want to deploy this app to [Zeit Now](https://zeit.co/home), create a `.env.build` file in the root directory and place the `AIRLY_KEY` variable there**

## How it works?

After clicking the "Check air quality" button, the application asks for location access, tries to find the nearest air quality sensor and retrieve data about PM2.5 and PM10. It then classifies the air quality using AIRLY CAQI and prepares charts with pollution forecast :smile:

## Country coverage

At the time of writing this, Airly has sensors in the following countries:

- Poland
- Germany
- Romania
- Denmark
- United Kingdom
- France
- Nederlands
- Belgium
- Switzerland
- Italy
- Spain
- Greece
- Ukraine
- United Arab Emirates
- Georgia

### License

MIT
