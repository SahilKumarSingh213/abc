# Playwright Code Review

## Findings

| Severity | File | Problem | Recommendation |
|---|---|---|---|
| High | `tests/ui/hotel-search-positive.spec.ts` | Uses broad `input`, `select`, and `button` selectors plus `.first()`. The destination selector can select the wrong control, date inputs are not scoped to the active panel, and the submit locator can select an unrelated button. | Scope all controls to the visible Stays tabpanel and use accessible labels, stable names, or test ids. Assert the expected results URL or results region after submission. |
| High | `tests/ui/flight-search-positive.spec.ts` | Origin and destination use generic `input, select` locators with `.first()`, while date inputs are global. This can interact with hidden or unrelated controls. | Use the visible Flights tabpanel and semantic field locators. Select dates through the date-picker UI when the fields are readonly. |
| High | `tests/ui/hotel-search-validation.spec.ts` | Multiple invalid scenarios mutate the same page and conditionally skip actions when locators are absent. A test can pass without validating the intended state. | Split scenarios into independent tests or reload between them. Require expected controls with `toBeVisible()` and assert field-level validation messages. |
| High | `tests/ui/flight-search-validation.spec.ts` | Uses `.first()`, `.nth()`, and global date selectors for a multi-step validation flow. The test can target hidden or readonly fields. | Scope each field to the active panel, use explicit accessible names, and assert the invalid state on the specific field or form. |
| High | `tests/ui/ai-trip-planner.spec.ts` | Prompt and submit controls are selected from the entire page. Conditional `count()` checks allow the test to skip the core AI interaction. | Locate the AI tabpanel and require the prompt and submit controls. Assert a specific response, loading state, or validation message. |
| Medium | `tests/ui/content-consistency.spec.ts` | Property cards are identified through class fragments and dynamic price text. This is coupled to implementation details and live content. | Use a stable property-list region or test id and assert named properties or card count within that region. |
| Medium | `tests/ui/featured-destination-filters.spec.ts` | Destination buttons use a broad union selector and `.first()`. The property assertion is not strongly tied to the selected destination. | Use `getByRole('button', { name: destination })`, assert selected state, and verify the visible property list changes for that destination. |
| Medium | `tests/ui/featured-property-navigation.spec.ts` | A large text regex with `.first()` can select an unintended property. Missing links are conditionally ignored. | Use an exact accessible property name or stable card locator and fail when the required property is absent. |
| Medium | `tests/ui/support-and-app-links.spec.ts` | Link selection is text-based and can confuse a contact-page link with an email link. Optional `count()` checks can silently skip link coverage. | Select links by `href` contract (`mailto:`, `tel:`, App Store, Google Play) and require the expected links when the requirement says they must exist. |
| Medium | `tests/ui/homepage-booking-modes.spec.ts` | Booking mode count and card checks rely on broad text unions. The test does not verify each mode by accessible name or selected state. | Assert each mode individually with `getByRole`, then verify its panel and `aria-selected` state. |
| Medium | `tests/ui/helpers.ts` | Removes `#demoWarningModal` through `evaluate()`, bypassing the real close control and overlay lifecycle. | Prefer clicking the modal's close/continue control. If removal is unavoidable, wait for the overlay and document why this test-only behavior is required. |
| Medium | `playwright.config.ts` | Tests run fully parallel against the live external site with zero local retries. Concurrent traffic and third-party scripts can create timing and availability failures. | Use a controlled test environment or mocked responses. Diagnose with one worker and repetition; configure CI retries only as a fallback. |
| Low | `tests/ui/accessibility-keyboard.spec.ts` | After pressing Tab, the test only checks that some element is focused and separately checks that any first interactive element is visible. It does not verify the focused element is the intended control. | Assert the focused element's role/name and verify keyboard activation changes the expected UI state. |
| Low | `tests/ui/footer-links.spec.ts` | Iterates over links by index and text union. Link order and visible navigation structure may change. | Assert named links or hrefs directly instead of relying on index order. |

## Code Quality Score

**5/10**

The suite has useful scenario coverage and generally uses Playwright assertions, auto-waiting, screenshots, video, and traces. The score is reduced by broad locators, live-site coupling, conditional skips, weak whole-page assertions, and multi-scenario tests that share mutable state.

## Top Improvements

1. Add stable test ids or accessible names to the booking forms, tabpanels, results regions, validation messages, and property cards.
2. Create page objects or focused fixtures for the homepage, booking tabs, hotel form, flight form, and AI planner.
3. Replace global `input`/`button` queries with locators scoped to the active visible tabpanel.
4. Remove conditional skips for required controls; missing required UI should fail the test clearly.
5. Split validation scenarios into independent tests with fresh page state.
6. Replace whole-body regex assertions with targeted assertions for URLs, selected tabs, result containers, and field-level errors.
7. Mock deterministic external-service responses and run content checks against controlled data.
8. Add a repeatability job using `--repeat-each` and `--workers=1` to measure true flake rate.

## Positive Practices

- Uses Playwright's locator assertions and auto-waiting rather than fixed sleeps.
- Captures screenshots, videos, and traces on failures.
- Uses semantic `[role="tab"]` locators in several booking-mode tests.
- Keeps tests organized by UI workflow and domain area.
- Uses a shared helper for the recurring demo-warning overlay.
