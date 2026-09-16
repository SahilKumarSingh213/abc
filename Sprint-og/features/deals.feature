Feature: Deal creation validation and persistence

  @TC-009
  Scenario: Invalid deal submission is rejected
    Given I am logged into FreeCRM with valid credentials
    And I open the New Deal form
    When I submit the New Deal form without a title
    Then I should see deal validation feedback
    And the New Deal form should remain open without a successful save

  @TC-010
  Scenario: Valid deal is saved once and can be found again
    Given I am logged into FreeCRM with valid credentials
    And I open the New Deal form
    When I create a valid deal with unique data
    Then the deal should be saved and visible in the Deals list