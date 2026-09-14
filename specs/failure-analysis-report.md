# Playwright Failure Analysis Report

## Run Summary

- Total tests: 22
- Passed: 16
- Failed: 6
- Skipped: 0
- Flaky: 0 recorded
- Retries: 0
- Browser: Chromium
- Target: `https://phptravels.net/`
- Test timeout: 30 seconds

No retries or repeat runs were configured, so intermittent flakiness cannot be confirmed from this execution alone.

## Failed Test

### 1. Branding and content consistency

**Error**

`expect(locator).toBeVisible()` failed because no visible property card matched the selector containing dynamic price text.

**Root Cause**

The test depends on live homepage content, implementation-specific class fragments, and a dynamic price pattern. The expected property card was not found in the rendered DOM during this run.

**Failure Classification**

Locator Issue / Environment Issue

**Evidence**

- Locator: `article:visible, .card:visible, .property-card:visible, [class*="property"]:visible, [class*="card"]:visible`
- Failure: `element(s) not found`
- Source: `test-results/ui-content-consistency-*/error-context.md`

**Recommended Action**

Use a stable property-list region or test id and assert named property content within that region. Confirm the live homepage data is available before treating this as an application defect.

**Retry Recommended**

Yes, after locator stabilization.

**Bug Should Be Raised**

No.

### 2. Flight search rejects invalid criteria

**Error**

`locator.fill` exceeded the 30-second test timeout.

**Root Cause**

The validation flow uses broad input and date selectors. A hidden or readonly control can be selected instead of the active Flights form field.

**Failure Classification**

Locator Issue / Timing-Synchronization Issue

**Evidence**

- Failure: `locator.fill: Test timeout of 30000ms exceeded`
- The test uses `.first()`, `.nth()`, and global date selectors.
- Source: `test-results/ui-flight-search-validatio-*/error-context.md`

**Recommended Action**

Scope all fields to the visible Flights tabpanel. Use accessible field names and interact with date-picker controls instead of filling readonly date displays.

**Retry Recommended**

No, not before fixing the locator.

**Bug Should Be Raised**

No.

### 3. Hotel guest and room boundaries are handled

**Error**

`locator.fill` exceeded the 30-second test timeout.

**Root Cause**

The test selected a readonly or unrelated date input while attempting to exercise hotel date boundaries.

**Failure Classification**

Locator Issue / Timing-Synchronization Issue

**Evidence**

- Failure: `locator.fill: Test timeout of 30000ms exceeded`
- The test uses global date selectors instead of a scoped hotel form locator.
- Source: `test-results/ui-hotel-search-boundaries-*/error-context.md`

**Recommended Action**

Scope date controls to the visible Stays tabpanel and select dates through the date picker. Assert the resulting validation state on the hotel form.

**Retry Recommended**

No, not before fixing the locator.

**Bug Should Be Raised**

No.

### 4. Hotel search accepts valid booking criteria

**Error**

The click failed because the target page, context, or browser had already closed, after the test exceeded its timeout.

**Root Cause**

The test relies on broad form selectors and live-site navigation/search behavior. The evidence does not identify a product error or a stable application response.

**Failure Classification**

Timing-Synchronization Issue / Environment Issue

**Evidence**

- Failure: `locator.click: Target page, context or browser has been closed`
- Source: `test-results/ui-hotel-search-positive-*/error-context.md`

**Recommended Action**

Use a specific visible hotel submit control and wait for an expected URL, response, or results container. Run once with one worker to distinguish site instability from parallel-load effects.

**Retry Recommended**

Yes, after adding deterministic navigation/result synchronization.

**Bug Should Be Raised**

No.

### 5. Hotel search validates missing and invalid criteria

**Error**

The body did not contain the expected date or required-field validation text after submission.

**Root Cause**

The test mutates several validation scenarios on one page and asserts against the entire body. The expected message may be field-level, delayed, or absent because the preceding state was not established.

**Failure Classification**

Automation Script Defect / Timing-Synchronization Issue

**Evidence**

- Expected: `/date|check-in|check-out|required/i`
- Assertion target: `locator('body')`
- Source: `test-results/ui-hotel-search-validation-*/error-context.md`

**Recommended Action**

Split each invalid scenario into an isolated test or reload between scenarios. Assert the specific validation message or invalid field state.

**Retry Recommended**

No, not before isolating the scenario.

**Bug Should Be Raised**

No.

### 6. Support and app links use correct destinations

**Error**

The test expected a `mailto:` href but received `https://phptravels.net/page/contact-us`.

**Root Cause**

The text locator matched a visible Contact link, while the assertion assumed it was an email link. This is a test locator/contract mismatch, not proof that the contact-page link is incorrect.

**Failure Classification**

Automation Script Defect / Locator Issue

**Evidence**

- Expected: `/mailto:/i`
- Actual: `https://phptravels.net/page/contact-us`
- Locator: visible footer/content-info links filtered by `Email|Support|Contact`
- Source: `test-results/ui-support-and-app-links-*/error-context.md`

**Recommended Action**

Locate email links by `href^="mailto:"`, phone links by `href^="tel:"`, and contact-page links by their expected route. Clarify the product requirement if a mail link is mandatory.

**Retry Recommended**

No. The current failure is deterministic test logic.

**Bug Should Be Raised**

No.

## Overall Root Cause

The failed tests are primarily affected by broad and unscoped locators, hidden or readonly controls, live external content, parallel execution, and whole-page assertions. No failure currently demonstrates an application defect with a stable locator and explicit product requirement.

## Final Classification

- Application Defect: **Not confirmed**
- Automation Script Defect: **Confirmed for support-link assertion and several broad selectors**
- Locator Issue: **Confirmed**
- Test Data Issue: **Not indicated**
- Environment Issue: **Possible due to live external site and page closure**
- API/Network Issue: **Not confirmed from available evidence**
- Timing/Synchronization Issue: **Probable in form flows**
- Flaky Test: **Not proven because no retries or repeats were run**
- Unknown: **No unresolved product defect identified**

## Recommended Next Step

Fix the locators and isolate the validation scenarios, then run:

```powershell
npx playwright test tests/ui --repeat-each=5 --retries=1 --workers=1
```

Raise a product bug only if a failure reproduces with stable, semantic locators and the observed behavior contradicts a documented requirement.
