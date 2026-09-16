# Requirements Traceability Matrix

## Sources Used

- Source requirements: `specs/freecrm-deals-invoices-requirements-new.md`
- Requirement analysis: `specs/requirement-analysis/requirement-analysis.md`
- Active test-case workbook: `specs/test-cases/test-cases.xlsx`
- Active locator workbook: `specs/locators/locator-specification.xlsx`
- Automation summary: `specs/reports/automation-summary.md`
- Refreshed execution report: `specs/execution/execution-report.md`
- Current failure analysis: `specs/failure-analysis/failure-analysis.md`
- Fresh Allure summary: `allure-report/widgets/summary.json`

## Traceability Notes

- The active workbook contains 13 structured test cases: `TC-001` through `TC-013`.
- Exactly 4 workbook rows are selected for automation with `Automate = Yes`: `TC-001`, `TC-002`, `TC-003`, `TC-004`.
- The active locator workbook contains 19 structured locator rows and covers the selected automated subset only: `TC-001` through `TC-004`.
- Automation is implemented only for the selected workbook rows confirmed by the approved automation summary.
- Execution status below is limited to the clean 2026-09-15 selected-scope run for `TC-001` through `TC-004`. Unexecuted workbook cases are not marked as passed.

## RTM

| Requirement ID | Requirement | Flow IDs | Test Case IDs | Automation | Execution Status | Defect ID | Coverage Status |
|---|---|---|---|---|---|---|---|
| REQ-001 | Protected page access | FLOW-001 | TC-001 | Implemented and selected | Passed in latest clean run | None confirmed | Covered |
| REQ-002 | Valid login | FLOW-002 | TC-002 | Implemented and selected | Passed in latest clean run | None confirmed | Covered |
| REQ-003 | Protected navigation | FLOW-003 | TC-003 | Implemented and selected | Passed in latest clean run | None confirmed | Covered |
| REQ-004 | Active-session refresh | FLOW-003 | TC-003 | Implemented and selected | Passed in latest clean run | None confirmed | Covered |
| REQ-005 | Transient overlay handling | FLOW-002, FLOW-003 | TC-002, TC-003 | Implemented and selected | Passed in latest clean run | None confirmed | Covered |
| REQ-006 | Deals page display | FLOW-004 | TC-004 | Implemented and selected | Passed in latest clean run | None confirmed | Covered |
| REQ-007 | Deals empty state | FLOW-004 | TC-004 | Implemented and selected | Passed in latest clean run | None confirmed | Covered |
| REQ-008 | Deals search and filter | FLOW-005 | TC-005 | Not implemented; workbook says Automate = No | Not executed in current run | None confirmed | Partially Covered |
| REQ-009 | Deals actions | FLOW-004 | TC-006 | Not implemented; workbook says Automate = No | Not executed in current run | None confirmed | Partially Covered |
| REQ-010 | Deal creation fields | FLOW-006 | TC-007 | Not implemented; workbook says Automate = No | Not executed in current run | None confirmed | Partially Covered |
| REQ-011 | Deal validation | FLOW-006 | TC-008 | Not implemented; workbook says Automate = No | Not executed in current run | None confirmed | Partially Covered |
| REQ-012 | Deal persistence | FLOW-006 | TC-009 | Not implemented; workbook says Automate = No | Not executed in current run | None confirmed | Partially Covered |
| REQ-013 | Invoices page display | FLOW-007 | TC-010 | Not implemented; workbook says Automate = No | Not executed in current run | None confirmed | Partially Covered |
| REQ-014 | Invoice table fields | FLOW-007 | TC-010 | Not implemented; workbook says Automate = No | Not executed in current run | None confirmed | Partially Covered |
| REQ-015 | Invoice empty state | FLOW-007 | TC-010 | Not implemented; workbook says Automate = No | Not executed in current run | None confirmed | Partially Covered |
| REQ-016 | Invoice pagination boundary | FLOW-007 | TC-010 | Not implemented; workbook says Automate = No | Not executed in current run | None confirmed | Partially Covered |
| REQ-017 | Invoice Create access | FLOW-008 | TC-011 | Not implemented; workbook says Automate = No | Not executed in current run | None confirmed | Partially Covered |
| REQ-018 | Invoice form rules | FLOW-008 | TC-012 | Not implemented; workbook says Automate = No | Blocked pending live form-rule confirmation | None confirmed | Blocked |
| REQ-019 | Invoice validation and persistence | FLOW-008 | TC-012 | Not implemented; workbook says Automate = No | Blocked pending live form-rule confirmation | None confirmed | Blocked |
| REQ-020 | Secret handling | FLOW-009 | TC-013 | Not implemented; workbook says Automate = No | No workbook execution recorded; current artifacts show no secret exposure in the selected clean run | None confirmed | Partially Covered |
| REQ-021 | Reproducible defect evidence | FLOW-009 | TC-013 | Not implemented; workbook says Automate = No | No workbook execution recorded; current failure analysis confirms no defect was opened without evidence | None confirmed | Partially Covered |

## Coverage Summary

| Metric | Count |
|---|---:|
| Total requirements | 21 |
| Covered | 7 |
| Partially Covered | 12 |
| Blocked | 2 |
| Not Covered | 0 |
| Workbook test cases | 13 |
| Automated test cases | 4 |
| Executed automated test cases | 4 |
| Requirements with implemented automation | 7 |
| Requirements failed in latest clean run | 0 |
| Requirements linked to confirmed defects | 0 |

## Current Traceability Status

- Full traceability exists from requirement to workbook test case for all 21 requirements.
- End-to-end traceability through approved automation and clean execution exists only for `REQ-001` through `REQ-007` via `TC-001` through `TC-004`.
- `REQ-018` and `REQ-019` remain blocked by the documented dependency on live Invoice form-rule confirmation.
- No confirmed application defect is linked to any requirement in the latest clean execution evidence.