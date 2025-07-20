Feature: User authentication tests
  In order to ensure the security of the application
  As a user
  I want to be able to log in and log out successfully

Background:
    Given I navigates to the application
    And I am on the login page

  Scenario: Successful login with valid credentials
    When I enter valid username "demousername" and password "demopassword"
    And I click the login button
    Then I should see a welcome message

  Scenario: Unsuccessful login with invalid credentials
    When I enter invalid username "wronguser" and password "wrongpass"
    And I click the login button
    Then I should see an error message


