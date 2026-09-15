# FreeCRM Requirements

## 1. Purpose

This document contains the requirements for the FreeCRM login, Deals, and Invoices areas. The requirements are based on the pages observed in the application and are written as three broad user stories.

This document is for requirement analysis only. Test scenarios and the requested 12-15 test cases should be created separately from these requirements.

## 2. Scope

### In scope

- Login and protected-page access
- Navigation to Deals and Invoices
- Deals list, search/filter, actions, and create flow
- Invoices list, empty state, pagination, and create flow
- Basic validation, session, and permission checks

### Out of scope

- Other CRM modules
- Billing plans and account administration
- Real customer credentials or passwords

## 3. User stories

| Issue Type | Summary                                                                                                                              | Priority |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| Epic 1     | FreeCRM access, navigation, and data safety                                                                                          | High     |
| Story 1    | As a user, I want to sign in, move between FreeCRM pages, and receive safe validation so that I can use the application securely.    | High     |
| Epic 2     | Deal management                                                                                                                      | High     |
| Story 2    | As a user, I want to view and create Deals so that I can track sales opportunities.                                                  | High     |
| Epic 3     | Invoice management                                                                                                                   | High     |
| Story 3    | As a user, I want to view and create Invoices so that I can track billing information.                                               | High     |

## 4. Acceptance criteria

### Access and navigation

- An unauthenticated user is sent to the login page when opening `/deals` or `/invoices`.
- Valid login opens the authenticated FreeCRM area.
- The user can navigate to Deals and Invoices without losing the session.
- Refreshing an active session keeps the user signed in, unless the session has expired.

### Deals

- The Deals page displays its heading and main controls.
- The page shows a clear empty message when there are no records.
- Search or filter controls return matching records and support clearing the search.
- Refresh, export, pipeline, target, and create actions show suitable results or messages.
- The Deal create form has a required title and supports the observed deal fields.
- Invalid or incomplete data shows a validation message and is not saved.
- A valid Deal is saved once and can be found again.

### Invoices

- The Invoices page displays its heading, Settings, Create, table, and pagination controls.
- The table shows Number, Deal, Company, Issue date, Due date, Paid at, and Total.
- The page shows `No records found` when there are no invoices.
- Previous and Next are disabled when there is no other page to open.
- The Create action opens the invoice form for an allowed user.
- The invoice form rules, required fields, and allowed values are confirmed before test automation is written.
- Invalid invoice data is rejected and valid data is saved once.

## 5. Notes for requirement analysis

- The Deals and Invoices list pages were observed with an authenticated account and initially had no records.
- The Deals create flow and its visible fields were observed.
- The Invoice list page was observed. The Invoice Create form still needs to be opened and documented before invoice-entry test cases are finalized.
- Existing-record edit and delete behavior needs test data and permission confirmation.
- Test credentials must be passed through a secure environment variable or secret store. They must not be written in this document or in test reports.

## 6. QA handoff and Allure reporting

- Requirement analysis identifies testable behavior from these stories. The Test Case stage creates fewer than 16 structured test cases directly from the approved requirements and test plan.
- Test execution records the result of every test and generates the Allure report with screenshots, traces, and failure details where available.
- Test summary and review use the Allure report together with the defect report and traceability matrix to prepare the final test summary.
- The Allure report is an execution deliverable; it is not part of the requirements or user stories.

## 7. Suggested requirement-analysis output

For each story, the requirement analysis should provide:

1. Requirement ID
2. Business rule or expected behavior
3. Acceptance criteria
4. Test scenario references
5. Required test data
6. Open questions or assumptions

Test scenarios, detailed test steps, test data, expected results, execution status, defects, RTM, and summary reports should be maintained in their own workflow or template sheets.
