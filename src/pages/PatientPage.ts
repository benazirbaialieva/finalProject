import { Page, Locator, expect } from '@playwright/test'

export class PatientPage {
    readonly page : Page;
    readonly newPatientButton : Locator;
    readonly firstName : Locator;
    readonly lastName : Locator;
    readonly dob : Locator;
    readonly gender : Locator;
    readonly phone : Locator;
    readonly email : Locator;
    readonly address : Locator;
    readonly createPatientButton : Locator;
    readonly maleOption : Locator;
    readonly femaleOption : Locator;


    constructor (page : Page){
        this.page = page;
        this.newPatientButton = page.getByTestId('create-patient-btn');
        this.firstName = page.locator('#first_name');
        this.lastName = page.locator('#last_name');
        this.dob = page.locator('#dob');
        this.gender = page.locator("//button[*='Select gender']");
        this.phone = page.locator('#phone');
        this.email = page.locator('#email');
        this.address = page.locator('#address');
        this.createPatientButton = page.locator("//button[.='Create Patient']");
        this.maleOption = page.getByRole('option', { name : 'Male', exact : true});
        this.femaleOption = page.getByRole('option', { name : 'Female', exact : true});
    }


    async createPatient (firstName : string, lastName : string, dob : string, gender: string, phone : string, email : string, address : string){
        await this.newPatientButton.click();
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.dob.fill(dob);
        await this.selectGender(gender);
        await this.phone.fill(phone);
        await this.email.fill(email);
        await this.address.fill(address);
        await this.createPatientButton.click();
        console.log();
    }

    async selectGender(gender : string){
        await this.gender.click();

        switch (gender.toLowerCase()){
            case 'male' : await this.maleOption.click();
            break;
            case 'female' : await this.femaleOption.click();
            break;
        }
    }


}





