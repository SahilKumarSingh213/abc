# Test Plan

## 1. Introduction & Objectives
This Test Plan outlines the testing strategy, test levels, tools, and entry/exit criteria for the FreeCRM application based on the approved requirement analysis. The primary goal is to validate user authentication, protected navigation, Deals lifecycle (validation and creation), Invoices display, and UI resilience against transient overlays.

## 2. Test Scope

### In Scope
- Login authentication, session handling, and protected route access control (`/deals`, `/invoices`).
- Cross-page navigation and active-session persistence across browser refresh.
- Deals module: Landing page rendering, primary controls, empty-state text, form validation (missing required Title), and valid deal creation & persistence.
- Invoices module: Landing page rendering, table column structure, empty state, pagination state, and Create button accessibility.
- Transient UI resilience: Dismissal of onboarding dialogs, OneSignal network blocking, and auto-handling of native browser alerts.
- Automated BDD test execution with Allure reports and full-page screenshots for every test case.

### Out of Scope
- Unrelated CRM modules (Contacts, Companies, Cases, Tasks, Calendar).
- Backend database performance, API load/stress testing, and localization.
- Billing payment gateway integrations.

## 3. Testing Approach & Levels
- **Smoke / Access Control Testing**: Quick validation of unauthenticated route redirection and basic page rendering.
- **Functional & UI Testing**: Form interaction, input validation error checking, table inspection, and navigation flows.
- **BDD Automation**: High-value scenarios implemented in TypeScript with Playwright and Cucumber BDD.
- **Cross-Browser & Execution Modes**: Support for Headed/Headless execution on Chromium, Firefox, and WebKit.

## 4. Test Environment & Prerequisites
- **Target Application**: FreeCRM (`https://ui.freecrm.com`)
- **Environment Configuration**: Stored securely in `.env` (`FREECRM_BASE_URL`, `FREECRM_EMAIL`, `FREECRM_PASSWORD`).
- **Toolstack**:
  - Runtime: Node.js, TypeScript (`ts-node`)
  - Test Runner: Cucumber BDD (`@cucumber/cucumber`)
  - Automation Engine: Playwright (`@playwright/test`)
  - Reporting: Allure (`allure-cucumberjs`, `allure-commandline`)

## 5. Entry & Exit Criteria
- **Entry Criteria**: Target web application is accessible; valid test credentials configured in `.env`; browser binaries installed.
- **Exit Criteria**: All selected automated test cases pass; zero high-severity defects open; complete Allure report and RTM generated.

## 6. Risks & Mitigation
- **Transient Modals**: Intermittent "Welcome aboard!" popups mitigated using non-blocking conditional `if` checks in Page Objects.
- **Intrusive Third-Party Scripts**: OneSignal push notification prompts aborted at the browser network route level in `hooks.ts`.
- **Dynamic Elements**: Semantic UI controls handled with Playwright auto-waiting instead of hardcoded sleeps.
