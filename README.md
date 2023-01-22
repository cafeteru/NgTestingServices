# NgTestingServices

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.1.

## How to config WSL/Docker

```sh
sudo apt update && sudo apt -y upgrade && sudo apt -y autoremove

wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt -y install ./google-chrome-stable_current_amd64.deb

google-chrome --version
```

## Commands

- ng test: execute all tests
  - --no-watch: only run tests once.
  - --code-coverage: generate coverage report.
    - The route is defined in karma.conf.js.
    - To see it, open index.html.

## Teory

- describe: define a test suite (collection of tests). Receive two parameters, a string with the name of the suite y and a function() where the tests are defined. Posibles alternatives:
  - fdescribe: run only the test suite.
  - xdescribe: the test suite is omitted.
- it: define a test. Receives as a parameter the name of the test and a function to be executed by the test.
  - fit: run only this test.
  - xit: the test is omitted.
- expect: What to expect receiving that test. With expect the verification of the test is done.

## How to config test coverage threshold

- Jazmine:
  - Add  this in `karma.config.js`:

  ```json
       coverageReporter: {
        ...
        check: {
          global: {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80,
          }
        }
      }
  ```

  ```terminal
  15 01 2023 20:40:04.275:ERROR [coverage]: Chrome Headless 108.0.5359.126 (Windows 10): Coverage for statements (41.66%) does not meet global threshold (80%)
  15 01 2023 20:40:04.276:ERROR [coverage]: Chrome Headless 108.0.5359.126 (Windows 10): Coverage for lines (36.36%) does not meet global threshold (80%)
  15 01 2023 20:40:04.276:ERROR [coverage]: Chrome Headless 108.0.5359.126 (Windows 10): Coverage for functions (50%) does not meet global threshold (80%)
  ```

- Jest (TODO)

## Mocha Report instalation in Karma

1. Install dependency

```terminal
npm i karma-mocha-reporter --save-dev
```

2. Config `karma.conf.js`

```js
module.exports = function (config) {
  config.set({
    ...
    plugins: [
      ...
      require("karma-mocha-reporter"),
    ],
    ...
    reporters: ["mocha"],
  });
};

```

## Documentation

[Matchers](https://jasmine.github.io/api/edge/matchers.html)

## Libraries

[Fakerjs](https://fakerjs.dev/)
