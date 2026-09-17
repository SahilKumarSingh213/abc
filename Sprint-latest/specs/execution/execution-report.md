# Test Execution Report

## 1. Execution Summary
- **Execution Date**: 2026-09-17
- **Browser**: Google Chrome (Channel: `chrome` on Windows)
- **Headless Mode**: `false` (Configured via `.env`)
- **Total Executed**: 4 | **Passed**: 4 (100%) | **Failed**: 0 | **Blocked**: 0

## 2. Detailed Scenario Results

| Test Case ID | Scenario Name | Result | Duration | Notes / Evidence |
|---|---|---|---|---|
| TC-002 | Valid user can sign in and clear transient overlays | PASS | 4.8s | Screenshot attached: `Valid-user-can-sign-in-and-clear-transient-overlays-passed.png` |
| TC-003 | Authenticated user navigates between Deals and Invoices and stays authenticated after refresh | PASS | 6.2s | Screenshot attached: `Authenticated-user-navigates-between-Deals-and-Invoices-and-stays-authenticated-after-refresh-passed.png` |
| TC-008 | Invalid deal submission is rejected | PASS | 5.1s | Screenshot attached: `Invalid-deal-submission-is-rejected-passed.png` |
| TC-009 | Valid deal is saved once and can be found again | PASS | 7.9s | Screenshot attached: `Valid-deal-is-saved-once-and-can-be-found-again-passed.png` |

## 3. Artifacts Generated
- Allure HTML Report: `allure-report/index.html`
- Cucumber HTML Report: `test-results/cucumber-report.html`
- Screenshot Directory: `test-results/screenshots/`
