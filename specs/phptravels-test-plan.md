# PHPTRAVELS Test Plan

## Application Overview

Functional, validation, navigation, accessibility, integration, security, and responsive test coverage for the publicly accessible PHPTRAVELS travel booking homepage at https://phptravels.net/. Each test starts from a fresh page state. External payment, inventory, visa, AI, email, phone, WhatsApp, and app-store integrations should be stubbed or verified only up to their navigable boundary unless dedicated test credentials and sandbox environments are available.

## Test Scenarios

### 1. Homepage and booking-mode navigation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Homepage loads with primary travel booking modes

**File:** `tests/ui/homepage-booking-modes.spec.ts`

**Steps:**
  1. Navigate to https://phptravels.net/
    - expect: The page loads without a blocking error.
    - expect: The page title and PHPTRAVELS branding are visible.
    - expect: The Stays, Flights, Visa, and AI Trip Planner modes are visible and available for interaction.
  2. Inspect the hero area and featured-properties section.
    - expect: The hero heading and supporting text are visible.
    - expect: Featured properties show destination, price, discount where applicable, rating, and property name.

#### 1.2. User can switch between booking modes

**File:** `tests/ui/booking-mode-tabs.spec.ts`

**Steps:**
  1. Open the homepage and select Stays.
    - expect: The Stays tab becomes selected.
    - expect: The hotel search interface is displayed.
  2. Select Flights, Visa, and AI Trip Planner one at a time.
    - expect: Each selected tab becomes active.
    - expect: The corresponding form or input area is displayed.
    - expect: The previously selected mode is no longer active.

#### 1.3. Featured destination filters update properties

**File:** `tests/ui/featured-destination-filters.spec.ts`

**Steps:**
  1. Open the homepage and select each featured destination filter: Dubai, New York, Barcelona, Tokyo, Maldives, and Gan Island.
    - expect: The selected destination filter is visibly active.
    - expect: Displayed properties correspond to the selected destination or the site shows a clear no-results state.
    - expect: Property cards remain usable and do not overlap or lose required details.

### 2. Hotel stays

**Seed:** `tests/seed.spec.ts`

#### 2.1. Hotel search accepts valid booking criteria

**File:** `tests/ui/hotel-search-positive.spec.ts`

**Steps:**
  1. Open the Stays search form.
    - expect: Destination, check-in, check-out, room, and guest controls are available with clear labels or accessible names.
  2. Enter a valid destination, a future check-in date, a later check-out date, one room, and two adults.
    - expect: The entered values remain visible and are formatted correctly.
  3. Submit the hotel search.
    - expect: The site navigates to or renders hotel results.
    - expect: The result context reflects the selected destination and dates.
    - expect: A loading, results, or explicit no-results state is displayed rather than a blank response.

#### 2.2. Hotel search validates missing and invalid criteria

**File:** `tests/ui/hotel-search-validation.spec.ts`

**Steps:**
  1. Submit the hotel search with the destination empty.
    - expect: The search is blocked or an explicit destination validation message is shown.
  2. Submit with missing dates.
    - expect: The search is blocked or required date validation is shown.
  3. Set check-out equal to or earlier than check-in and submit.
    - expect: The invalid date range is rejected with a clear message or unavailable date selection.
  4. Use a past date where future dates are required.
    - expect: Past dates cannot be selected or the search is rejected with a clear explanation.

#### 2.3. Hotel guest and room boundaries are handled

**File:** `tests/ui/hotel-search-boundaries.spec.ts`

**Steps:**
  1. Set the minimum supported room and guest values.
    - expect: The values are accepted and remain stable.
  2. Try zero guests, negative values if editable, and values above the supported maximum.
    - expect: Invalid values cannot be entered or produce clear validation.
    - expect: The layout remains stable when values change.
  3. Use a same-day stay and a maximum-duration stay.
    - expect: The site applies the documented business rule consistently.
    - expect: The result or validation state is clear.

#### 2.4. Featured property opens a usable booking path

**File:** `tests/ui/featured-property-navigation.spec.ts`

**Steps:**
  1. Select a featured property such as Burj Al Arab.
    - expect: The property detail or booking page opens.
    - expect: The property name, location, price, and booking context are visible.
  2. Inspect the property booking controls.
    - expect: A user can continue, search availability, or receive a clear unavailable state.
    - expect: No sensitive information is exposed before booking.

### 3. Flights, visa, and AI planner

**Seed:** `tests/seed.spec.ts`

#### 3.1. Flight search accepts valid one-way and round-trip criteria

**File:** `tests/ui/flight-search-positive.spec.ts`

**Steps:**
  1. Open the Flights mode.
    - expect: Origin, destination, travel dates, trip type, and passenger controls are available.
  2. Enter valid origin and destination airports, future dates, and a valid passenger count.
    - expect: The values are displayed correctly.
  3. Submit a one-way search and then a round-trip search using independent fresh states.
    - expect: Each search uses the selected trip type.
    - expect: Results, loading, or a clear no-results state is displayed.
    - expect: The origin and destination are preserved in the search context.

#### 3.2. Flight search rejects invalid criteria

**File:** `tests/ui/flight-search-validation.spec.ts`

**Steps:**
  1. Submit without an origin or without a destination.
    - expect: The search is blocked or a required-field message is shown.
  2. Use identical origin and destination airports.
    - expect: The search is rejected with a clear validation message.
  3. Use invalid dates or an invalid passenger count.
    - expect: The invalid input is prevented or rejected with an understandable message.

#### 3.3. Visa mode handles enquiry input

**File:** `tests/ui/visa-enquiry.spec.ts`

**Steps:**
  1. Open the Visa mode.
    - expect: Visa-related fields or an enquiry action are visible.
  2. Submit the form with valid required contact and travel details.
    - expect: The request is submitted or a controlled confirmation state is shown.
  3. Submit with missing, malformed, or excessively long contact details.
    - expect: Submission is blocked or field-level validation is displayed.
    - expect: Entered data is not reflected as executable markup.

#### 3.4. AI Trip Planner handles valid and invalid requests

**File:** `tests/ui/ai-trip-planner.spec.ts`

**Steps:**
  1. Open AI Trip Planner and enter a valid request such as a round trip from Dubai to Paris in October for two adults.
    - expect: The request is accepted.
    - expect: A response, loading state, or clear service-unavailable state is shown.
  2. Submit empty, meaningless, and very long text.
    - expect: Empty input is rejected or prompted for more detail.
    - expect: Unsupported input receives a controlled response.
    - expect: The page remains responsive and does not expose internal errors.

### 4. Navigation, support, and content links

**Seed:** `tests/seed.spec.ts`

#### 4.1. Footer informational links resolve correctly

**File:** `tests/ui/footer-links.spec.ts`

**Steps:**
  1. Open each Company, Support, and Explore footer link.
    - expect: Each link navigates to the intended PHPTRAVELS page or an explicitly supported external destination.
    - expect: The destination page loads without a broken-page error.

#### 4.2. Support and app links use correct destinations

**File:** `tests/ui/support-and-app-links.spec.ts`

**Steps:**
  1. Inspect email, phone, WhatsApp, App Store, and Google Play links.
    - expect: Email links use mailto URLs.
    - expect: Phone links use tel URLs.
    - expect: WhatsApp links point to WhatsApp.
    - expect: App Store and Google Play labels point to their matching stores.
    - expect: Any mismatch is reported as a defect.

#### 4.3. Branding and content consistency

**File:** `tests/ui/content-consistency.spec.ts`

**Steps:**
  1. Inspect the header, footer, property cards, prices, discounts, and ratings.
    - expect: Branding is consistently spelled.
    - expect: Prices use consistent currency and decimal formatting.
    - expect: Discount and rating values are present and visually associated with the correct property.
    - expect: Text does not overlap or become truncated at supported viewports.

### 5. Accessibility and responsive behavior

**Seed:** `tests/seed.spec.ts`

#### 5.1. Primary homepage controls are keyboard accessible

**File:** `tests/ui/accessibility-keyboard.spec.ts`

**Steps:**
  1. Navigate through the homepage using only the keyboard.
    - expect: Focus moves through interactive controls in a logical order.
    - expect: Focused controls have a visible focus indicator.
    - expect: Tabs, forms, links, and buttons can be activated from the keyboard.
  2. Inspect headings, tab roles, labels, and image alternative text.
    - expect: Heading hierarchy is meaningful.
    - expect: Booking modes expose correct selected-state semantics.
    - expect: Form controls have accessible names.
    - expect: Meaningful images have useful alternative text.

#### 5.2. Homepage remains usable on desktop, tablet, and mobile

**File:** `tests/ui/responsive-homepage.spec.ts`

**Steps:**
  1. Load the homepage at desktop, tablet, and mobile viewport sizes.
    - expect: The page remains readable and interactive at each viewport.
    - expect: The mobile menu can be opened and closed.
    - expect: No essential content or control is clipped, overlapped, or inaccessible.

### 6. Security and reliability checks

**Seed:** `tests/seed.spec.ts`

#### 6.1. User-controlled fields are sanitized

**File:** `tests/ui/input-sanitization.spec.ts`

**Steps:**
  1. Enter harmless XSS test strings and special characters into destination, traveller, visa, and AI planner fields.
    - expect: The values are treated as text.
    - expect: No script executes.
    - expect: The UI remains stable and error messages do not reveal implementation details.

#### 6.2. Booking flow does not expose sensitive data

**File:** `tests/ui/sensitive-data-handling.spec.ts`

**Steps:**
  1. Inspect URLs, visible error messages, and confirmation boundaries while using non-production test data.
    - expect: Payment or personal data is not unnecessarily placed in URLs.
    - expect: Sensitive values are not echoed in errors or page content.
    - expect: External payment redirects and callbacks use secure destinations where applicable.

#### 6.3. External-service failures have controlled states

**File:** `tests/ui/external-service-failure-states.spec.ts`

**Steps:**
  1. Simulate or observe unavailable inventory, AI, visa, and payment service responses in a controlled environment.
    - expect: The user sees a clear error or retry state.
    - expect: The page does not remain indefinitely blocked.
    - expect: No raw stack trace or provider secret is exposed.
