Feature: Authenticated navigation across protected pages

  @TC-003
  Scenario: Authenticated user navigates between Deals and Invoices and stays authenticated after refresh
    Given I am logged into FreeCRM with valid credentials
    When I open the Deals page
    And I navigate to the Invoices page
    And I refresh the current protected page
    Then I should remain in an authenticated session on the Invoices page
    When I navigate back to the Deals page
    Then I should see the Deals page in an authenticated session