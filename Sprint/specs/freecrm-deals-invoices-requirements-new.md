# FreeCRM Deals and Invoices Requirements

## 1. Purpose

This document defines the requirements for testing the FreeCRM login, Deals, and Invoices pages. It is written for Requirement Analysis and Test Case Design.

The final Test Case document must contain fewer than 16 meaningful cases. Test cases must be created separately in the approved Excel template and must not be created by splitting every field, browser, or button into a separate case.

## 2. Scope

### In scope

- Login and protected-page access
- Navigation between Deals and Invoices
- Active-session behavior during normal navigation and refresh
- Deals list, empty state, search/filter, actions, and Deal creation
- Invoices list, columns, empty state, pagination, and Invoice Create entry
- Required-field validation and secure test-data handling
- Reproducible bug investigation for the two target pages

### Out of scope

- Other CRM modules
- Billing plans and account administration
- API, load, performance, and localization testing
- Jira issue creation for this run
- Any credentials written in requirements, workbooks, screenshots, logs, or reports

## 3. Epics and user stories

| Issue Type | Summary | Priority |
|---|---|---|
| Epic 1 | FreeCRM access, navigation, and data safety | High |
| Story 1 | As a user, I want to sign in and move between protected FreeCRM pages so that I can use the CRM securely. | High |
| Epic 2 | Deal management | High |
| Story 2 | As a sales user, I want to view and create Deals so that I can track sales opportunities. | High |
| Epic 3 | Invoice management | High |
| Story 3 | As an operations user, I want to view Invoices and open the Invoice Create flow so that I can review and manage billing information. | High |

## 4. Observed application behavior

The following behavior was observed from the authenticated FreeCRM account and saved page evidence:

- Unauthenticated access to protected pages redirects to the login page.
- The authenticated navigation contains Deals at `/deals` and Invoices at `/invoices`.
- The authenticated shell contains global Search and user navigation.
- A first-run `Welcome aboard!` setup dialog and a notification prompt can appear after login. They must be dismissed or handled before page navigation is tested.
- The Deals page displays a Deals heading, Refresh, Export, List view, Board view, an empty-state area, and pagination controls when no records exist.
- The Deals page empty state displays `No records found` when the account has no Deal records.
- The Deal Create form displays a required Title field and observed fields including Close Date, Tags, Description, Probability, Amount, Commission, Stage, Closed, Status, Next Steps, Type, Source, and Identifier.
- The Deal Create form has a Save action. The form must reject a missing required Title.
- The Invoices page displays an Invoices heading, Settings, Create, a table, and pagination controls.
- The observed Invoice table columns are Number, Deal, Company, Issue date, Due date, Paid at, and Total.
- The Invoices empty state displays `No records found`, with Previous and Next disabled when there is no other page.
- The Invoice Create form fields and validation rules were not fully captured and must be confirmed before detailed Invoice-entry automation is approved.

## 5. Functional requirements

### Access and navigation

**REQ-001: Protected page access**

The system shall redirect an unauthenticated user to the login page when the user opens `/deals` or `/invoices` directly.

**REQ-002: Valid login**

The system shall allow a user with valid credentials to sign in and reach the authenticated FreeCRM area.

**REQ-003: Protected navigation**

An authenticated user shall be able to navigate between Deals and Invoices without being returned to the login page.

**REQ-004: Active-session refresh**

Refreshing a protected page during an active session shall keep the user authenticated. Session-expiry behavior is out of scope until its timeout and expected result are defined.

**REQ-005: Transient overlay handling**

Onboarding or notification overlays shall not permanently prevent normal authenticated navigation. The test flow shall handle such overlays before asserting page behavior.

### Deals

**REQ-006: Deals page display**

The Deals page shall display its heading and the available primary controls without a broken layout.

**REQ-007: Deals empty state**

When no Deal records exist, the page shall display a clear empty state and keep the page usable.

**REQ-008: Deals search and filter**

When Deal data exists, supported search or filter controls shall return matching records. Clearing the search or filter shall restore the default list view.

**REQ-009: Deals actions**

Available Deals actions, including refresh, export, list/board view, target, and create actions, shall produce an observable result, navigation, dialog, form, or message. Exact message wording shall not be invented.

**REQ-010: Deal creation fields**

The Deal Create flow shall expose the observed fields needed for a valid Deal. Title shall be treated as required. Other required fields and allowed values shall be recorded from the live form before detailed data-driven cases are finalized.

**REQ-011: Deal validation**

Submitting a Deal without the required Title or with invalid/incomplete data shall show validation feedback and shall not save a new record.

**REQ-012: Deal persistence**

Submitting valid Deal data once shall save one Deal that can be found again. Repeated submission shall not create an unintended duplicate.

### Invoices

**REQ-013: Invoices page display**

The Invoices page shall display its heading, Settings, Create, table, and pagination controls without a broken layout.

**REQ-014: Invoice table fields**

The Invoice list shall display Number, Deal, Company, Issue date, Due date, Paid at, and Total columns.

**REQ-015: Invoice empty state**

When no Invoice records exist, the page shall display `No records found`.

**REQ-016: Invoice pagination boundary**

When there is no second page, Previous and Next shall be disabled. Multi-page behavior requires controlled Invoice data.

**REQ-017: Invoice Create access**

A user with the required permission shall be able to open the Invoice Create flow from the Invoices page. The required permission and behavior for a disallowed role must be confirmed before negative authorization coverage is finalized.

**REQ-018: Invoice form rules**

Before Invoice-entry automation is finalized, the fields, required values, defaults, allowed values, date rules, amount rules, relationship rules, and validation messages shall be documented from the live Create form.

**REQ-019: Invoice validation and persistence**

After the Invoice form rules are confirmed, invalid Invoice data shall be rejected and valid Invoice data shall be saved once without unintended duplicates.

### Security and evidence

**REQ-020: Secret handling**

Credentials shall be loaded from the ignored `.env` file or an approved secret store. They shall not appear in requirements, Excel workbooks, source code, screenshots, logs, Allure results, or reports.

**REQ-021: Reproducible defect evidence**

A behavior shall be reported as a product bug only when it is reproducible, has a clear expected result, and includes evidence such as a screenshot, URL, console error, network evidence, or repeatable steps. Environment, locator, timeout, and missing-data issues shall be classified separately.

## 6. Testability and test-case design rules

The Test Case agent shall create fewer than 16 cases directly from this document and the approved Test Plan.

The cases should combine related behavior into practical checks, for example:

- One protected-access case may cover both Deals and Invoices.
- One authenticated-navigation case may cover Deals, Invoices, and active-session continuity.
- One Deals smoke case may cover the heading, controls, and empty state.
- One Deal validation case may cover missing Title and invalid submission.
- One Invoice list case may cover the heading, table columns, empty state, and single-page pagination.
- Invoice-entry cases must remain blocked or manual until the Invoice Create form is documented.

Each case must contain a clear precondition, test condition, numbered steps, test data, expected result, requirement reference, priority, and execution fields. The final workbook must use `C:/Users/sahikuma/Downloads/Test template 39.xlsx` and contain fewer than 16 data rows.

## 7. Test-data requirements

- A valid account loaded from `.env` or a secret store.
- A signed-out browser context for protected-route checks.
- A controlled zero-record state for Deals and Invoices where empty-state checks are required.
- A controlled Deal dataset for search, validation, creation, and duplicate checks.
- A unique Deal title and valid field values for persistence testing.
- An authorized Invoice user for the Create entry-point check.
- Invoice form data only after the live Invoice Create fields and rules are confirmed.

## 8. Automation and reporting requirements

- Automation shall use the existing TypeScript, Cucumber, Playwright, and Page Object Model framework.
- Each automated Test Case ID shall tag exactly one Scenario, never an entire Feature containing multiple scenarios.
- Automation shall not guess selectors or direct routes. Missing verified locators shall be reported as blocked.
- Test execution shall run a preflight for environment variables, locator evidence, test data, and tag mapping before opening the browser.
- Before every execution, old `allure-results`, `allure-report`, Cucumber reports, and failure screenshots shall be removed. A locked cleanup shall block the run.
- Allure shall be generated only from the current cleaned `allure-results` directory.
- Requirement, Test Case, RTM, execution, and summary artifacts shall be compared with existing files before replacement. The user shall be offered `Keep Previous`, `Keep New`, or `Review Differences`.

## 9. Known limitations and bug status

- The browser inspection bridge was not available for a new exploratory session during this reset. Existing authenticated page snapshots were used as evidence.
- The onboarding and notification overlays were observed as test-flow interference, not confirmed product defects.
- The supplied Create and Save locators must be verified during execution before Deal creation is considered covered.
- No confirmed FreeCRM product bug has been established. Suspected behavior must be reproduced before a bug report is created.

## 10. Acceptance criteria

The requirements are ready for Test Case Design when:

1. The three epics and three broad stories remain unchanged unless the user approves a scope change.
2. The Test Case workbook contains fewer than 16 structured cases using the supplied template.
3. Every case maps directly to one or more REQ IDs.
4. No case is created only because of a separate browser, field, button, or repeated data value.
5. Invoice-entry cases identify their dependency on confirmed form rules.
6. Any suspected bug is either reproduced with evidence or recorded as an open investigation, never as an invented defect.
7. Credentials remain outside all committed artifacts.
