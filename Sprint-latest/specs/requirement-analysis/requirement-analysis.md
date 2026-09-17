# Requirement Analysis

## 1. Requirement Summary
This document analyzes the functional and non-functional requirements for the FreeCRM application, focusing on user authentication, protected route access control, the Deals module (list view, empty state, creation, validation, and persistence), and the Invoices module (table layout, columns, empty state, and creation flow).

## 2. Functional Requirements

| Requirement ID | Requirement | Description | Module |
|---|---|---|---|
| REQ-001 | Protected Page Access | Unauthenticated access to `/deals` and `/invoices` must redirect to the login page. | Access Control |
| REQ-002 | Valid Login | Users with valid credentials must successfully authenticate and access the CRM dashboard. | Authentication |
| REQ-003 | Protected Navigation | Authenticated users can navigate seamlessly between Deals (`/deals`) and Invoices (`/invoices`). | Navigation |
| REQ-004 | Active-Session Refresh | Authenticated session must persist across browser page refreshes on protected routes. | Navigation / Session |
| REQ-005 | Transient Overlay Handling | First-run setup dialogs ("Welcome aboard!") and push notification prompts must be handled safely without blocking workflows. | UI Resilience |
| REQ-006 | Deals Page Display | Deals page must render primary controls: Heading, Refresh, Export, List view, Board view, and pagination. | Deals |
| REQ-007 | Deals Empty State | Deals landing page displays `No records found` when the account has no deal records. | Deals |
| REQ-008 | Deals Search and Filter | Deals view supports searching and filtering across records. | Deals |
| REQ-009 | Deals Actions | Deal rows provide action controls for editing, viewing, and exporting. | Deals |
| REQ-010 | Deal Creation Fields | New Deal form includes Title (mandatory), Close Date, Stage, Status, Type, Source, and Identifier. | Deals |
| REQ-011 | Deal Required Field Validation | Submitting a new deal without a Title must be rejected with validation feedback. | Deals |
| REQ-012 | Deal Data Persistence | Submitting a valid deal saves the record once and displays it in the Deals list. | Deals |
| REQ-013 | Invoices Page Display | Invoices landing page displays Invoices heading, Settings, Create button, and data table. | Invoices |
| REQ-014 | Invoice Table Fields | Invoice table headers must include Number, Deal, Company, Issue date, Due date, Paid at, and Total. | Invoices |
| REQ-015 | Invoice Empty State | Invoices page displays `No records found` when no invoice records exist. | Invoices |
| REQ-016 | Invoice Pagination Boundary | Invoices pagination shows Previous and Next disabled when single-page or empty. | Invoices |
| REQ-017 | Invoice Create Access | Authenticated users can click 'Create' to access the invoice creation workflow. | Invoices |
| REQ-018 | Invoice Form Rules | Invoice form fields and business rules must be followed once finalized. | Invoices |
| REQ-019 | Invoice Validation and Persistence | Valid invoice creation persists to the table; invalid submission is rejected. | Invoices |
| REQ-020 | Secret Handling | Application credentials and secrets must be loaded securely via `.env` without hardcoding. | Security |
| REQ-021 | Reproducible Defect Evidence | Failures must produce screenshots, traces, and Allure report attachments. | Test Reporting |

## 3. User Flows

| Flow ID | Requirement ID | User Flow | Description |
|---|---|---|---|
| FLOW-001 | REQ-001 | Unauthenticated Access Control | Direct URL navigation to `/deals` or `/invoices` without credentials. |
| FLOW-002 | REQ-002, REQ-005 | Authentication & Overlay Clear | Submitting valid credentials on login page and clearing welcome/notification modals. |
| FLOW-003 | REQ-003, REQ-004 | Multi-Page Navigation & Refresh | Navigating between `/deals` and `/invoices`, then refreshing the browser page. |
| FLOW-004 | REQ-006, REQ-007, REQ-009 | Deals Landing Inspection | Inspecting header controls, empty-state text, and view toggle buttons. |
| FLOW-005 | REQ-008 | Deals Search & Filtering | Entering search criteria to locate specific deal records. |
| FLOW-006 | REQ-010, REQ-011, REQ-012 | Deal Creation & Form Validation | Submitting invalid (empty title) vs valid unique deal data. |
| FLOW-007 | REQ-013, REQ-014, REQ-015, REQ-016 | Invoices Landing Inspection | Inspecting invoice table headers, pagination controls, and empty-state display. |
| FLOW-008 | REQ-017, REQ-018, REQ-019 | Invoice Creation Entry | Clicking Create button from Invoices page to initialize invoice flow. |
| FLOW-009 | REQ-020, REQ-021 | Security & Test Evidence Logging | Execution under secure credentials with automatic artifact and screenshot capture. |

## 4. Positive & Negative Testing Areas
- **Positive Testing Areas**:
  - Valid user authentication with email and password.
  - Multi-page navigation across `/deals` and `/invoices`.
  - Active session retention after full browser page refresh.
  - Creating a valid deal with unique Title, Identifier, Stage, Status, Type, and Source.
  - Verifying the created deal appears in the deals list.
- **Negative Testing Areas**:
  - Accessing protected routes without an active session (redirect to login).
  - Submitting Deal form without the mandatory `Title` field.
  - Attempting invalid navigation states.

## 5. UI Observations & Transient Risks
- **Welcome Modal**: A *"Welcome aboard!"* onboarding modal can appear intermittently after login. Must be conditionally dismissed.
- **Push Notification Prompt**: OneSignal push notification script triggers browser permission prompts. Must be blocked at network route level.
- **Dynamic Elements**: Semantic UI dropdowns and form inputs require reliable waiting and locator strategies.

## 6. Assumptions & Missing Information
- Invoice creation detailed form fields and server-side validation rules require live environment confirmation before full automated CRUD coverage.
