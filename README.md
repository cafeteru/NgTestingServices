# NgTestingServices

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.1.

## How to config WSL/Docker

```sh
sudo apt update && sudo apt -y upgrade && sudo apt -y autoremove

wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt -y install ./google-chrome-stable_current_amd64.deb

google-chrome --version
```

## Teory

- describe: define a test suite (collection of tests). Receive two parameters, a string with the name of the suite y and a function() where the tests are defined.

- it: define a test. Receives as a parameter the name of the test and a function to be executed by the test.

- expect: What to expect receiving that test. With expect the verification of the test is done.

## Documentation

[Matchers](https://jasmine.github.io/api/edge/matchers.html)
