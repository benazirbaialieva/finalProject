import { Given, When, Then, Before } from '@cucumber/cucumber'
import { APIClient, createPatientBody } from '../../api/clients/APIClient';
import { request, expect } from '@playwright/test';

const apiClient = new APIClient();

Before(async function () {
    this.request = await request.newContext();
});


Given('doctor is logged in', async function () {
    this.token = await apiClient.login({
        request : this.request,
        email : process.env.USER_EMAIL,
        password : process.env.USER_PASSWORD
    });
});

When('user hits GET {string}', async function (endpoint) {
        this.response = await apiClient.getRequest({request : this.request}, endpoint, this.token);
        console.log(await this.response.json());
});


Then('verify status code is {int}', function (expectedStatusCode) {
    expect(this.response.status()).toBe(expectedStatusCode);
});


When('user hits POST {string} with body', async function (endpoint, requestBody) {
    this.response = await apiClient.postRequest(
        { request: this.request },
        endpoint,
        this.token,
        JSON.parse(requestBody),
    );
});

When('user creates random patient using POST {string}', async function (endpoint) {
    const patientBody = createPatientBody();
    console.log(patientBody);
    this.response = await apiClient.postRequest(
        { request: this.request },
        endpoint,
        this.token,
        patientBody
    );
    expect(this.response.status()).toBe(201);

});