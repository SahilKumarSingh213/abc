Feature: Deals landing smoke and empty-state usability

  @TC-004
  Scenario: Deals page renders its primary controls and remains usable in the observed state
    Given I am logged into FreeCRM with valid credentials
    When I open the Deals page
    Then I should see the Deals page primary controls
    And I should see the Deals empty-state usability evidence