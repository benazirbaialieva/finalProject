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

      
When('user provides {string} with new value {string}', async function (key, value) {
    this.requestBody = { ...this.requestBody, [key]: value };
});



When('user hits PUT {string}', async function (endpoint) {
    endpoint = endpoint + '/' + await apiClient.getRandomPatientID({ request: this.request }, this.token);

    this.response = await apiClient.putRequest(
        { request: this.request },
        endpoint,
        this.token,
        this.requestBody
    );
    expect(this.response.status()).toBe(200);
});



Then('verify response body contains {string} with {string}', async function (key, value) {
    const body = await this.response.json();
    expect(body[key]).toContain(value);
});