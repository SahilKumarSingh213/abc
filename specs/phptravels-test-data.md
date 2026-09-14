# PHPTRAVELS Test Data

**Source test cases:** [phptravels-test-cases.md](phptravels-test-cases.md)
**Application:** https://phptravels.net/
**Analysis date:** 2026-09-08

## Usage Rules

- Use these values only in test or sandbox environments.
- Do not store real customer data, production credentials, API keys, or payment card numbers in this file.
- Generate relative dates at runtime from the test execution date so that test data remains valid.
- Replace placeholder limits with the values confirmed by the product owner.
- Use independent copies of mutable objects in each test to prevent data leakage between scenarios.

## Valid Hotel Search Data

| Data ID | Destination | Check-in | Check-out | Rooms | Adults | Children | Use |
|---|---|---|---|---:|---:|---:|---|
| HOTEL-VALID-01 | Dubai | today + 14 days | today + 17 days | 1 | 2 | 0 | Standard hotel search |
| HOTEL-VALID-02 | New York | today + 30 days | today + 35 days | 1 | 1 | 1 | Search with one child |
| HOTEL-VALID-03 | Tokyo | today + 60 days | today + 67 days | 2 | 4 | 2 | Multi-room search |
| HOTEL-VALID-04 | Maldives | today + 90 days | today + 97 days | 1 | 2 | 0 | Destination filter and search |

`today + N days` should be calculated by the test data factory at runtime. Avoid hard-coded dates for automated execution.

## Hotel Negative and Boundary Data

| Data ID | Field | Value | Expected Use |
|---|---|---|---|
| HOTEL-EMPTY-01 | Destination | Empty string | Required-field validation |
| HOTEL-EMPTY-02 | Check-in | Empty string | Required-date validation |
| HOTEL-EMPTY-03 | Check-out | Empty string | Required-date validation |
| HOTEL-DATE-01 | Check-in/check-out | Same relative date | Same-day business rule |
| HOTEL-DATE-02 | Check-in/check-out | Check-out = check-in - 1 day | Reject reversed range |
| HOTEL-DATE-03 | Check-in | today - 1 day | Reject past date where prohibited |
| HOTEL-DATE-04 | Date format | `not-a-date` | Invalid date handling |
| HOTEL-COUNT-01 | Rooms | `0` | Minimum boundary validation |
| HOTEL-COUNT-02 | Rooms | `-1` | Negative-value validation if editable |
| HOTEL-COUNT-03 | Rooms | `MAX_ROOMS + 1` | Upper-bound validation |
| HOTEL-COUNT-04 | Adults | `0` | Minimum guest validation |
| HOTEL-COUNT-05 | Adults | `-1` | Negative-value validation if editable |
| HOTEL-COUNT-06 | Adults | `MAX_ADULTS + 1` | Upper-bound validation |
| HOTEL-LONG-01 | Destination | 256-character string | Long input handling |
| HOTEL-SPECIAL-01 | Destination | `Sao Paulo & Centro` | Special-character handling |
| HOTEL-UNICODE-01 | Destination | `東京` | Non-Latin input handling |
| HOTEL-UNKNOWN-01 | Destination | `NoSuchDestination-000` | No-results behavior |

`MAX_ROOMS` and `MAX_ADULTS` are placeholders until the product limits are confirmed.

## Featured Destinations and Properties

| Data ID | Destination | Example property | Expected Use |
|---|---|---|---|
| DEST-01 | Dubai | Burj Al Arab | Destination filter and property navigation |
| DEST-02 | Dubai | Atlantis The Palm | Featured-property card validation |
| DEST-03 | Dubai | Address Downtown Dubai | Price and rating validation |
| DEST-04 | Dubai | JW Marriott Marquis Dubai | Property booking path |
| DEST-05 | New York | Use first returned property | Destination filter |
| DEST-06 | Barcelona | Use first returned property | Destination filter |
| DEST-07 | Tokyo | Use first returned property | Destination filter |
| DEST-08 | Maldives | Use first returned property | Destination filter |
| DEST-09 | Gan Island | Use first returned property | Destination filter |

Property prices, discounts, ratings, and availability must be read from the current response or a stable fixture, not treated as permanent test constants.

## Valid Flight Search Data

| Data ID | Trip type | Origin | Destination | Departure | Return | Passengers | Use |
|---|---|---|---|---|---|---:|---|
| FLIGHT-VALID-01 | One-way | Dubai (DXB) | Paris (CDG) | today + 30 days | Not applicable | 1 | Standard one-way search |
| FLIGHT-VALID-02 | Round-trip | London (LHR) | Tokyo (HND) | today + 45 days | today + 55 days | 2 | Standard round-trip search |
| FLIGHT-VALID-03 | One-way | New York (JFK) | Barcelona (BCN) | today + 75 days | Not applicable | 3 | Multi-passenger search |

## Flight Negative and Boundary Data

| Data ID | Field | Value | Expected Use |
|---|---|---|---|
| FLIGHT-EMPTY-01 | Origin | Empty string | Required-field validation |
| FLIGHT-EMPTY-02 | Destination | Empty string | Required-field validation |
| FLIGHT-SAME-01 | Origin/destination | DXB / DXB | Reject identical airports |
| FLIGHT-DATE-01 | Departure | today - 1 day | Past-date validation |
| FLIGHT-DATE-02 | Return | Departure - 1 day | Reversed-date validation |
| FLIGHT-DATE-03 | Date format | `2026-99-99` | Invalid-date handling |
| FLIGHT-COUNT-01 | Passengers | `0` | Minimum boundary validation |
| FLIGHT-COUNT-02 | Passengers | `-1` | Negative-value validation if editable |
| FLIGHT-COUNT-03 | Passengers | `MAX_PASSENGERS + 1` | Upper-bound validation |
| FLIGHT-AIRPORT-01 | Origin/destination | `XXX` / `YYY` | Invalid airport handling |

`MAX_PASSENGERS` is a placeholder until the product limit is confirmed.

## Visa Enquiry Data

### Valid Data

| Data ID | Field | Value |
|---|---|---|
| VISA-VALID-01 | Full name | Alex Morgan |
| VISA-VALID-01 | Email | `qa.visa+valid@example.test` |
| VISA-VALID-01 | Phone | `+15550101001` |
| VISA-VALID-01 | Nationality | United States |
| VISA-VALID-01 | Destination country | France |
| VISA-VALID-01 | Travel purpose | Tourism |
| VISA-VALID-01 | Travel date | today + 45 days |

### Invalid and Boundary Data

| Data ID | Field | Value | Expected Use |
|---|---|---|---|
| VISA-EMPTY-01 | Full name | Empty string | Required-field validation |
| VISA-EMPTY-02 | Email | Empty string | Required-field validation |
| VISA-EMAIL-01 | Email | `invalid-email` | Email-format validation |
| VISA-EMAIL-02 | Email | `qa visa@example.test` | Whitespace validation |
| VISA-PHONE-01 | Phone | `abc-phone` | Phone-format validation |
| VISA-NAME-01 | Full name | 256-character string | Maximum-length validation |
| VISA-NAME-02 | Full name | `<script>alert(1)</script>` | Sanitization check |
| VISA-NATIONALITY-01 | Nationality | `日本` | Non-Latin input handling |
| VISA-DATE-01 | Travel date | today - 1 day | Past-date handling |

## AI Trip Planner Data

| Data ID | Input | Expected Use |
|---|---|---|
| AI-VALID-01 | `Round trip Dubai to Paris in October for 2 adults, with a beach resort stay.` | Valid natural-language request |
| AI-VALID-02 | `Plan a 7-day family trip from London to Tokyo for 2 adults and 1 child.` | Multi-constraint request |
| AI-VALID-03 | `Find a budget weekend city break from New York.` | Partial but meaningful request |
| AI-EMPTY-01 | Empty string | Required-input validation |
| AI-EMPTY-02 | Whitespace-only string | Empty-input validation |
| AI-UNSUPPORTED-01 | `asdf qwerty 0000` | Unsupported-input handling |
| AI-LONG-01 | 10,000-character generated string | Long-input and timeout handling |
| AI-SPECIAL-01 | `Plan <script>alert(1)</script> & family trip` | Sanitization check |
| AI-UNICODE-01 | `京都で静かな旅行を計画して` | Non-Latin input handling |
| AI-DUPLICATE-01 | Submit AI-VALID-01 twice | Duplicate-request handling |

## Support and Navigation Data

| Data ID | Link type | Expected scheme or destination |
|---|---|---|
| LINK-EMAIL-01 | Email Support | `mailto:` |
| LINK-PHONE-01 | Phone Support | `tel:` |
| LINK-WHATSAPP-01 | WhatsApp Support | `https://wa.me/` or approved WhatsApp URL |
| LINK-APPSTORE-01 | App Store | Apple App Store destination |
| LINK-PLAYSTORE-01 | Google Play | Google Play destination |
| LINK-POLICY-01 | Privacy, cookies, terms, refund | PHPTRAVELS policy page |
| LINK-COMPANY-01 | Contact us, About us | PHPTRAVELS company page |
| LINK-EXPLORE-01 | Best Travel Deals, Travel Documents, Travel Insurance | PHPTRAVELS explore page |

## Pricing and Booking Fixtures

Use these as non-sensitive fixture shapes. Replace placeholder values with the sandbox response contract.

```json
{
  "currency": "USD",
  "basePrice": 500.00,
  "discountPercent": 10,
  "taxes": 50.00,
  "serviceFee": 15.00,
  "expectedTotal": 515.00,
  "bookingReference": "TEST-BOOKING-001",
  "traveller": {
    "firstName": "Alex",
    "lastName": "Morgan",
    "email": "qa.booking@example.test"
  }
}
```

Test variants:

- `PRICE-VALID-01`: Base price 500.00 USD, 10% discount, defined taxes and service fee.
- `PRICE-BOUNDARY-01`: Base price 0.00, if zero-price inventory is supported.
- `PRICE-DECIMAL-01`: Base price 432.60 USD to verify decimal formatting.
- `PRICE-HIGH-01`: Base price 999999.99 USD to verify large-value formatting.
- `BOOKING-DUPLICATE-01`: Submit the same idempotency key twice and verify one booking is created.
- `BOOKING-TAMPER-01`: Change price, currency, or booking reference in a non-production request and verify rejection.

The example booking reference and email are synthetic and must not be used as credentials.

## Security Test Payloads

Use only in authorized test environments and keep execution harmless.

| Data ID | Payload | Target fields |
|---|---|---|
| SEC-XSS-01 | `<script>alert('xss')</script>` | Destination, name, visa, AI planner |
| SEC-XSS-02 | `"><img src=x onerror=alert(1)>` | Text inputs |
| SEC-HTML-01 | `<b>test</b>` | Text inputs |
| SEC-SQL-01 | `' OR '1'='1` | Search and enquiry fields |
| SEC-CRLF-01 | `test%0d%0aInjected-Header: value` | Contact fields and API inputs |
| SEC-LONG-01 | 10,000-character generated string | All free-text fields |
| SEC-UNICODE-01 | `旅行 🧳 café` | Name, destination, AI planner |
| SEC-NULL-01 | `test\\u0000value` | API and form inputs |

Expected behavior for all payloads: input is handled as data, scripts do not execute, no sensitive stack trace is shown, and the application remains responsive.

## Duplicate and Idempotency Data

| Data ID | Repeated data | Expected check |
|---|---|---|
| DUP-SEARCH-01 | Same hotel search submitted twice | Results are consistent and no duplicate booking is created. |
| DUP-VISA-01 | Same visa enquiry submitted twice | System follows the documented duplicate-submission rule. |
| DUP-AI-01 | Same AI request submitted twice | Requests do not corrupt the page or create inconsistent state. |
| DUP-BOOKING-01 | Same booking payload and idempotency key | At most one booking is created. |
| DUP-CALLBACK-01 | Same payment callback replayed | Booking status is not duplicated or incorrectly advanced. |

## Data-to-Test-Case Mapping

| Test cases | Primary data groups |
|---|---|
| TC-006 to TC-012 | Valid Hotel Search, Hotel Negative and Boundary |
| TC-013 to TC-014 | Featured Destinations and Properties, Pricing and Booking Fixtures |
| TC-015 to TC-019 | Valid Flight Search, Flight Negative and Boundary |
| TC-020 to TC-021 | Visa Enquiry |
| TC-022 to TC-023 | AI Trip Planner |
| TC-024 to TC-027 | Support and Navigation |
| TC-031 | Security Test Payloads |
| TC-032 to TC-037 | Pricing and Booking Fixtures, Duplicate and Idempotency, Security Test Payloads |
| TC-038 | Duplicate and Idempotency, controlled rate-limit data |
