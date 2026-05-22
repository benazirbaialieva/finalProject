Feature: all tests related to appointments

Scenario: verify GET appointments return data
    Given doctor is logged in
    When user hits GET "/api-appointments"
    Then verify status code is 200


Scenario: POST request
    Given doctor is logged in
    When user hits POST "/api-appointments" with body
    Then verify status code is 201


Scenario: verify doctor can update appointment with PUT
    Given doctor is logged in
    When user provides "key" with new value "value"
    And user provides "key" with new value "value"
    And user hits PUT "/api-appointments"
    Then verify status code is 200
    And verify response body contains "first_name" with "UpdatedName"