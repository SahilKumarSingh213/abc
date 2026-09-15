Feature: FreeCRM authentication

  @TC-002
  Scenario: Valid user can sign in and clear transient overlays
    Given I am logged into FreeCRM with valid credentials
    Then I should see the authenticated FreeCRM area