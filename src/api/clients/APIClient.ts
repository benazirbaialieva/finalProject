import { APIResponse, expect } from "@playwright/test";
import { APIRequestContext } from "@playwright/test";
import { faker } from '@faker-js/faker';

interface LoginParams {
    request: APIRequestContext;
    response: APIResponse;
    email: string;
    password: string;
    endpoint : string;
    token : string;
}

export class APIClient {

    async login ({ request, email, password }): Promise<string>{
        const url = process.env.BASE_URL! + '/api-auth/login';

        console.log('URL TO PRINT: '+url);

        const response = await request.post(url,
            {
                headers : {
                    Accept: 'application/json'
                },
                data : {
                    "email": email,
                    "password": password
                }
            }
        );

        expect(response.status()).toBe(200);

        const responseBody = await response.json()
        return responseBody.token;
    }

    async getRequest({ request }, endpoint: any, token: any) : Promise<APIResponse>{
        const url = process.env.BASE_URL! + endpoint;

        const response = await request.get(url,
            {
                headers : {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response;
    }

    async postRequest({ request }, endpoint: string, token: string, data: object): Promise<APIResponse> {
        const url = process.env.BASE_URL! + endpoint;
        const response = await request.post(url, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data,
        });
        return response;
    }
}

export function createPatientBody() {
    return {
        "first_name": faker.person.firstName(),
        "last_name": faker.person.lastName(),
        "dob": faker.date.birthdate({ min: 18, max: 110, mode: 'age' }).toISOString().split('T')[0],
        "gender": faker.helpers.arrayElement(['Male', 'Female']),
        "phone": faker.phone.number(),
        "email": faker.internet.email(),
        "address": faker.location.streetAddress(),
        "emergency_contact_name": faker.person.fullName(),
        "emergency_contact_phone": faker.phone.number(),
        "insurance_provider": faker.company.name(),
        "insurance_policy_number": faker.string.alphanumeric(10).toUpperCase()
    };
}
