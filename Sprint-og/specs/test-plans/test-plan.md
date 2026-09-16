# Test Plan

## 1. Artifact Scope

Source of truth: `specs/freecrm-deals-invoices-requirements-new.md`

This test plan covers the approved FreeCRM login, Deals, and Invoices scope defined in the source requirements. It preserves the existing requirement IDs, keeps the downstream test-case limit below 16 meaningful cases, and records blocked areas where the source explicitly requires live confirmation before detailed coverage can be finalized.

## 2. Test Objectives

- Verify protected-route access behavior for Deals and Invoices.
- Verify valid login into the authenticated FreeCRM area.
- Verify authenticated navigation between Deals and Invoices, including active-session refresh continuity.
- Verify Deals landing behavior, empty state, supported actions, and creation-related validation and persistence where required data and verified locators exist.
- Verify Invoices landing behavior, observed columns, empty state, pagination boundary, and Invoice Create entry access where permission exists.
- Preserve secure secret handling and evidence-based defect classification across the workflow.

## 3. In Scope

- Login and protected-page access for `/deals` and `/invoices`
- Authenticated navigation between Deals and Invoices
- Active-session continuity during normal navigation and page refresh
- Handling of first-run or notification overlays before page assertions
- Deals page heading, primary controls, empty state, search or filter behavior, and observable page actions
- Deal Create entry, observed field presence, Title-required validation, and single-save persistence behavior
- Invoices page heading, Settings, Create, table visibility, observed columns, empty state, and single-page pagination boundary
- Invoice Create entry access for a permitted user
- Secret handling and reproducible-evidence rules for defect reporting

## 4. Out of Scope

- Other FreeCRM modules
- Billing plans and account administration
- API, load, performance, and localization testing
- Jira issue creation
- Session-expiry timeout testing until timeout and expected behavior are defined
- Detailed Invoice-entry validation and persistence until live form rules are documented
- Multi-page Invoice pagination until controlled multi-page data exists

## 5. Test Items and Requirement Coverage

| Test Item ID | Area | Covered Requirements | Planned Coverage |
|---|---|---|---|
| TP-001 | Protected access while signed out | REQ-001 | Direct access to `/deals` and `/invoices` redirects to login. |
| TP-002 | Valid login and overlay handling | REQ-002, REQ-005 | Valid credentials reach the authenticated area and transient overlays are handled before assertions. |
| TP-003 | Authenticated navigation and refresh continuity | REQ-003, REQ-004, REQ-005 | Authenticated user moves between Deals and Invoices and remains signed in after refresh. |
| TP-004 | Deals landing smoke | REQ-006, REQ-007, REQ-009 | Deals heading, primary controls, empty state usability, and observable action outcomes are checked without inventing message text. |
| TP-005 | Deals search or filter behavior | REQ-008 | Supported search or filter controls return matching results and clearing restores the default view when controlled data exists. |
| TP-006 | Deal Create fields and validation | REQ-010, REQ-011 | Deal Create exposes the observed fields and rejects missing Title or invalid or incomplete submission. |
| TP-007 | Deal persistence and duplicate prevention | REQ-012 | A valid Deal saves once, can be found again, and repeated submission does not create an unintended duplicate. |
| TP-008 | Invoices landing smoke | REQ-013, REQ-014, REQ-015, REQ-016 | Invoices heading, controls, observed columns, empty state, and disabled single-page pagination are verified. |
| TP-009 | Invoice Create entry access | REQ-017 | A permitted user can open the Invoice Create flow. |
| TP-010 | Invoice form-rule confirmation gate | REQ-018, REQ-019 | Detailed Invoice validation and persistence remain blocked until live form fields and rules are documented. |
| TP-011 | Secret handling and defect evidence | REQ-020, REQ-021 | Test execution uses secure credentials and classifies only reproducible, evidenced product defects as bugs. |

## 6. Test Approach

### 6.1 Functional approach

- Use broad, workflow-oriented coverage rather than one case per field, button, or browser.
- Merge related behaviors into practical downstream cases so the final workbook remains below 16 structured rows.
- Treat overlay handling as a reusable navigation precondition, not a separate pass claim.
- Verify observable outcomes only where the source requirements define them or where the live UI provides confirmable evidence.
- Record blocked coverage when source requirements depend on missing live data, locators, permissions, or form rules.

### 6.2 Negative and boundary approach

- Use signed-out route access as the primary negative boundary for protected content.
- Use zero-record states to verify Deals and Invoices empty-state behavior where required.
- Use invalid or incomplete Deal submission, especially missing Title, to verify validation behavior.
- Use repeated valid Deal submission to verify duplicate-prevention expectations.
- Treat single-page Invoice pagination as the current verified boundary; do not assume multi-page behavior without controlled data.

### 6.3 Defect-classification approach

- Classify product defects only when behavior is reproducible and supported by evidence.
- Classify environment, locator, timeout, missing-data, or blocked-permission problems separately from application defects.
- Do not invent expected wording for action outcomes or validation messages that were not defined in the source.

## 7. Test Data Strategy

| Data Need | Purpose | Current Status |
|---|---|---|
| Valid authenticated account from `.env` or approved secret store | Login and authenticated coverage | Required and assumed available outside committed artifacts |
| Signed-out browser context | Protected-route redirect checks | Required |
| Controlled zero-record Deals state | Deals empty-state checks | Required but not yet supplied |
| Controlled zero-record or single-page Invoice state | Invoice empty-state and disabled pagination checks | Required but not yet supplied |
| Controlled Deal dataset with matching and non-matching values | Deals search or filter checks | Required but not yet supplied |
| Unique valid Deal data | Deal persistence without collision | Required but exact allowed values need live confirmation |
| Authorized Invoice user | Invoice Create entry access | Required but permission model remains unconfirmed |
| Live Invoice Create field and validation data | Invoice validation and persistence | Blocked until form rules are documented |

## 8. Environment and Tooling

- Existing framework: TypeScript, Cucumber, Playwright, and Page Object Model
- Existing automation constraint: each automated Test Case ID must map to exactly one Scenario
- Execution preflight requirement: environment variables, verified locators, test data, and tag mapping must be checked before browser launch
- Cleanup requirement: previous `allure-results`, `allure-report`, Cucumber reports, and failure screenshots must be removed before execution, and a locked cleanup blocks the run

## 9. Entry Criteria

- Approved requirements source remains `specs/freecrm-deals-invoices-requirements-new.md`
- Requirement Analysis stage is approved
- Valid credentials are available through `.env` or an approved secret store
- Required target pages remain accessible in the test environment
- The team understands that Invoice-entry detail remains blocked until live form rules are captured

## 10. Exit Criteria For This Planning Stage

- Requirement IDs REQ-001 through REQ-021 remain preserved in planning coverage
- Planned coverage is grouped into practical downstream test items rather than fragmented checks
- Known gaps, blocked areas, and dependency conditions are recorded without inventing behavior
- The plan remains compatible with fewer than 16 downstream structured test cases

## 11. Risks and Dependencies

| Type | Item | Impact |
|---|---|---|
| Risk | Post-login onboarding or notification overlays interfere with navigation | Can cause false failures unless handled consistently |
| Risk | Deals search or filter controls and matching rules are not fully defined | Search coverage can be unstable or blocked |
| Risk | Deal field rules beyond Title are not fully confirmed | Detailed creation coverage can fail for unclear reasons |
| Risk | Invoice Create permission model is not confirmed | Negative authorization coverage cannot be finalized |
| Risk | Invoice Create form rules are undocumented | Invoice validation and persistence remain blocked |
| Dependency | Controlled data states for zero records and known records | Required for empty-state, search, duplicate, and pagination checks |
| Dependency | Verified selectors for Create and Save flows | Required before detailed automation can be approved |

## 12. Planned Downstream Test-Case Shaping

The downstream Test Case stage shall create fewer than 16 cases. The plan expects broad combined coverage such as:

- one protected-access case for both Deals and Invoices
- one authenticated-login and overlay-handling case
- one authenticated-navigation and refresh case
- one Deals smoke case for heading, controls, actions, and empty state
- one Deals search or filter case when controlled data exists
- one Deal validation case focused on missing Title and invalid submission
- one Deal persistence case focused on single-save behavior and duplicate prevention
- one Invoices smoke case for heading, columns, empty state, and pagination boundary
- one Invoice Create access case for a permitted user
- blocked or manual Invoice-entry detail until live rules are documented

## 13. Open Gaps Requiring Later Confirmation

- Session-expiry timeout and expected behavior
- Supported Deals search or filter controls and matching rules
- Required Deal fields beyond Title and accepted value rules
- Expected observable outcomes for each Deals action, especially export and target
- Invoice Create permission model and disallowed-role behavior
- Live Invoice Create field set, defaults, allowed values, date rules, amount rules, relationship rules, and validation messages
- Controlled datasets needed for repeatable empty-state, search, pagination, and duplicate checks

## 14. Planning Outcome

This plan is ready for Test Case design after correction review because it preserves the approved source requirements, keeps scope bounded, records blocked Invoice-entry detail explicitly, and leaves unresolved live-form and test-data dependencies visible instead of guessed.