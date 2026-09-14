# PHPTRAVELS Test Cases

**Source plan:** [phptravels-test-plan.md](phptravels-test-plan.md)
**Application:** https://phptravels.net/
**Analysis date:** 2026-09-08

## Assumptions

- Each test starts from a fresh browser context at the PHPTRAVELS homepage.
- Valid dates are future dates unless the environment documents another rule.
- Inventory, payment, visa, AI, and messaging integrations use sandbox data, mocks, or boundary-only verification.
- Exact maximum values, supported browsers, and business rules must be confirmed before final automation.

| Test ID | Scenario | Preconditions | Steps | Expected Result | Priority | Automation |
|---|---|---|---|---|---|---|
| TC-001 | Homepage loads successfully | Internet access is available. | 1. Navigate to `https://phptravels.net/`. 2. Wait for the page to finish loading. | Page loads without a blocking error; title, branding, hero heading, booking modes, and featured properties are visible. | P0 | Yes |
| TC-002 | Primary booking modes are available | Homepage is loaded. | Select Stays, Flights, Visa, and AI Trip Planner one at a time. | Each mode can be selected and exposes its corresponding interface. | P0 | Yes |
| TC-003 | Booking mode selection state is correct | Homepage is loaded. | Select one booking mode, then select another mode. | The selected mode has the active/selected state and the previous mode is no longer active. | P1 | Yes |
| TC-004 | Featured destination filters work | Homepage is loaded. | Select Dubai, New York, Barcelona, Tokyo, Maldives, and Gan Island. | The selected filter is identifiable and matching properties or a clear no-results state is shown. | P1 | Yes |
| TC-005 | Featured property card displays required details | Homepage is loaded. | Inspect each visible property card. | Property name, location, price, rating, and applicable discount are displayed and associated with the correct card. | P1 | Yes |
| TC-006 | Valid hotel search returns a controlled result | Stays mode is available; valid destination and future dates are known. | 1. Enter a valid destination. 2. Select a future check-in and later check-out date. 3. Select one room and two adults. 4. Submit. | Results, loading, or an explicit no-results state is shown; destination and dates are preserved in the result context. | P0 | Yes |
| TC-007 | Hotel search requires destination | Stays mode is available. | Leave destination empty and submit the search. | Search is blocked or a clear required-destination validation message is displayed. | P1 | Yes |
| TC-008 | Hotel search requires dates | Stays mode is available. | Enter a destination, leave one or both dates empty, and submit. | Search is blocked or clear required-date validation is displayed. | P1 | Yes |
| TC-009 | Hotel date range is validated | Stays mode is available. | Try a check-out date equal to and earlier than check-in. | Invalid date ranges cannot be submitted or produce a clear validation message. | P1 | Yes |
| TC-010 | Hotel past dates are handled | Stays mode is available. | Try to select or submit a past check-in date. | Past dates are unavailable or the search is rejected with a clear explanation. | P1 | Yes |
| TC-011 | Hotel guest and room boundaries are enforced | Stays mode is available; supported limits are documented or obtained from the product owner. | Enter minimum values, zero guests, negative values if editable, and values above the supported maximum. | Valid minimum values are accepted; invalid values are prevented or produce clear validation; layout remains stable. | P1 | Yes |
| TC-012 | Same-day and maximum-duration stays follow business rules | Stays mode is available; business rules are documented. | Submit a same-day stay and a maximum-duration stay. | Each request is accepted or rejected consistently with the documented rule and presents a clear state. | P2 | Yes |
| TC-013 | Featured property opens booking path | Homepage is loaded. | Select a featured property such as Burj Al Arab. | Property detail or booking page opens with property name, location, price, and booking context. | P1 | Yes |
| TC-014 | Property booking controls handle availability | A featured property page is open. | Inspect and use the availability or booking control. | User can continue, search availability, or receives a clear unavailable state; no sensitive data is exposed. | P1 | Yes |
| TC-015 | Valid one-way flight search is handled | Flights mode is available; valid airport data is known. | Enter valid origin, destination, future travel date, and passenger count; select one-way; submit. | Search uses one-way mode and displays results, loading, or a clear no-results state. | P0 | Yes |
| TC-016 | Valid round-trip flight search is handled | Flights mode is available; valid airport data is known. | Enter valid origin, destination, future departure and return dates, and passenger count; select round-trip; submit. | Search uses round-trip mode and preserves origin, destination, and dates in the result context. | P0 | Yes |
| TC-017 | Flight search validates required fields | Flights mode is available. | Submit with origin empty, then with destination empty. | Search is blocked or a clear required-field message is displayed for the missing value. | P1 | Yes |
| TC-018 | Flight search rejects identical airports | Flights mode is available. | Set origin and destination to the same airport and submit. | Search is rejected with a clear validation message. | P1 | Yes |
| TC-019 | Flight dates and passenger count are validated | Flights mode is available. | Try invalid dates, past dates where prohibited, zero passengers, and values above the supported maximum. | Invalid values are prevented or rejected with understandable validation. | P1 | Yes |
| TC-020 | Visa enquiry accepts valid data | Visa mode is available; sandbox or test submission endpoint is configured. | Enter valid required travel and contact details and submit. | Request is accepted or a controlled confirmation state is displayed. | P1 | Yes |
| TC-021 | Visa enquiry validates malformed data | Visa mode is available. | Submit with missing required fields, malformed email/phone, and excessively long values. | Submission is blocked or field-level validation is shown; input is treated as text. | P1 | Yes |
| TC-022 | AI planner handles a valid request | AI planner is available; sandbox or mocked AI response is configured. | Enter a request such as a round trip from Dubai to Paris in October for two adults and submit. | A response, loading state, or controlled service-unavailable state is shown. | P1 | Yes |
| TC-023 | AI planner handles empty and unsupported input | AI planner is available. | Submit empty, meaningless, and very long text. | Empty input is rejected or prompted for detail; unsupported input receives a controlled response; no raw error is exposed. | P1 | Yes |
| TC-024 | Footer informational links resolve | Homepage is loaded. | Open each Company, Support, and Explore footer link. | Each link reaches the intended page or supported external destination without a broken-page error. | P1 | Yes |
| TC-025 | Support links use correct schemes | Homepage is loaded. | Inspect email, telephone, and WhatsApp support links. | Email uses `mailto:`, telephone uses `tel:`, and WhatsApp points to a valid WhatsApp destination. | P1 | Yes |
| TC-026 | App-store links match their labels | Homepage is loaded. | Inspect and open the App Store and Google Play links. | Each label points to its matching store; any mismatch is logged as a defect. | P1 | Yes |
| TC-027 | Branding and content are consistent | Homepage is loaded. | Inspect header, footer, property cards, prices, discounts, and ratings. | Branding is consistently spelled; values use consistent formatting and remain associated with the correct content. | P2 | Yes |
| TC-028 | Homepage controls are keyboard accessible | Homepage is loaded. | Navigate through the page using keyboard only; activate tabs, links, buttons, and menu controls. | Focus order is logical, focus is visible, and interactive controls can be operated without a mouse. | P1 | Yes |
| TC-029 | Homepage has accessible semantics | Homepage is loaded. | Inspect headings, tab roles and selected states, form labels, button names, and image alternative text. | Heading hierarchy is meaningful; controls have accessible names; tabs expose correct semantics; meaningful images have useful alternative text. | P1 | Yes |
| TC-030 | Homepage is responsive | Supported desktop, tablet, and mobile viewport sizes are defined. | Load the homepage at each viewport size; open and close the mobile menu. | Content remains readable and interactive; essential controls are not clipped, overlapped, or inaccessible. | P1 | Yes |
| TC-031 | User input is sanitized | Test environment permits harmless security probes. | Enter harmless XSS strings and special characters in destination, traveller, visa, and AI planner fields. | Values are rendered as text; no script executes; page remains stable and errors do not expose implementation details. | P1 | Yes |
| TC-032 | Sensitive booking data is not exposed | Non-production test data is available. | Inspect URLs, visible errors, and booking/payment boundary responses during a controlled flow. | Personal or payment data is not unnecessarily placed in URLs or errors; external payment destinations use HTTPS where applicable. | P0 | Yes |
| TC-033 | External-service failures are controlled | Mock or fault-injection environment is available. | Simulate inventory, AI, visa, and payment service failures. | A clear error or retry state is shown; the page does not hang indefinitely; no stack trace or provider secret is exposed. | P1 | Yes |
| TC-034 | Dynamic price and discount values are consistent | Stable fixture or API response is available. | Compare property price, discount, displayed total, and source response. | Currency, decimal formatting, discounts, taxes, and totals follow the defined pricing rules. | P1 | Yes |
| TC-035 | Booking confirmation matches submitted data | End-to-end sandbox booking and test payment are available. | Complete a valid booking with known traveller, dates, guests, and payment fixture. | Confirmation contains the submitted traveller and booking details, correct total, and a unique booking reference. | P0 | Yes |
| TC-036 | Unauthorized booking details are protected | At least two test users or booking sessions are available. | Create a booking in session A; attempt to access its details from session B or without authorization. | Session B cannot access session A's booking; unauthorized requests are rejected without data leakage. | P0 | Yes |
| TC-037 | Booking and payment callbacks are protected | Payment sandbox and callback inspection are available. | Complete or simulate a payment callback with valid and tampered payloads. | Valid callbacks update booking status; tampered, replayed, or invalid callbacks are rejected safely. | P0 | Yes |
| TC-038 | Search and enquiry endpoints resist abuse | Rate-limit rules and a controlled test environment are available. | Send repeated search, login, or enquiry requests within a short interval. | Rate limiting or throttling is applied according to policy; legitimate users receive a clear retry response. | P2 | No |

## Traceability

- Homepage and booking-mode navigation: TC-001 to TC-005.
- Hotel stays: TC-006 to TC-014.
- Flights, visa, and AI planner: TC-015 to TC-023.
- Navigation, support, and content: TC-024 to TC-027.
- Accessibility and responsive behavior: TC-028 to TC-030.
- Security and reliability: TC-031 to TC-038.

## Open Questions

- What are the exact maximum values for rooms, guests, passengers, and stay duration?
- Which currencies, countries, airports, and languages are supported?
- What are the cancellation, refund, modification, and no-show rules?
- Which sandbox credentials and test payment instruments are available?
- What browsers, devices, accessibility standard, and performance targets are in scope?
