![icon](https://raw.githubusercontent.com/Andy1Blue/fit-calendar/master/views/assets/logo-calendar.png)

# FitCalendar API

## Description

Backend (API) of FitCalendar project.

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
heroku config:set PORT=3001 // add other configs from .env
git push heroku master

heroku open
heroku logs --tail
```

## Test

```bash
npm run test
```
