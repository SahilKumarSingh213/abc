# Requirement Analysis

## 1. Requirement Summary

The source requirements define QA coverage for authenticated FreeCRM access plus the Deals and Invoices areas. The scope emphasizes protected-route behavior, authenticated navigation, active-session continuity, Deals display and creation behavior, Invoices display and entry-point access, secure secret handling, and evidence-based bug reporting. The source explicitly constrains downstream test design to fewer than 16 practical test cases and marks Invoice entry validation and detailed automation as dependent on live-form confirmation.

## 2. Functional Requirements

| Requirement ID | Requirement | Description |
|---|---|---|
| REQ-001 | Protected page access | Unauthenticated access to `/deals` or `/invoices` shall redirect the user to the login page. |
| REQ-002 | Valid login | A user with valid credentials shall be able to sign in and reach the authenticated FreeCRM area. |
| REQ-003 | Protected navigation | An authenticated user shall be able to navigate between Deals and Invoices without being returned to the login page. |
| REQ-004 | Active-session refresh | Refreshing a protected page during an active session shall keep the user authenticated. |
| REQ-005 | Transient overlay handling | Onboarding or notification overlays shall not permanently block authenticated navigation and must be handled before page assertions. |
| REQ-006 | Deals page display | The Deals page shall show its heading and primary controls without a broken layout. |
| REQ-007 | Deals empty state | When no Deals exist, the Deals page shall show a clear empty state and remain usable. |
| REQ-008 | Deals search and filter | When Deal data exists, supported search or filter controls shall return matching records, and clearing them shall restore the default list. |
| REQ-009 | Deals actions | Available Deals actions, including refresh, export, list or board view, target, and create, shall produce an observable result without inventing exact wording. |
| REQ-010 | Deal creation fields | The Deal Create flow shall expose the observed fields needed for a valid Deal, with Title treated as required and additional required values recorded from the live form before detailed cases are finalized. |
| REQ-011 | Deal validation | Submitting a Deal without Title or with invalid or incomplete data shall show validation feedback and shall not save a record. |
| REQ-012 | Deal persistence | A valid Deal submission shall save one record that can be found again, and repeated submission shall not create an unintended duplicate. |
| REQ-013 | Invoices page display | The Invoices page shall display its heading, Settings, Create, table, and pagination controls without a broken layout. |
| REQ-014 | Invoice table fields | The Invoice list shall display the observed columns Number, Deal, Company, Issue date, Due date, Paid at, and Total. |
| REQ-015 | Invoice empty state | When no Invoice records exist, the page shall display `No records found`. |
| REQ-016 | Invoice pagination boundary | When there is no second page, Previous and Next shall be disabled; multi-page behavior depends on controlled data. |
| REQ-017 | Invoice Create access | A permitted user shall be able to open the Invoice Create flow, while permission details for disallowed roles remain to be confirmed. |
| REQ-018 | Invoice form rules | Before Invoice-entry automation is finalized, the live Create form fields, required values, defaults, allowed values, date rules, amount rules, relationship rules, and validation messages shall be documented. |
| REQ-019 | Invoice validation and persistence | After form rules are confirmed, invalid Invoice data shall be rejected and valid Invoice data shall be saved once without unintended duplicates. |
| REQ-020 | Secret handling | Credentials shall be loaded from `.env` or an approved secret store and shall not appear in artifacts, code, logs, screenshots, or reports. |
| REQ-021 | Reproducible defect evidence | Product bugs shall be reported only when reproducible, with clear expected behavior and supporting evidence; environment, locator, timeout, and missing-data issues shall be classified separately. |

## 3. User Flows

| Flow ID | Requirement ID | User Flow | Description |
|---|---|---|---|
| FLOW-001 | REQ-001 | Direct protected-route access while signed out | The user opens `/deals` or `/invoices` without an authenticated session and is redirected to login. |
| FLOW-002 | REQ-002, REQ-005 | Valid login into authenticated area | The user signs in with valid credentials and handles any transient overlays before continuing. |
| FLOW-003 | REQ-003, REQ-004, REQ-005 | Authenticated navigation and refresh continuity | The user navigates between Deals and Invoices and refreshes protected pages without losing the session. |
| FLOW-004 | REQ-006, REQ-007, REQ-009 | Deals landing experience | The user opens Deals and verifies the heading, primary controls, and empty-state usability or other observable action outcomes. |
| FLOW-005 | REQ-008 | Deals search or filter usage | The user applies supported search or filter controls against existing Deal data and then clears them to restore the default view. |
| FLOW-006 | REQ-010, REQ-011, REQ-012 | Deal creation and validation | The user opens Deal Create, reviews required inputs, submits invalid data to confirm validation, then submits valid data once and verifies persistence without unintended duplication. |
| FLOW-007 | REQ-013, REQ-014, REQ-015, REQ-016 | Invoice list review | The user opens Invoices and verifies heading, controls, observed columns, empty state, and single-page pagination boundaries. |
| FLOW-008 | REQ-017, REQ-018, REQ-019 | Invoice Create entry and form-rule confirmation | The user opens Invoice Create if authorized and documents live form rules before detailed validation or persistence testing proceeds. |
| FLOW-009 | REQ-020, REQ-021 | Secure evidence and defect classification | The test process loads secrets securely and records only reproducible defects with evidence while classifying non-product failures separately. |

## 4. Positive Testing Areas

- Valid login reaches the authenticated FreeCRM area.
- Authenticated navigation between Deals and Invoices succeeds after overlays are handled.
- Refreshing a protected page during an active session keeps the user signed in.
- Deals shows its heading and primary controls without layout breakage.
- Deals shows a usable empty state when no records exist.
- Supported Deals search or filter controls return matching results when controlled data exists.
- Clearing Deals search or filter restores the default list view.
- Deals actions produce an observable result such as refresh, navigation, form open, dialog, or changed view.
- Deal Create exposes the observed fields required for later coverage.
- Valid Deal creation saves one record that can be found again.
- Invoices shows heading, table, controls, and pagination without layout breakage.
- Invoice list shows the observed table columns.
- Invoices empty state shows `No records found` when there are no records.
- Invoice Create entry point opens for a permitted user.
- Secure secret loading keeps credentials outside artifacts and reports.

## 5. Negative Testing Areas

- Direct access to protected pages while signed out should not allow access to Deals or Invoices.
- Overlays that appear after login should not permanently block required navigation.
- Unsupported or invalid Deals search or filter inputs should not leave the list in an incorrect state.
- Submitting a Deal without Title should fail with validation feedback.
- Submitting a Deal with invalid or incomplete data should not create a record.
- Repeating a valid Deal submission should not create unintended duplicate records.
- Unauthorized or unconfirmed role behavior for Invoice Create cannot be treated as passed until permission rules are confirmed.
- Invalid Invoice data must remain blocked from detailed coverage until live form rules are documented.
- Any suspected defect without reproducible evidence should not be classified as a product bug.
- Secrets must not leak into logs, screenshots, reports, or workbook content.

## 6. Boundary Conditions

- Signed-out versus authenticated state is a route-access boundary for Deals and Invoices.
- Protected-page refresh during an active session is a session boundary; expiry behavior is explicitly out of scope until defined.
- Deals empty-state behavior requires a zero-record boundary.
- Invoice empty-state and disabled pagination require a single-page or zero-record boundary.
- Deals search or filter coverage depends on controlled data that contains both matching and non-matching conditions.
- Deal creation duplicate prevention requires at least one initial successful creation followed by repeated submission.
- Invoice multi-page behavior is outside detailed coverage until controlled multi-page data exists.
- Invoice entry coverage is bounded by missing confirmed live-form rules.

## 7. Validation Requirements

- Login requires valid credentials from `.env` or an approved secret store.
- Deal Title is required.
- Additional Deal required fields and allowed values must be recorded from the live form before detailed data-driven coverage is finalized.
- Invalid or incomplete Deal submissions must show validation feedback and block saving.
- Invoice form fields, required values, defaults, allowed values, date rules, amount rules, relationship rules, and validation messages must be documented before detailed Invoice-entry validation is finalized.
- Valid Deal and Invoice persistence must create a single saved record without unintended duplicates.

## 8. Error Handling

- Protected-route access while signed out must redirect to login instead of exposing protected content.
- Validation failures for invalid or incomplete Deal submissions must prevent saving and provide feedback.
- Invalid Invoice-entry behavior cannot be finalized until live form rules are confirmed, so blocked coverage must be recorded rather than guessed.
- Locked cleanup before execution is defined as a blocking condition for later execution stages.
- Missing verified selectors or routes must be treated as blocked automation rather than assumed behavior.
- Environment, locator, timeout, and missing-data problems must be classified separately from product defects.

## 9. Integration Requirements

- Authentication integrates with protected FreeCRM routes and the authenticated shell.
- Secrets management integrates with `.env` or an approved secret store.
- Later automation must integrate with the existing TypeScript, Cucumber, Playwright, and Page Object Model framework.
- Later execution and reporting integrate with Allure outputs and cleanup of prior result directories.

## 10. Security-Related Requirements

- Credentials must be sourced from `.env` or an approved secret store.
- Credentials must not be written to requirements, workbooks, source code, screenshots, logs, Allure results, or reports.
- Protected pages must remain inaccessible to unauthenticated users.
- Suspected bugs require evidence and correct classification so environment or automation failures are not misreported as product defects.

## 11. Missing Requirements

| Missing Information | Why It Is Needed |
|---|---|
| Session-expiry timeout and expected behavior | Refresh continuity is in scope, but expiry behavior is explicitly out of scope until defined, so timeout-based session tests cannot be designed yet. |
| Supported Deals search or filter controls and their expected matching rules | Search and filter behavior is required, but exact supported controls and matching logic are needed to define reliable coverage. |
| Confirmed required Deal fields beyond Title and accepted value rules | Detailed Deal creation and validation coverage depends on knowing which other fields are mandatory and what values are valid. |
| Observable expected outcomes for each Deals action, especially target and export | The requirements allow any observable result, but expected results must be clearer to distinguish product failures from expected navigation or dialogs. |
| Required permission model for Invoice Create and disallowed-role behavior | Negative authorization coverage for Invoice Create cannot be finalized without the expected permission behavior. |
| Live Invoice Create field set and validation rules | Invoice validation and persistence coverage is blocked until the actual form fields and rules are documented. |
| Controlled datasets for Deals and Invoices | Search, duplicate prevention, empty-state, and pagination coverage require known data states to produce reliable results. |

## 12. Ambiguous Requirements

| Requirement ID | Ambiguity | Clarification Needed |
|---|---|---|
| REQ-005 | The requirements state overlays shall not permanently prevent navigation, but do not define acceptable transient behavior or timeout expectations. | Clarify whether temporary blocking is acceptable and what handling is expected from the test flow versus the product. |
| REQ-008 | Supported Deals search or filter behavior is required without defining the controls or matching rules. | Clarify which controls are in scope and whether matching is exact, partial, case-sensitive, or multi-field. |
| REQ-009 | Deals actions must produce an observable result, but exact expectations for refresh, export, target, and view toggles are not fully defined. | Clarify the expected result for each action so failures can be judged consistently. |
| REQ-017 | Invoice Create is conditioned on required permission, but no role matrix or expected denial behavior is provided. | Clarify which users are allowed and what the UI should do for disallowed users. |
| REQ-019 | Invoice validation and persistence requirements depend on future confirmation of form rules, leaving current pass criteria incomplete. | Clarify the final Invoice form rules before downstream design or automation approval. |

## 13. Testing Risks

- Post-login overlays can interfere with navigation and produce false failures if not consistently handled.
- Missing confirmed Deal field rules beyond Title can cause unstable validation and persistence coverage.
- Invoice Create coverage is partially blocked because live form rules and permission expectations are incomplete.
- Search, empty-state, pagination, and duplicate checks depend on controlled data that may not exist at runtime.
- Unverified selectors or unsupported direct routes can block automation and must not be guessed.
- Secret exposure risk exists if logs, screenshots, or reports capture credential values.
- Reproducibility requirements for bug evidence can delay defect classification when evidence capture is incomplete.

## 14. Possible Automation Areas

- Protected-route redirect coverage is suitable for automation because the expected navigation outcome is deterministic.
- Valid login plus overlay handling is suitable for automation because it is a repeatable prerequisite flow.
- Authenticated navigation and refresh continuity are suitable for automation because route and session behavior are observable.
- Deals page smoke coverage is suitable for automation because heading, controls, and empty state are directly verifiable.
- Deal validation for missing Title is suitable for automation because the expected failure outcome is explicit.
- Deal persistence can be automated after verified selectors and controlled unique data are available.
- Invoice list smoke coverage is suitable for automation because headings, columns, empty state, and disabled pagination are observable.
- Invoice Create detailed validation and persistence should remain blocked or limited until the live form rules are confirmed.

## 15. Assumptions

- The source document [freecrm-deals-invoices-requirements-new.md](c:/Users/sahikuma/OneDrive%20-%20Capgemini/Desktop/Sprint/specs/freecrm-deals-invoices-requirements-new.md) is the only source of truth for this workflow run.
- The observed headings, controls, and columns in the source document reflect the latest known application evidence.
- Valid credentials are available outside committed artifacts through `.env` or an approved secret store.
- Controlled data states for zero records and known records will need to be arranged later because they are required but not supplied here.
- Invoice-entry coverage beyond access remains blocked until live form rules are documented.

# Traceability

Traceability is maintained by preserving REQ-001 through REQ-021 from the source document and mapping them to user flows, testing areas, risks, and later automation candidates without adding unsupported functionality.