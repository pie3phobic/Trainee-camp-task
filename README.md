# This is my project created for Reenbit Internship Test Task

# Demo: https://trip-app-sand.vercel.app/

### Description :) ->

This project was made with a framework for React.JS - Next.JS.

## Completed tasks:
1. Visualised app's main page according to the design that was sent to me.
2. Upon starting the application, user will see one starting trip to London. The list is scrollable.
3. When user selects a trip from the list, a forecast for each day of the trip is displayed.
4. On the top:
a. There is a searchbar to search among all trips.
5. The app includes a button for adding a new trip. When the user clicks on "Add trip" a modal window will appear. Inside the modal, the user has the ability to:
a. Choose a city from a predefined list that icludes 30 cities.
b. Enter the start date of the trip (the start date is within the next 15 days).
c. Enter the end date of the trip (the end date is within the next 15 days).
Upon clicking "Done," the trip will be added to the list. Modal looks like exactly as the design that was sent for this task.
6. On the right side of the page:
a. When user selects a trip, today's weather forecast for that city will be displayed.
b. There also is a countdown timer from the current date to the start date of the trip.

## Completed Bonus tasks:
1. Implemented next and previous buttons for the trips list and week's weather forecast list to handle scrolling better if div is overflown with content.
2. When user adds a trip to the list all list is sorted based on the trip's start date.
3. Implemented login through Google account using NextAuth: https://next-auth.js.org/getting-started/introduction
4. Implemented store for trips and the store is permanent meaning that even after full page reload happens, saved trips and their data will be accessible.

## Description of redux store logic:
Redux store starts with initial state of a single trip to London that user will see when the application is loaded up. Then after clicking on the `Add Trip` button and succesfully filling in the trip's data (the modal form won't let you add a new trip unless all trip's data is provided (city, startDate and endDate)). After that the newly added trip will be added to the store, where it will also be sorted chronologically based on trip's start date. The data from the store is being displayed on the page from mapping through the store data, so after adding new trip user will see it immediately and in the correct order. This all happens through `tripActions` and `tripReducer`.
`Redux-persist` library was used to persist the Redux store's state across page reloads. This ensures that the app retains its state between sessions.
After clicking on any trip two asynchronous functions are being executed and `Promise.all()` method waits for all of them to complete to reduce numbers of HTTP calls and to make sure that all the needed data will be displayed to user.
```
    Promise.all([
      fetchWeatherForecast(city, startDate, endDate),
      fetchWeatherToday(city),
    ])
```

Thank you <3
\*\*Image credits: Freepic, Unsplash

## Опис:

Цей проєкт створено з використанням фреймворку для React.JS - Next.JS
Дякую! <3

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

```
npm i
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
