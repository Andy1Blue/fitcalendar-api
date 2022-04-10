![icon](https://raw.githubusercontent.com/Andy1Blue/fit-calendar/master/views/assets/logo-calendar.png)

# FitCalendar API

## Description

Backend (API) of FitCalendar project.
Frontend: https://github.com/Andy1Blue/fitcalendar-www

## Technologies and libraries

Libraries and technologies used in the project:

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Installation

```bash
cp .env.example .env && npm install
```

## Running the app

```bash
npm run build && npm run start:prod
```

## Docker

```bash
docker-compose -f docker-compose.yml up -d --build
```

## Heroku

```bash
heroku login
heroku create
git init
git add . && git commit -m "Deploy to Heroku"
heroku stack:set container -a fitcalendar-api
heroku config:set PORT=3001 # add other configs from .env
heroku config:set NODE_OPTIONS="--max_old_space_size=2560" -a [app_name]
git push heroku master

heroku open
heroku logs --tail
```

## Test

```bash
npm run test
```
