# Playwright Test Execution Report

## Test Execution Summary

| Metric | Result |
|---|---:|
| Total Tests | 22 |
| Passed | 16 |
| Failed | 6 |
| Skipped | 0 |
| Flaky | 0 |
| Retries | 0 |
| Duration | 121.7 seconds |
| Pass % | 72.73% |
| Failure % | 27.27% |

**Formulas**

- Pass % = Passed / Total x 100 = 16 / 22 x 100 = **72.73%**
- Failure % = Failed / Total x 100 = 6 / 22 x 100 = **27.27%**

The run was not a zero-test run, so percentage calculations were performed normally.

## Failed Tests

1. `content-consistency.spec.ts` - Branding and content consistency
2. `flight-search-validation.spec.ts` - Flight search rejects invalid criteria
3. `hotel-search-boundaries.spec.ts` - Hotel guest and room boundaries are handled
4. `hotel-search-positive.spec.ts` - Hotel search accepts valid booking criteria
5. `hotel-search-validation.spec.ts` - Hotel search validates missing and invalid criteria
6. `support-and-app-links.spec.ts` - Support and app links use correct destinations

## Root Cause Summary

- Tests depend on the live PHPTravels site, whose content and controls are dynamic.
- Several tests use broad selectors such as `.first()`, `.nth()`, global `input`, and text unions.
- Hotel and flight flows can resolve hidden or readonly controls, especially date fields.
- Some tests mutate multiple validation scenarios in one page, increasing state contamination risk.
- Support-link assertions can select a contact-page link while expecting an email or phone URL.
- Whole-page text assertions are less precise than field-level validation or results-region assertions.

## High Risk Areas

- Hotel search positive, boundary, and validation flows.
- Flight validation flow.
- Dynamic homepage property/content checks.
- Support and app-link destination checks.
- Parallel execution against the external PHPTravels environment.

## Application Defects

No confirmed application defect can be isolated from this run alone. The failures primarily indicate unstable test assumptions and live-site variability. The PHPTravels site may also have dynamic or inconsistent content that should be investigated separately with network and browser evidence.

## Automation Problems

- Unscoped locators select hidden navigation elements or unrelated controls.
- Optional `count()` guards can skip required test actions without failing clearly.
- Date inputs are treated as editable even when the application renders them readonly.
- Assertions often target the entire page body instead of the specific expected state.
- The suite runs with `fullyParallel: true` against a live external site.
- Local retries and repeated execution are disabled, so actual flake rate is not measured.

## Recommendations

1. Scope controls to the visible active `[role="tabpanel"]`.
2. Replace `.first()` and `.nth()` with accessible names or stable test ids.
3. Interact with date-picker controls instead of filling readonly date displays.
4. Split multi-scenario validation tests into isolated tests or reload between scenarios.
5. Replace whole-body assertions with URL, response, result-container, and field-error assertions.
6. Require mandatory controls instead of silently skipping when `count()` is zero.
7. Mock deterministic external responses or run against a controlled environment.
8. Measure repeatability with `npx playwright test --repeat-each=5 --retries=1 --workers=1`.

## Overall Quality Status

**RED**

The suite has meaningful coverage, but the **27.27% failure rate** and concentration of failures in core booking and validation workflows make the current execution unsuitable as a reliable release signal. Fix the locator and environment issues, then rerun the suite with repetition to distinguish deterministic automation defects from true application failures.

## Source Reports

- [Playwright flakiness report](playwright-flakiness-report.md)
- [Playwright code review](playwright-code-review.md)
- [Raw Playwright results](../test-results/results.json)
