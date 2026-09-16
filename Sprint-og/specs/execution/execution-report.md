# Test Execution Report

## Scope

- Date: 2026-09-15
- Framework: BDD + Cucumber + Playwright
- Selected test cases only: `TC-001`, `TC-002`, `TC-003`, `TC-004`
- Tag filter executed: `@TC-001 or @TC-002 or @TC-003 or @TC-004`
- Evidence basis: latest clean configured run only
- Environment source: current `.env` runtime configuration loaded by the framework

## Preflight

- Required runtime variables present: `FREECRM_BASE_URL`, `FREECRM_EMAIL`, `FREECRM_PASSWORD`
- Selected tags found in the implemented feature set
- TypeScript compile check: passed
- Exact-tag Cucumber dry-run: passed
- Cleanup of prior generated execution outputs: passed
- Allure generation from cleaned results: passed

## Cucumber Execution

- Command executed for the selected suite: `npx cucumber-js --tags "@TC-001 or @TC-002 or @TC-003 or @TC-004"`
- Result: passed

### Actual execution counts

- Scenarios: `4`
- Passed scenarios: `4`
- Failed scenarios: `0`
- Skipped scenarios: `0`
- Undefined scenarios: `0`
- Ambiguous scenarios: `0`

### Per-scenario results

| Test Case | Scenario | Result |
| --- | --- | --- |
| TC-001 | Unauthenticated user opening Deals and Invoices is redirected to login | Passed |
| TC-002 | Valid user can sign in and clear transient overlays | Passed |
| TC-003 | Authenticated user navigates between Deals and Invoices and stays authenticated after refresh | Passed |
| TC-004 | Deals page renders its primary controls and remains usable in the observed state | Passed |

## Allure Report

- Generation target: `allure-report/`
- Report summary from the same cleaned run:
  - Total: `4`
  - Passed: `4`
  - Failed: `0`
  - Broken: `0`
  - Skipped: `0`
  - Duration: `33281 ms`

## Generated Artifacts

- `allure-results/`
- `allure-report/`
- `allure-report/index.html`
- `allure-report/widgets/summary.json`
- `test-results/cucumber-report.json`
- `test-results/cucumber-report.html`

## Additional Observations

- No failed, ambiguous, undefined, broken, or skipped outcomes are present in the selected clean run.
- No confirmed application defect was identified in this execution cycle.
- `test-results/screenshots/` was not required for this passing run.

## Execution Verdict

Execution is approved as passing for the current selected automation scope.

The latest clean configured run shows `TC-001` through `TC-004` passing in both Cucumber and Allure, with no open failure-analysis issue.
