Feature: OrangeHRM user journeys

  Scenario: User posts a buzz message
    Given User opens OrangeHRM
    When User logs in with username "Admin" and password "admin123"
    And User opens the Buzz page
    And User posts the message "hi, i was deployed today"
    Then User should see the buzz "hi, i was deployed today"

  Scenario: User updates personal details and searches directory
    Given User opens OrangeHRM
    When User logs in with username "Admin" and password "admin123"
    And User opens the My Info page
    And User updates personal details with first name "sahil", middle name "kumar", and last name "singh"
    And User selects nationality "Spanish"
    And User selects date of birth "2003-03-21"
    And User selects blood type "O+"
    And User saves personal details
    And User searches directory for "sahil kumar singh"
    Then User should see "sahil kumar singh" in directory results
