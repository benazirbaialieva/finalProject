import { Given, When, Then } from "@cucumber/cucumber";
import {
  APIClient,
  createAppointmentBody,
  createPatientBody,
} from "../../api/clients/APIClient";
import { expect } from "@playwright/test";

const apiClient = new APIClient();

Given("doctor is logged in", async function () {
  this.token = await apiClient.login({
    request: this.request,
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD,
  });
});

When("user hits GET {string}", async function (endpoint) {
  this.response = await apiClient.getRequest(
    { request: this.request },
    endpoint,
    this.token,
  );
  console.log(await this.response.json());
});

Then("verify status code is {int}", function (expectedStatusCode) {
  expect(this.response.status()).toBe(expectedStatusCode);
});

When(
  "user hits POST {string} with body",
  async function (endpoint, requestBody) {
    this.response = await apiClient.postRequest(
      { request: this.request },
      endpoint,
      this.token,
      JSON.parse(requestBody),
    );
  },
);

When(
  "user creates random patient using POST {string}",
  async function (endpoint) {
    const patientBody = createPatientBody();
    console.log(patientBody);
    this.response = await apiClient.postRequest(
      { request: this.request },
      endpoint,
      this.token,
      patientBody,
    );
    expect(this.response.status()).toBe(201);
  },
);

When(
  "user provides {string} with new value {string}",
  async function (key, value) {
    this.requestBody = { ...this.requestBody, [key]: value };
  },
);

When("user hits PUT {string}", async function (endpoint) {
  endpoint =
    endpoint +
    "/" +
    (await apiClient.getRandomPatientID({ request: this.request }, this.token));

  this.response = await apiClient.putRequest(
    { request: this.request },
    endpoint,
    this.token,
    this.requestBody,
  );
  expect(this.response.status()).toBe(200);
});

Then(
  "verify response body contains {string} with {string}",
  async function (key, value) {
    const body = await this.response.json();
    expect(body[key]).toContain(value);
  },
);

When("user hits POST {string} with body", async function (endpoint) {
  let requestBody;
  if (endpoint === "/api-patients") {
    requestBody = createPatientBody();
  } else if (endpoint === "/api-appointments") {
    requestBody = await createAppointmentBody(this.request, this.token);
  } else {
    throw new Error(`Unsupported endpoint: ${endpoint}`);
  }
  console.log(requestBody);
  this.response = await apiClient.postRequest(
    { request: this.request },
    endpoint,
    this.token,
    requestBody,
  );
});
