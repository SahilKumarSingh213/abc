@TC-001
Feature: Protected route access control

  Scenario: Unauthenticated user opening Deals and Invoices is redirected to login
    Given I open the protected "/deals" route as an unauthenticated user
    Then I should be redirected to the login page
    When I open the protected "/invoices" route as an unauthenticated user
    Then I should be redirected to the login page