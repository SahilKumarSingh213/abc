# Requirements Traceability Matrix (RTM)

## 1. Traceability Table

| Requirement ID | Requirement Summary | Flow ID | Test Case ID | Automation | Execution Status | Defect ID | Coverage Status |
|---|---|---|---|---|---|---|---|
| REQ-001 | Protected page access | FLOW-001 | TC-001 | No (Manual scope) | Manual/Smoke | None | Partially Covered |
| REQ-002 | Valid login | FLOW-002 | TC-002 | Yes | PASS | None | Covered |
| REQ-003 | Protected navigation | FLOW-003 | TC-003 | Yes | PASS | None | Covered |
| REQ-004 | Active-session refresh | FLOW-003 | TC-003 | Yes | PASS | None | Covered |
| REQ-005 | Transient overlay handling | FLOW-002, FLOW-003 | TC-002, TC-003 | Yes | PASS | None | Covered |
| REQ-006 | Deals page display | FLOW-004 | TC-004 | No (Manual scope) | Manual/Smoke | None | Partially Covered |
| REQ-007 | Deals empty state | FLOW-004 | TC-004 | No (Manual scope) | Manual/Smoke | None | Partially Covered |
| REQ-008 | Deals search and filter | FLOW-005 | TC-005 | No (Exploratory) | Not executed | None | Partially Covered |
| REQ-009 | Deals actions | FLOW-004 | TC-006 | No (Exploratory) | Not executed | None | Partially Covered |
| REQ-010 | Deal creation fields | FLOW-006 | TC-007, TC-009 | Yes (TC-009) | PASS | None | Covered |
| REQ-011 | Deal validation | FLOW-006 | TC-008 | Yes | PASS | None | Covered |
| REQ-012 | Deal persistence | FLOW-006 | TC-009 | Yes | PASS | None | Covered |
| REQ-013 | Invoices page display | FLOW-007 | TC-010 | No (Inspection) | Not executed | None | Partially Covered |
| REQ-014 | Invoice table fields | FLOW-007 | TC-010 | No (Inspection) | Not executed | None | Partially Covered |
| REQ-015 | Invoice empty state | FLOW-007 | TC-010 | No (Inspection) | Not executed | None | Partially Covered |
| REQ-016 | Invoice pagination boundary | FLOW-007 | TC-010 | No (Inspection) | Not executed | None | Partially Covered |
| REQ-017 | Invoice Create access | FLOW-008 | TC-011 | No (Exploratory) | Not executed | None | Partially Covered |
| REQ-018 | Invoice form rules | FLOW-008 | TC-012 | No (Pending confirmation) | Blocked | None | Blocked |
| REQ-019 | Invoice validation and persistence | FLOW-008 | TC-012 | No (Pending confirmation) | Blocked | None | Blocked |
| REQ-020 | Secret handling | FLOW-009 | TC-013 | Yes (.env integration) | PASS | None | Covered |
| REQ-021 | Reproducible defect evidence | FLOW-009 | TC-013 | Yes (Allure & screenshots) | PASS | None | Covered |

## 2. Coverage Metrics

| Metric | Count |
|---|---:|
| Total Requirements | 21 |
| Fully Covered | 9 |
| Partially Covered | 10 |
| Blocked | 2 |
| Total Test Cases | 13 |
| Automated Test Cases | 4 |
| Executed Test Cases | 4 |
| Passed Test Cases | 4 (100%) |
| Confirmed Defects | 0 |
