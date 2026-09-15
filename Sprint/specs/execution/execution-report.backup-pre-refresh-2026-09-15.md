# Test Execution Report

## Scope

- Date: 2026-09-15
- Framework: BDD + Cucumber + Playwright
- Selected test cases only: TC-001, TC-002, TC-003, TC-004
- Tag filter executed: `@TC-001 or @TC-002 or @TC-003 or @TC-004`
- Environment source: current `.env` runtime configuration loaded by the framework

## Preflight

- Required runtime variables present: `FREECRM_BASE_URL`, `FREECRM_EMAIL`, `FREECRM_PASSWORD`
- Selected tags found in feature files
- Exact-tag Cucumber dry-run: passed
- Allure CLI availability: passed (`2.43.0`)

## Cleanup

- Removed prior generated outputs before execution:
  - `allure-results/`
  - `allure-report/`
  - `test-results/cucumber-report.json`
  - `test-results/cucumber-report.html`
  - `test-results/screenshots/`
- Cleanup status: passed

## Compile

- Command: `npx tsc --noEmit`
- Result: passed
- Exit code: `0`

## Cucumber Execution

- Command: `npx cucumber-js --tags "@TC-001 or @TC-002 or @TC-003 or @TC-004"`
- Result: completed with non-zero exit
- Exit code: `1`

### Actual execution counts

- Scenarios: `4`
- Steps: `25`
- Passed steps: `21`
- Ambiguous steps: `2`
- Skipped steps: `2`
- Failed steps: `0`
- Undefined steps: `0`

Note: the four selected scenarios contain 17 explicit Gherkin steps. The machine-readable report count of 25 includes framework-recorded execution steps beyond the visible Gherkin lines.

### Per-scenario results

| Test Case | Scenario | Result | Step details |
| --- | --- | --- | --- |
| TC-001 | Unauthenticated user opening Deals and Invoices is redirected to login | Blocked by automation ambiguity | 2 passed, 2 ambiguous, 2 skipped |
| TC-002 | Valid user can sign in and clear transient overlays | Passed | 4 passed |
| TC-003 | Authenticated user navigates between Deals and Invoices and stays authenticated after refresh | Passed | 9 passed |
| TC-004 | Deals page renders its primary controls and remains usable in the observed state | Passed | 6 passed |

## Allure Report

- Generation command: `npx allure generate .\allure-results --clean -o .\allure-report`
- Generation status: passed
- Report summary from current run only:
  - Total: `4`
  - Passed: `3`
  - Skipped: `1`
  - Failed: `0`
  - Broken: `0`
  - Duration: `27151 ms`

## Generated Artifacts

- `allure-results/`
- `allure-report/`
- `allure-report/index.html`
- `allure-report/widgets/summary.json`
- `test-results/cucumber-report.json`
- `test-results/cucumber-report.html`

## Additional Observations

- `test-results/screenshots/` was not recreated by this run.
- No application assertion failure was recorded in the selected scope.

## Execution Verdict

Execution is **not approved as fully passing** because Cucumber exited with code `1`.

The non-zero exit was caused by ambiguous step-definition resolution in TC-001, not by a product assertion failure in the application under test.