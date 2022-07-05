<h1 id='table-of-contents'>TABLE OF CONTENTS</h1>

- [Cypress 9 - Fundamentals](#cypress-9---fundamentals)
  - [Links](#links)
  - [Introduction to Cypress](#introduction-to-cypress)
    - [End-to-end Testing](#end-to-end-testing)
    - [What is Cypress?](#what-is-cypress)
    - [How is Cypress different?](#how-is-cypress-different)
    - [Trade-offs](#trade-offs)
  - [Set Up, and Run Your Fist Test](#set-up-and-run-your-fist-test)
    - [Install Cypress](#install-cypress)
    - [Run Cypress](#run-cypress)
    - [Create Our First Cypress Test](#create-our-first-cypress-test)
      - [Run Test](#run-test)
      - [Write and Run First Test](#write-and-run-first-test)

---

# Cypress 9 - Fundamentals

## Links

- [Cypress](https://www.cypress.io/)
- [Docs](https://docs.cypress.io/guides/overview/why-cypress)
- [GitHub](https://github.com/cypress-io/cypress)
- [Cypress Roadmap](https://docs.cypress.io/guides/references/roadmap#Upcoming-features)
- [Base App Repo](https://github.com/adhithiravi/Cypress-Fundamentals)

## Introduction to Cypress

What is End-to-end testing?

- Unit Tests
  - Tests an isolated unit in your code (a single function, class)
  - Easiest
  - Cheapest
  - Fastest
  - Write 1000s of these to validate code
- Integration Tests
  - Test code with dependencies
  - Tests more than just an isolated unit
  - API, Component tests
  - Slower than unit tests
- End-to-end Tests
  - Tests full flow of application
  - Interacts with the application like an end user

![](/assets/images/2022-07-05-13-37-40.png)

- Manual Testing
  - Hours spent manually clicking through application
  - Risky and leads to several uncaught bugs
  - Tedious, error-prone, and slow

### End-to-end Testing

> Automated tests that test an application from start to finish, by simulating a real user scenario.

- Catches bugs early on with excellent coverage
- Save hours spent on manual testing
- High quality software for clients

### What is Cypress?

Cypress is fast, easy, and reliable end-to-end testing for anything that run in the browser

- Cypress Features

  - Time travel & debugging
    - You can simply hover over each Cypress command and see exactly what happened at each step
  - Automatic waiting
    - You will never need to add waits or sleep timers to your tests. Cypress waits for certain commands or assertions before moving on. This means, no more async calls
  - Reliable and Fast
    - It doesn't use `Selenium` or `WebDriver`
    - It provides consistent, and reliable tests without having to depend on those drivers
  - Screenshots and Videos
    - You can configure Cypress to take screenshots of failures or record videos of your entire suite of tests.
  - Spies, Stubs and Clocks
    - Cypress comes built-in with the ability to stub and spy, along with modifying your application's time. These commands are useful when writing unit tests and integration tests.
  - Network Traffic Control
    - You can stub network traffic however you like

- Cypress Example:

  ```JavaScript
  describe("Navigation", () => {
    it("should navigate to conference page", () => {
      cy.visit("/conference");
      cy.get("h1").contains("View Sessions");
    })
  })
  ```

  - Cypress tests are easy to read
  - Not intended to test applications that you don't control

### How is Cypress different?

- All-in-one inclusive testing framework
- It is for both developers and QA engineers
- Has native access to everything
  - It could be a window, a document, a DOM element, or anything else.
- Framework agnostic
  - The front-end could be written in React, Angular, Vue, or plain vanilla JavaScript
  - It could be even a server-side language which renders HTML
- Flake resistant
  - Cypress is notified the moment the page loads and unloads
  - It's close to impossible to Cypress to miss elements when it fires events

### Trade-offs

- Not a general-purpose tool
  - Don't not use Cypress for
    - Indexing the web
    - Performance testing
    - Spidering links

> Cypress should be used to test your own application as you build it

> Not meant for manual testing or exploratory testing

- Cypress runs inside the browser

  - Impossible for Cypress to miss elements
  - JavaScript is the only supported language
  - Harder to communicate with back-end
  - Use `cy.exec()`, `cy.task()`, `cy.request()`

- No multi-tabs support

  - Cypress runs on the browser
  - Never have this support
  - No reason to test browser's native behavior
  - Do not test the stuff that doesn't need testing

- Same-origin Tests Only

  - Cannot visit two domains of different origins in same test
  - Can visit two or more domains of different origin in different tests

  ```JavaScript
  it("navigates", () => {
    cy.visit("https://apple.com");
    cy.visit("https://facebook.com"); // This will throw an error
  });

  // move visit to a different origin to another test
  it("navigates", () => {
    cy.visit("https://apple.com"); // Works
  });


  it("navigates to new origin", () => {
    cy.visit("https://facebook.com"); // Works
  });
  ```

- Temporary Trade-offs

  - There is no native or mobile events support
  - iFrame support is limited
  - Workarounds for lack of `cy.hover()`
  - No `cy.tab()` command
  - Testing file uploads/downloads is app specific

## Set Up, and Run Your Fist Test

- [Base App Repo](https://github.com/adhithiravi/Cypress-Fundamentals)

```Bash
# node 16.14.2

npm i # root
npm i # app/ folder (frontend)
npm i # api/ folder (backend)
```

### Install Cypress

```Bash
npm i -D cypress
```

### Run Cypress

In the root of our project run

```Bash
npx cypress open
```

> Running the first time the Cypress command, it will generate some test exameples inside the new `cypress` folder (`1-getting-started` and `2-advanced-examples`). We can delete them

![](/assets/images/2022-07-05-14-45-52.png)

### Create Our First Cypress Test

Create a new test suite, but leave it empty for now

```Bash
touch cypress/integration/navigation.spec.js
```

![](/assets/images/2022-07-05-14-49-56.png)

> Our first test is now visible to us. And all the boilerplate tests are gone

#### Run Test

To run the test, click on the `navigation.spec.js` and this will run the test automatically

![](/assets/images/2022-07-05-14-52-35.png)

![](/assets/images/2022-07-05-14-53-48.png)

#### Write and Run First Test

As soon we write and save our first code. Cypress will automatically pick up the changes and update the simulator

```JavaScript
/// <reference types="cypress"/>

describe('Navigation', () => {
    it('Should navigate to conference sessions page', async () => {
        cy.visit('http://localhost:1337/conference');
    });
});
```

> the `/// <reference types="cypress"/>` will turn the intelliSense per file

![](/assets/images/2022-07-05-15-01-01.png)

![](/assets/images/2022-07-05-14-59-43.png)

```JavaScript
describe('Navigation', () => {
    it('Should navigate to conference sessions page', async () => {
        cy.visit('http://localhost:1337/conference');
        cy.get('h1').contains('View Sessions').click();
        cy.url().should('include', '/sessions');
    });
});
```

![](/assets/images/2022-07-05-15-04-48.png)
