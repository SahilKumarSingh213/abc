# Test Case Correction Review

## Artifact Under Review

- Proposed workbook: `specs/test-cases/test-cases.proposed.xlsx`
- Existing workbook preserved: `specs/test-cases/test-cases.xlsx`
- Source of truth: `specs/freecrm-deals-invoices-requirements-new.md`
- Approved upstream plan: `specs/test-plans/test-plan.md`

## Review Result

Status: Approved after correction

## Checks Performed

1. Confirmed the workbook remains below the approved limit with 13 structured test cases.
2. Confirmed each row contains a test case ID, scenario/title, precondition, test condition, numbered steps, test data, expected result, requirement reference, priority, and automation metadata.
3. Confirmed execution-result fields remain blank for both iterations.
4. Confirmed coverage is shaped from the three approved broad stories and requirement IDs instead of from a separate scenario artifact.
5. Confirmed no separate scenario artifact was created.

## Issues Corrected

1. The previous workbook split protected-route coverage into two separate cases; the corrected proposal combines Deals and Invoices redirect coverage into one broader case, matching the approved shaping rules.
2. Several previous requirement references were aligned to an older mapping; the corrected proposal maps the cases directly to the approved REQ-001 through REQ-021 source.
3. The previous workbook treated Invoice invalid-handling or persistence as executable coverage before live Invoice form rules were confirmed; the corrected proposal converts that area into an explicit confirmation gate tied to REQ-018 and REQ-019.
4. The corrected proposal keeps defect handling evidence-based and does not invent a bug-investigation case.

## Residual Gaps And Dependencies

1. Deals search or filter coverage depends on controlled Deal data with known matching values.
2. Deals and Invoices empty-state checks depend on controlled zero-record states.
3. Invoice Create positive access depends on a permitted user account.
4. Detailed Invoice validation and persistence remain blocked until the live Invoice Create form rules are documented and approved.

## Decision For Workflow

The Test Case artifact is acceptable for the manual approval gate. Do not continue to Locator Intelligence until the user approves the preservation choice and the corrected artifact.