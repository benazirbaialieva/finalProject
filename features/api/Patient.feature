Feature: all tests related to patient module

Scenario: verify GET patients return data
    Given doctor is logged in
    When user hits GET "/api-patients"
    Then verify status code is 200


@createPatient
Scenario: verify doctor can create patient with POST
    Given doctor is logged in
    When user hits POST "/api-patients" with body 
    """
    {
        "first_name": "Bena",
        "last_name": "Codewiser",
        "dob": "1996-05-20",
        "gender": "Male",
        "phone": "string",
        "email": "benazircodewise@gmail.com",
        "address": "string",
        "emergency_contact_name": "string",
        "emergency_contact_phone": "string",
        "insurance_provider": "string",
        "insurance_policy_number": "string"
    }
    """
    Then verify status code is 201


@createRandomPatient
Scenario: verify doctor can create patient with POST
    Given doctor is logged in
    When user creates random patient using POST "/api-patients"
    Then verify status code is 201



Scenario: verify GET appointments return data
    Given doctor is logged in
    When user hits GET "/api-appointments"
    Then verify status code is 200
