# Using and Testing a Service Object

This repo uses a [simple React app (bootstrapped with Vite) with Jest testing configured](https://github.com/gSchool/vite-RTL-jest-starter) to demonstrate some object-oriented separation-of-concerns principles and demonstrate isolating API interaction to an object-oriented Service Object interface that allows easier mocking of API interaction with Jest tests via a simple manual mock implementation of the same API Service Object interface.

## Separation-of-Concerns
In order to keep all of the API-based asynchronous requests and logic separate from the components of this React app, a Service Object (i.e. an object containing asynchronous methods representing all of the different types of API calls the app might need to make) is declared and exported in `src/services/api_service.js`.  This service represents a nice clean object-oriented approach to separation-of-concerns, keeping app logic and fetch logic essentially entirely separate.  If you need to make a different type of API call, you can now simply add a method that does what you need it to onto the api service object and import that method wherever it is needed in your app.

Asynchronous methods are implemented to request Pokemon, Games (from a given Generation), and Berries.

## Mocking the Service Object
Jest can do some nice mocking for us. Creating a mock implementation of the Service Object allows us to mock the data expected from the API without having to repeatedly mock `fetch` in your tests.  Jest allows you to use a specific format to do mocks of modules like this one - create a file with the same name as the module file to be mocked and place it in a `/__mocks__/` directory at the same level as the  module to be mocked.  In this case, that means that this mock implementation is located in `/src/services/__mocks__/api_service.js`.  This file exports an object that resembles the Service Object that interacts with the API, but only simulates that asynchronous interaction by using the mock data exported from `/src/services/__mocks__/api_service.js`. 

All of the asynchronous methods on the API Service Object are mocked.

Making sure that this mocking is 'turned on' for the tests is as simple as adding a call to `jest.mock()` in `src/jest.setup.js` and passing in the filepath of the module you want to mock. This is what causes Jest to look for the `__mocks__` folder and find the matching filename to the module that is being mocked - this handles making sure that your API calls are mocked by the time that your tests run.

Example tests are implemented that use the mock data in `/src/tests/App.test.js`

## Diagram Showing Key Modifications for Mocking
In the following diagram, you can see which directories/files needed to be modified and which directories/files needed to be created in order to make the tests that leverage API mocking contained in `/src/tests/App.test.js` work.

### KEY
🚧 = Created
🛠️ = Modified
```
.
├── README.md
├── __mocks__
│   └── svgTransform.js
├── babel.config.cjs
├── eslint.config.js
├── index.html
├── jest.config.cjs
├── 🛠️jest.setup.js
├── package-lock.json
├── package.json
├── public
│   └── vite.svg
├── 🚧services
│   ├── 🚧__mocks__
│   │   ├── 🚧api_service.js 
│   │   └── 🚧mockData.js 
│   └── 🚧api_service.js
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   ├── main.jsx
│   └── 🚧tests
│       └── 🚧App.test.js
└── vite.config.js
```
