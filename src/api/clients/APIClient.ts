import { APIResponse, expect } from "@playwright/test";
import { APIRequestContext } from "@playwright/test";

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








}