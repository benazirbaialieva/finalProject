@ui
Feature: Appointment scheduling

@createAppointmentUI
Scenario: verify doctor can create appointment
    Given doctor logs in successfully
    When user navigates to "/appointments"
    And user schedules an appointment
    Then verify appointment is displayed in the list