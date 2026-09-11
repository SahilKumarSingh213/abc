
# Project Master Prompt

## 1. Framework Overview

This project will automate key business flows in OrangeHRM using a Cucumber + Playwright + TypeScript framework. The design is based on behavior-driven testing, where business scenarios are written in readable Gherkin and mapped to browser actions through step definitions and page objects.

The goal is to validate real user journeys such as login, posting a message on the Buzz page, updating personal information, and searching for an employee in the Directory. The framework should keep the feature layer readable for QA, while all technical interaction with the browser remains in reusable automation classes.

## 2. BDD Framework Requirements

- Feature files will be stored under a dedicated features folder.
- Features will describe user behavior using Given/When/Then steps only.
- Scenarios will be written in business language and avoid technical implementation details.
- Reusable scenarios should be structured around common user journeys rather than page implementation.
- Feature files should be clear enough for business stakeholders and QA engineers to understand without reading code.
- Scenario Outline usage should be used where the same flow is validated with multiple data sets.

## 3. Test Architecture Requirements

The project will be organized as follows:

- features: business scenarios in Gherkin
- stepDefinitions: mapping from Gherkin steps to automation logic
- pages: page object classes for each application screen
- hooks: browser lifecycle management and failure handling
- support: runtime state shared across steps
- reports: generated JSON and HTML reports and screenshot artifacts

The framework must separate:

- business behavior
- test logic
- browser automation
- reporting
- cleanup

This keeps the automation maintainable and prevents scenarios from depending on UI internals.

## 4. Step Definition Requirements

Step definitions will translate Gherkin steps into Playwright actions. They should:

- use the current browser page from the shared world object
- call page object methods instead of implementing raw DOM logic
- accept dynamic values from scenario parameters
- handle reusable actions such as login, enter credentials, navigate, save, and verify

Steps should stay readable and should not expose internal locators or implementation details.

## 5. Page Object Model Requirements

Each page object will represent one functional screen or page area in OrangeHRM. Page objects will include methods for:

- opening the page
- navigating to modules
- filling forms
- selecting dropdowns
- interacting with date fields
- clicking buttons
- validating results

Page objects must:

- encapsulate locator logic
- expose business actions rather than technical selectors
- keep the test flow clean
- be reusable across multiple scenarios

## 6. Test Data Management Requirements

Test data will be passed directly through scenario steps and examples. The framework will support values such as:

- username and password
- post text
- first name, middle name, and last name
- nationality
- date of birth
- blood type
- employee search value

Each scenario should run independently with fresh data and no cross-scenario state leakage.

## 7. Hooks and Lifecycle Requirements

The framework will include hooks to manage lifecycle events.

Before each scenario:

- start the browser
- create a browser context
- open a new page
- expose browser/page objects to the test flow

After each scenario:

- close the page
- close the browser context
- close the browser
- ensure cleanup happens even if the scenario fails

If a scenario fails, a screenshot should be captured and saved to the reports folder for investigation.

## 8. Execution Requirements

The framework will be executed through the Cucumber runner.

Execution requirements:

- run feature files from the configured feature path
- load step definitions from the step definition folder
- initialize TypeScript support through ts-node
- generate console output and report artifacts
- support scenario-level reusability and local execution

The project should be able to run the same scenarios repeatedly without leftover browser state from previous runs.

## 9. Reporting Requirements

The framework will generate reports after execution:

- JSON report
- HTML report
- failure screenshots in the reports folder

Reporting must help QA quickly identify:

- what scenario failed
- which step failed
- the expected result
- the current failing state

## 10. Utility and Shared Component Requirements

The framework should include shared runtime support through a custom world object. This object will manage:

- browser instance
- browser context
- current page
- scenario execution state

This shared object will allow step definitions to access the same browser session during a scenario without duplicating setup logic.

## 11. Validation and Assertion Requirements

Validation in this framework should be done with Playwright assertions against real page state. Assertions should confirm:

- user is successfully logged in
- page content appears as expected
- a posted message is visible
- updated data is saved correctly
- employee search returns the expected person

Assertions must be performed against visible application behavior, not against mocked or synthetic values.

## 12. End-to-End Workflow Requirements

The complete execution flow should be:

1. Start browser session
2. Open OrangeHRM
3. Perform the required login or navigation step
4. Execute scenario actions through step definitions
5. Call page object methods for form interactions
6. Validate expected output
7. Capture failure screenshot when needed
8. Cleanup browser resources
9. Generate the report

This flow should be consistent across all scenarios and should not depend on manual execution.

## 13. Acceptance Criteria

### Login

Given the user opens the OrangeHRM login page
When valid credentials are entered
Then the system should navigate to the dashboard
And the login flow should be reusable for subsequent scenarios

### Buzz posting

Given the user is logged in
When the user opens the Buzz page
And posts a message
Then the message should be visible on the page
And the scenario should pass only when the result is confirmed

### My Info update

Given the user is logged in and on My Info
When personal details are entered and saved
Then the update should complete successfully
And the page should remain stable for the next step

### Directory search

Given the user is in the Directory module
When a valid employee name is searched
Then the matching employee should appear in the results
And the result should be confirmed through visible page content

### Reporting

Given a scenario fails
When execution reaches the failure point
Then the failure should be logged in the Cucumber output
And a screenshot should be stored in the reports folder

### Framework design

Given multiple scenarios share common actions
When those actions are implemented in page objects
Then the step definitions remain clean and readable
And the framework remains maintainable and scalable

This project is a Cucumber-based BDD automation framework for OrangeHRM, built around reusable page objects, shared world state, browser lifecycle hooks, and structured reporting. It is designed to validate real end-user workflows in a readable, maintainable, and reusable test automation architecture.
