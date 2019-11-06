# Quick Air ☁️

> Check air quality near you quickly, using [Airly](https://airly.eu/) API

[![Build Status](https://travis-ci.org/xxczaki/quick-air.svg?branch=master)](https://travis-ci.org/xxczaki/quick-air)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

---

## Highlights

- Built with modern technologies
- Great performance (100 Lighthouse score)
- Shows data in a friendly way
- Utilizes the [airly](https://github.com/xxczaki/airly) package
- Caches data
- Works offline

## Development

> Hosted with [now Δ](https://zeit.com/now)

```
# Install dependencies
$ npm install

# Start in development mode
$ npm run dev

# Build for production
$ npm run build
```

## How it works?

After granting a location access and clicking the "Check air quality" button, the application tries to find the nearest air quality sensor and retrieve data about PM2.5 and PM10. It then classifies the air quality using PM2.5 value and prepares a charts with pollution forecast :smile:

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
