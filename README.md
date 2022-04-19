# Goldbelly Shortener

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

You will need to create environment variables on your local system for the app to use. The easiest way is by creating a `.env` file in the project root. You will need to add these two variables:

```bash
REACT_APP_API_KEY={API_SECRET_KEY}
REACT_APP_API_URL='https://api.bely.me/'
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### Start Notes

I decided not to reinvent the wheel with the development process and used react-scripts for this. The dev tools out of the box work well and it plays well into the test setup.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### Test Notes

I am using [SWR](https://swr.vercel.app/) and [MSW](https://mswjs.io/) which let's me set up a mock REST server for testing. This allows me to write reusable mocks for specific data hooks, that any components using those hooks get for free.
