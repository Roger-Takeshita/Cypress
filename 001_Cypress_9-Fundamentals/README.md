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
    - [Base URL](#base-url)
    - [Run Cypress](#run-cypress)
    - [Run All Tests in Headless module](#run-all-tests-in-headless-module)
    - [Create Our First Cypress Test](#create-our-first-cypress-test)
      - [Run Test](#run-test)
      - [Write and Run First Test](#write-and-run-first-test)
  - [Learning Cypress Core Concepts](#learning-cypress-core-concepts)
    - [Organizing Tests](#organizing-tests)
      - [Fixtures Folder (Data)](#fixtures-folder-data)
      - [Integration Folder](#integration-folder)
      - [Plugins](#plugins)
      - [Support Folder](#support-folder)
    - [Hooks](#hooks)
    - [Interacting with Elements Using Commands](#interacting-with-elements-using-commands)
      - [Commands](#commands)
    - [Selectors](#selectors)
    - [Assertions](#assertions)
      - [Common Cypress Assertions](#common-cypress-assertions)
    - [Cypress Retry-ability](#cypress-retry-ability)
    - [Aliases](#aliases)
  - [Testing Network Requests](#testing-network-requests)
    - [Testing Network Requests Strategy](#testing-network-requests-strategy)
      - [Stub Responses](#stub-responses)
      - [Server Responses](#server-responses)
      - [Best Practice](#best-practice)
    - [Intercept Command - cy.intercept()](#intercept-command---cyintercept)
    - [Stubbing With Intercept Command](#stubbing-with-intercept-command)
      - [Stubbing empty responses](#stubbing-empty-responses)
      - [Stubbing Response](#stubbing-response)
      - [Subbing Fixtures](#subbing-fixtures)
    - [Request Command - cy.request()](#request-command---cyrequest)
      - [Server Response](#server-response)
  - [Exploring Cypress Ecosystem](#exploring-cypress-ecosystem)
    - [Screenshots and Videos](#screenshots-and-videos)
      - [Screenshot](#screenshot)
    - [Custom Commands](#custom-commands)
    - [Cross-browser Support](#cross-browser-support)
    - [Plugins](#plugins-1)
    - [TypesScript Support](#typesscript-support)

---

# Cypress 9 - Fundamentals

## Links

- Cypress
  - [Cypress](https://www.cypress.io/)
  - [Docs](https://docs.cypress.io/guides/overview/why-cypress)
  - [GitHub](https://github.com/cypress-io/cypress)
  - [Plugins Guide](https://docs.cypress.io/guides/tooling/plugins-guide)
  - [Cypress Roadmap](https://docs.cypress.io/guides/references/roadmap#Upcoming-features)
  - [Cypress Assertions](https://docs.cypress.io/guides/references/assertions)
  - [Cypress Cross Browser Testing](https://docs.cypress.io/guides/guides/cross-browser-testing#Continuous-Integration-Strategies)
  - [Cypress Plugins](https://docs.cypress.io/plugins/directory)
- Project
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
  - iframe support is limited
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

### Base URL

In `cypress.json`, we can define our base URL, this way we don't need to type `http://localhost:1337` to every test command

### Run Cypress

In the root of our project run

```Bash
npx cypress open
```

> Running the first time the Cypress command, it will generate some test examples inside the new `cypress` folder (`1-getting-started` and `2-advanced-examples`). We can delete them

![](/assets/images/2022-07-05-14-45-52.png)

### Run All Tests in Headless module

```Bash
npx cypress run
```

When we run Cypress tests in headless mode, it automatically creates videos from the tests

We can set `vidoes` to `False` in `cypress.json`

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

## Learning Cypress Core Concepts

### Organizing Tests

#### Fixtures Folder (Data)

In `cypress/fixtures/` we can define all sorts of data to use with our tests

We can import the data from `fixtures` folder using the `cy.fixture()` command

```JSON
{
  "name": "Using fixtures to represent data",
  "email": "hello@cypress.io",
  "body": "Fixtures are a great way to mock data for responses to routes"
}
```

#### Integration Folder

In `cypress/integration/` folder is where we place all our integration tests files

```JavaScript
/// <reference types="cypress"/>

describe('Navigation', () => {
    it('Should navigate to conference sessions page', async () => {
        cy.visit('http://localhost:1337/conference');
        cy.get('h1').contains('View Sessions').click();
        cy.url().should('include', '/sessions');
    });
});
```

#### Plugins

In `cypress/plugins/index.js`, it's a special file that executes a node before the project is loaded, before the browser launches, and during your test execution.

While the Cypress tests execute in the browser, the plugins file runs in the background node process. It gives your test the ability to access the file system and the rest of the operating system by calling the `cypress.task` command.

The plugins file is a good place to define how you want to bundle the `spec` files via the pre-processes or how to find and launch browsers via the Browser Launch API and other cool things.

- [Plugins Guide](https://docs.cypress.io/guides/tooling/plugins-guide)

```JavaScript
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}
```

#### Support Folder

In `cypress/support/` we can place reusable code such as custom commands, utilities, etc.

Tests are reused across several tests, and Cypress automatically includes these before running every single test.

- In `cypress/support/index.js`

  ```JavaScript
  // ***********************************************************
  // This example support/index.js is processed and
  // loaded automatically before your test files.
  //
  // This is a great place to put global configuration and
  // behavior that modifies Cypress.
  //
  // You can change the location of this file or turn off
  // automatically serving support files with the
  // 'supportFile' configuration option.
  //
  // You can read more here:
  // https://on.cypress.io/configuration
  // ***********************************************************

  // Import commands.js using ES2015 syntax:
  import './commands'

  // Alternatively you can use CommonJS syntax:
  // require('./commands')
  ```

- In `cypress/support/commands.js`

  ```JavaScript
  // ***********************************************
  // This example commands.js shows you how to
  // create various custom commands and overwrite
  // existing commands.
  //
  // For more comprehensive examples of custom
  // commands please read more here:
  // https://on.cypress.io/custom-commands
  // ***********************************************
  //
  //
  // -- This is a parent command --
  // Cypress.Commands.add('login', (email, password) => { ... })
  //
  //
  // -- This is a child command --
  // Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
  //
  //
  // -- This is a dual command --
  // Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
  //
  //
  // -- This will overwrite an existing command --
  // Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
  ```

### Hooks

Cypress provides built-in hooks, which are borrowed from `Mocha`

```JavaScript
before(()=>{
  // root-level hook
  // runs once before all tests
})

beforeEach(()=>{
  // root-level hook
  // runs before every test block
})

afterEach(()=>{
  // runs after every test block
})

after(()=>{
  // runs once after all tests
})
```

### Interacting with Elements Using Commands

#### Commands

Cypress comes with an in-built set of commands to interact with the web page.

They are categorized as `parent`, `child`, and `dual commands`

You can create custom commands, and override existing commands.

- **Parent Command**

  - Parent commands begin a new chain of Cypress commands

    ```JavaScript
    cy.vist('/conference');
    cy.get('h1');
    cy.request('http://dev.local/seeed');
    cy.exec('npm run build');
    cy.intercept('/users/**');
    ```

- **Child Command**

  - Chained off a parent command, or another child command

    ```JavaScript
    cy.get('#[data-cy=speakerProfile]').click();
    cy.get('#[data-cy=sessionTitle]').type('My new session');
    cy.get('.conferece').find('footer');
    cy.contains('ul', 'room number').should('be.visible');
    cy.get('footer').scrollIntoView();
    cy.get('form').submit();
    ```

- **Dual Commands**

  - Can either start the chain or be chained off an existing one

  ```JavaScript
  cy.contains()
  cy.screenshot()
  cy.scrollTo()
  cy.wait()
  ```

### Selectors

Cypress will automatically calculate a unique selector to use targeted element

- `data-cy`, `data-test`, `data-testid`
- `id`, `class`, `tag`, `attributes`, `nth-child`

You can control how a selector is determined using `Cypress.SelectorPlayground` API

Example:

```HTML
<button
  id='main'
  name='submission'
  role='button'
  data-cy='submit'
>
  Submit
</button>
```

Ways to interact with the button component

```JavaScript
cy.get('button').click();             // bad
cy.get('.btn.btn-large').click();     // bad
cy.get('#main').click();              // bad
cy.get('[name=submission]').click();  // bad
cy.contains('submit').click();        // good
cy.get('[data-cy=submit]').click();   // good
```

> Use `data-*` attributes to provide context to your selectors and isolate them from CSS or JS changes.

```HTML
export function Sessions() {
    const [day, setDay] = useState('');
    return (
        <>
            <section className="banner">
                <div className="container">
                    <div className="row" style={{ padding: 10 }}>
                        <Link className="btn btn-lg center-block" to={`/conference/sessions/new`}>
                            Submit a Session!
                        </Link>
                    </div>
                    <div className="row">
                        <button type="button" onClick={() => setDay('All')} className="btn-oval" data-cy="AllSessions">
                            All Sessions
                        </button>
                        <button
                            type="button"
                            onClick={() => setDay('Wednesday')}
                            className="btn-oval"
                            data-cy="Wednesday"
                        >
                            Wednesday
                        </button>
                        <button
                            type="button"
                            onClick={() => setDay('Thursday')}
                            className="btn-oval"
                            data-cy="Thursday"
                        >
                            Thursday
                        </button>
                        <button type="button" onClick={() => setDay('Friday')} className="btn-oval" data-cy="Friday">
                            Friday
                        </button>
                    </div>
                    <SessionList day={day} />
                    {day === 'All' && <AllSessionList />}
                </div>
            </section>
        </>
    );
}
```

```JavaScript
/// <reference types="cypress"/>

describe('Sessions Page', () => {
    it('Should navigate to conference sessions page and view day filter buttons', async () => {
        cy.visit('/conference');
        cy.get('h1').contains('View Sessions').click();
        cy.url().should('include', '/sessions');

        cy.get('[data-cy=AllSessions');
        cy.get('[data-cy=Wednesday');
        cy.get('[data-cy=Thursday');
        cy.get('[data-cy=Friday');
    });
});
```

![](/assets/images/2022-07-05-18-50-40.png)

### Assertions

- [Cypress Assertions](https://docs.cypress.io/guides/references/assertions)

Cypress provides assertions from popular libraries like `Chai`, `Sinon`, and `jQuery` bringing you tons of powerful assertions out of the box.

#### Common Cypress Assertions

```JavaScript
cy.contains('[data-cy=day]', 'Wednesday').should('be.visible');
cy.url().should('include', '/sessions');
cy.get('[data-cy=sessionList]').should('have.length', 250);
cy.get('[data-cy=profile]').should('not.exist');
```

### Cypress Retry-ability

Cypress can efficiently test dynamic applications
Applications are asynchronous

- Smart commands wait for application to update
- If assertion following a DOM query command fails - Keep retrying until timeout
- No hard coding of waits in code

- **Cypress doesn't retry all the commands, only:**

  - `.get()`
  - `.find()`
  - `.contains()`
  - etc

> Commands that may change the state of application are not retried, e.g. `.click()`

> Only the last command before assertion is retried

![](/assets/images/2022-07-05-19-13-25.png)

### Aliases

We can define aliases using `.as()`

```JavaScript
cy.get('[data-cy=AllSessions').as('AllSessionsBtn');
cy.get('[data-cy=Wednesday').as('WednesdayBtn');
cy.get('[data-cy=Thursday').as('ThursdayBtn');
cy.get('[data-cy=Friday').as('FridayBtn');
```

To access an alias we use the `@` symbol

```JavaScript
cy.get('@AllSessionsBtn');
cy.get('@WednesdayBtn');
cy.get('@ThursdayBtn');
cy.get('@FridayBtn');
```

![](/assets/images/2022-07-05-19-25-00.png)

## Testing Network Requests

### Testing Network Requests Strategy

To test network requests, we have two approaches:

- One is to use `stub` response
  - We decide how the response should look like
  - This is essentially mocking or stubbing a response for testing purpose
- Other is to use actual server response

#### Stub Responses

- We can control every aspect of response (`body` status, `headers`, `delay`)
- It's extremely fast and reliable responses with no flakiness in tests (responses in less than 20 ms)
- Perfect for JSON responses
- No test coverage on some server endpoints

#### Server Responses

- True end-to-end tests that wait for a response from the server
- Great for traditional server-side HTML rendering
- Tests will be slower and unreliable (Needs to go through all the layers of the server)

> Network issues and connections failures are not in control of your Cypress test

#### Best Practice

- Use stubbed response tests more often for speed, simplicity, and reliability
- Don't use stubbed responses for server-side rendering architecture
- Avoid stubs for critical paths like `login`

### Intercept Command - cy.intercept()

The Cypress intercept command can be used for spying and stubbing the backend network calls.

The intercept command can statically define the response:

- body
- HTTP status code
- headers, and other response items

With this command, we can also stub the network response data from a fixture file that is placed in the fixture folder within Cypress.

Cypress enables us to declaratively wait for requests and responses using `cy.wait()`. To do this, we can use an alias command to give a name to the intercept call and wait on the alias route using the wait command.

- **Spying Request**

  - `cy.intercept()` can be used solely for spying.
  - It can passively listen for matching routes and apply aliases to them without manipulating the request or its response in any way.

  ```JavaScript
  cy.intercept('/users/**');
  ```

  ```JavaScript
  cy.intercept('GET', '/users/**');
  ```

  > By default Cypress uses the `GET` command

  ```JavaScript
  cy.intercept({ method: 'GET', url: '/users/**', hostname: 'localhost' });
  ```

- Example

```JavaScript
it('Should filter sessions and display only Wednesday sessions when Wednesday button is clicked', async () => {
    cy.intercept('POST', "http://localost:4000/graphql").as('getSessionInfo')
    cy.get('@WednesdayBtn').click();
    cy.wait('@getSessionInfo')

    // Retry
    cy.get('[data-cy=day]').should('have.length', 21);
    cy.get('[data-cy=day').contains('Wednesday').should('be.visible');
    cy.get('[data-cy=day').contains('Thursday').should('not.exist');
    cy.get('[data-cy=day').contains('Friday').should('not.exist');
});
```

### Stubbing With Intercept Command

#### Stubbing empty responses

- Pass an empty response to `cy.intercetp()`

  ```JavaScript
  cy.intercept(
    {
      method: 'GET',   // Route all GET requests
      url: '/users/*'  // that have a URL that matches '/users/*'
    },
    []                 // and force to response to be: []
    ).as('getUsers');  // and assign an alias
  ```

#### Stubbing Response

- Pass a response to `cy.intercept()`
- Sub the headers, status code, and body all at once

  ```JavaScript
  cy.intercept('/not-found',
    {
      statusCode: 404,
      body: '404 Not Found!',
      headers: {
        'x-not-found': 'true'
      }
    })
  ```

#### Subbing Fixtures

- Stub network requests and have it respond instantly with fixture data
- Cypress allows you to integrate fixture syntax directly into responses

  ```JavaScript
  cy.intercept('GET', '/activities/*', { fixture: 'activities.json' }).as('getActivities');
  cy.intercept(       '/messages/*',   { fixture: 'messages'        }).as('getMessages');

  // visit the dashboard, which should make requests that match the two routes above
  cy.visit('http://localhost:8888/dashboard');

  // Pass an array of routes aliaes that forces Cypress to wait until it sees a
  // response for each reques that maches each of these aliases
  cy.wait(['@getActivities', '@getMessages']);

  // This command will not run until the wait command resolves above
  cy.get('h1').should('contain', 'Dashboard');
  ```

### Request Command - cy.request()

- Makes an HTTP request. Request reaches your server
- `cy.request()` requires that the server sends a response. It can timeout waiting for the server response
- `cy.request()` will only run assertions you have chained once and will not retry

#### Server Response

- Cypress uses the `GET` method by default
- Alias the request and validate the response from the server

```JavaScript
cy.request('https://jsonplaceholder.cypress.io/comments').as('comments');

cy.get('@comments').should((response) => {
  expect(response.body).to.have.length(500);
  expect(response).to.have.property('headers');
  expect(response).to.have.property('duration');
});
```

This command is not used widely since most of the test cases can be done using the intercept command. This is sparingly used if you want to test the call to a server before seeding a database as a sanity check.

## Exploring Cypress Ecosystem

### Screenshots and Videos

Cypress automatically will create videos in headless mode. We can disable that in `cypress.json`

```JSON
{
  "baseUrl": "http://localhost:1337",
  "video": false
}
```

#### Screenshot

Cypress will automatically generate screenshots from failures. But we can force to take a screenshot using `cy.screenshot()`

### Custom Commands

Inside the `support` folder, we can insert our custom commands (shareable commands)

```JavaScript
Cypress.Commands.add('dataCy', (value) => {
    return cy.get(`[data-cy=${value}]`);
});
```

### Cross-browser Support

- [Cypress Cross Browser Testing](https://docs.cypress.io/guides/guides/cross-browser-testing#Continuous-Integration-Strategies)

Run a different browser using the headless mode

```Bash
cypress run --browser firefox
```

### Plugins

- [Cypress Plugins](https://docs.cypress.io/plugins/directory)

- Plugins in Cypress enable you to tap into, modify, or extend the internal behavior of Cypress.
- You can write your own custom code that executes during Cypress stages
- This also allows you to execute code using your node version by setting the configuration.
- You can alter the configuration and environment variables
- You can customize how the code is transpiled and sent to browser
- Plugins allow you to customize the `Babel` settings and add your own plugins, and even swap out Browserify that Cypress uses, to maybe `Webpack`
- Using Cypress task command, you can write code in Node that is not possible within the browser.

  - It allows you manipulate databases, Node, and other customizations as well

- Example

  ```JavaScript
  // export a function
  module.exports = (on, config) => {
      on('<event>', (arg1, arg2) => {
          // plugin stuff here
      })
  }
  ```

  - `on` is used to hook into various events that Cypress emits
  - `config` is the resolved Cypress config.

### TypesScript Support

To use TypesScript you need to create a `tsconfig.json` in the root of your project.

```JSON
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress"]
  },
  "include": ["**/*.ts"]
}
```

![](/assets/images/2022-07-05-21-53-47.png)
