# Playwright Flakiness Report

## Overall Assessment

**Flakiness probability: High**

The UI suite depends on the live `https://phptravels.net/` site and recorded 5 failures in the latest 19-test run. The result file contains no retry or repeat evidence (`retry: 0`, `repeatEach: 1`, local retries disabled), so intermittent behavior is not proven. However, the suite has substantial latent flakiness risk from live network content, overlays, broad locators, hidden controls, and weak synchronization.

## Observed Risks

| Test area | Probability | Evidence | Recommended fix |
|---|---|---|---|
| `content-consistency.spec.ts` | High | Property-card selector depends on live card markup and dynamic price text; no matching visible card was found. | Use a stable property-region locator or test id and assert named content within that region. |
| `flight-search-validation.spec.ts` | High | Generic input/date selectors can resolve to hidden or readonly controls from another panel. | Scope all controls to the visible Flights tabpanel and use date-picker interactions instead of filling readonly inputs. |
| `hotel-search-boundaries.spec.ts` | High | Hotel date selectors can resolve to readonly controls; submission depends on dynamic form state. | Scope to the visible Stays tabpanel, wait for the picker state, and assert field-level validation. |
| `hotel-search-positive.spec.ts` | High | Broad submit/input locators and live search/navigation behavior caused timeouts and page-close errors. | Use a specific visible submit control and wait for the expected URL, response, or results region. |
| `hotel-search-validation.spec.ts` | High | Several invalid scenarios mutate one page and assert against the whole body. | Isolate scenarios with fresh pages and target specific validation messages. |
| `support-and-app-links.spec.ts` | Medium | Contact text can match a contact-page link while the test expects a `mailto:` URL. | Select email links by `href` or accessible name and test phone/contact-page contracts separately. |

## Latent Flakiness Patterns

- **External network dependency:** Every UI test navigates to the live PHPTravels site. Availability, CDN behavior, rate limiting, dynamic data, and third-party scripts can change results.
- **Overlay timing:** The site displays `#demoWarningModal`; tests must dismiss it before interaction. Removing it with `evaluate()` bypasses the real close interaction and animation.
- **Unstable locators:** Many tests use broad selectors such as `button, a`, `.first()`, `.nth()`, text unions, or class-name fragments. Hidden navigation links and unrelated footer controls can be selected.
- **Hidden and readonly controls:** Generic `input` and date selectors have matched hidden destination fields and readonly date display fields.
- **Weak synchronization:** Tests commonly assert whole-page text rather than waiting for a specific panel, result region, validation message, URL, or response.
- **Conditional skips:** `if (await locator.count())` and swallowed errors such as `.catch(() => undefined)` can skip setup and still allow a test to pass without exercising its intended behavior.
- **Parallel external traffic:** `fullyParallel: true` runs four workers against the same external site. This can amplify rate limiting and timing variability.
- **No measured repetition:** Local retries are disabled and the recorded run used one attempt per test. Actual flake rate has not been measured.

## Locator Improvement

1. Prefer `[role="tab"]`, visible `[role="tabpanel"]`, accessible labels, and stable `data-testid` attributes.
2. Scope every form control to the active tabpanel.
3. Avoid `.first()` and `.nth()` when a semantic label or unique attribute is available.
4. Use `:visible` and exclude `[readonly]` when filling editable fields.
5. Separate contact-page, email, phone, App Store, and Google Play link contracts by `href`.
6. Assert selected tab state with `aria-selected` and assert the corresponding panel state.

## Synchronization Improvement

1. Wait for the active panel and its required control before interacting.
2. For searches, wait for a specific results URL, response, or results container instead of generic body text.
3. For validation, wait for the field-level error message or invalid state.
4. Interact with date-picker triggers and select dates through the picker; do not fill readonly date display inputs.
5. Prefer real modal dismissal through its close button when the site provides one. If removal remains necessary, wait for the overlay to be attached and stable first.
6. Avoid fixed sleeps; none were found in the current suite.

## Test Isolation Improvement

- Split multi-scenario validation tests into independent tests or reload between scenarios.
- Mock external search, AI, and failure-state APIs where the behavior under test is deterministic.
- Use a controlled fixture or local environment for stable content assertions.
- Run repeated tests to measure flakiness after stabilization:

```powershell
npx playwright test tests/ui --repeat-each=5 --retries=1 --workers=1
```

## Configuration Notes

`playwright.config.ts` uses `fullyParallel: true`, four workers, a 30-second test timeout, and zero local retries. The live-site dependency makes this configuration more vulnerable to transient failures. For diagnostic runs, use one worker and repetitions; for CI, retain retries only after the tests have deterministic assertions.
