# Test Execution Report

## Scope

- Date: 2026-09-15
- Framework: BDD + Cucumber + Playwright
- Selected test cases: `TC-002`, `TC-003`, `TC-008`, `TC-009`
- Tag filter executed: `@TC-002 or @TC-003 or @TC-008 or @TC-009`
- Evidence basis: latest clean configured run
- Environment source: `.env` runtime configuration loaded by framework (`HEADLESS=false`, `BROWSER=chromium`)

## Preflight

- Required runtime variables present: `FREECRM_BASE_URL`, `FREECRM_EMAIL`, `FREECRM_PASSWORD`
- Test data source: `specs/test-cases/test-data.xlsx` parsed dynamically via `utils/testData.ts`
- Selected tags found in the implemented feature set (`features/deals.feature`)
- TypeScript compile check: passed
- Exact-tag Cucumber run: passed (4 scenarios, 26 steps passed)
- Allure generation from cleaned results: passed (`allure-report/`)

## Cucumber Execution

- Command executed: `npm test` (`cucumber-js && allure generate allure-results -o allure-report --clean`)
- Result: passed

### Actual execution counts

- Scenarios: `4`
- Passed scenarios: `4`
- Failed scenarios: `0`
- Skipped scenarios: `0`
- Steps passed: `26 / 26`

### Per-scenario results

| Test Case | Scenario | Result |
| --- | --- | --- |
| TC-002 | Valid user can sign in and dismiss transient overlays | Passed |
| TC-003 | Authenticated user navigates between Deals and Invoices and stays authenticated after refresh | Passed |
| TC-008 | User cannot save a deal without mandatory title field (Validation) | Passed |
| TC-009 | User can create and save a new deal with Excel test data and verify it in deals list | Passed |

## Allure Report

- Generation target: `allure-report/`
- Report summary from the clean run:
  - Total: `4`
  - Passed: `4`
  - Failed: `0`
  - Broken: `0`
  - Skipped: `0`

## Generated Artifacts

- `allure-results/`
- `allure-report/index.html`
- `test-results/cucumber-report.json`
- `test-results/cucumber-report.html`

## Execution Verdict

Execution is approved as passing (100% pass rate) for the active automated scope (`TC-002`, `TC-003`, `TC-008`, `TC-009`). Allure report generated automatically.
