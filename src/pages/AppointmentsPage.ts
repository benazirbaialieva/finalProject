import { Page, Locator, expect } from '@playwright/test'

export class AppointmentsPage {
    readonly page : Page;
    readonly createAppointmentButton : Locator;
    readonly patientSelect : Locator;
    readonly providerSelect : Locator;
    readonly date : Locator;
    readonly startTime : Locator;
    readonly endTime : Locator;
    patientList : Locator[];
    providerList : Locator[];
    patientSearchList : Locator[];
    readonly scheduleButton : Locator;
    readonly allProvidersFilter : Locator;
    readonly startDateFilter : Locator;
    providerName : string;
    patientName : string;
    selectedDate : string;


    constructor (page : Page) {
        this.page = page;
        this.createAppointmentButton = page.getByText('Schedule Appointment');
        this.patientSelect = page.getByTestId('create-appt-patient-select');
        this.providerSelect = page.getByTestId('create-appt-provider-select');
        this.date = page.getByTestId('create-appt-date-input');
        this.startTime = page.getByTestId('create-appt-start-time-input');
        this.endTime = page.getByTestId('create-appt-end-time-input');
        this.scheduleButton = page.getByTestId('create-appt-submit-button');
        this.patientList = [];
        this.providerList = [];
        this.patientSearchList = [];
        this.allProvidersFilter = page.getByTestId('filter-provider');
        this.startDateFilter = page.getByLabel('Filter from date');
        this.providerName = "";
        this.patientName = "";
        this.selectedDate = "";
    }

    async getRandomInt(min: number, max: number): Promise<number> {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    

    async selectRandomPatient() {
        await this.patientSelect.click();
        await this.page.waitForSelector("//div[@role='listbox']/div/div/span[2]");
        this.patientList = await this.page.locator("//div[@role='listbox']/div/div/span[2]").all();
        
        let length = this.patientList.length;

        let randomIndex = await this.getRandomInt(0, length - 1);
        let name = await this.patientList[randomIndex].textContent();
        console.log(name);
        this.patientName = name!;
        await this.patientList[randomIndex].click();
    }


    async selectRandomProvider(){
        await this.providerSelect.click();
        this.providerList = await this.page.locator("//div[@role='listbox']/div/div/span[2]").all();
        let length = this.providerList.length;

        let randomIndex = await this.getRandomInt(0, length - 1);
        let name = await this.providerList[randomIndex].textContent();
        console.log(name);
        this.providerName = name!;
        await this.providerList[randomIndex].click();
    }


    async selectPatient(name : string){

    }


    async selectProvider(name : string){
        await this.page.waitForSelector("//div[@role='listbox']/div/div/span[2]");
        this.providerList = await this.page.locator("//div[@role='listbox']/div/div/span[2]").all();

        for (let provider of this.providerList){
            let providerName = await provider.textContent();
            if (providerName == name){
                await provider.click();
                break;
            }
        }
    }


    async getRandomFutureDate(){
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 7);
        const isoDate = futureDate.toISOString().split('T')[0];
        return isoDate;
    }

    async selectRandomFutureDate(){
        await this.date.click();
        let date = await this.getRandomFutureDate();
        await this.date.fill(date);
        this.selectedDate = date;
    }


    async scheduleAppointment(){
        await this.createAppointmentButton.click();
        await this.selectRandomPatient();
        await this.selectRandomProvider();
        await this.selectRandomFutureDate();

        const timeSlots = [
            { start: '06:00', end: '07:00' },
            { start: '08:00', end: '09:00' },
            { start: '10:00', end: '11:00' },
            { start: '12:00', end: '13:00' },
            { start: '14:00', end: '15:00' },
            { start: '16:00', end: '17:00' },
            { start: '18:00', end: '19:00' },
            { start: '20:00', end: '21:00' },
        ];

        let scheduled = false;
        for (const slot of timeSlots) {
            await this.startTime.fill(slot.start);
            await this.endTime.fill(slot.end);
            await this.scheduleButton.click();

            try {
                await this.page.waitForSelector('[data-testid="create-appointment-dialog"]', { state: 'hidden', timeout: 3000 });
                scheduled = true;
                break;
            } catch {
                // Conflict — try next time slot
            }
        }

        if (!scheduled) {
            throw new Error('Could not schedule appointment — all time slots have conflicts for this provider and date');
        }

        await this.allProvidersFilter.click();
        await this.selectProvider(this.providerName);

        await expect(this.page.locator('table')).toContainText(this.patientName);
    }









}