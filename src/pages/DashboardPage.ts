import { Page, Locator, expect} from '@playwright/test'

export class DashboardPage{

    readonly page : Page;
    readonly dashboard : Locator;
    readonly mySchedule : Locator;
    readonly patients : Locator;
    readonly appointments : Locator;
    readonly prescriptions : Locator;


    constructor(page : Page){
        this.page = page;
        this.dashboard = page.getByTestId('nav-dashboard');
        this.mySchedule = page.getByTestId('nav-my-schedule');
        this.patients = page.getByTestId('nav-patients');
        this.appointments = page.getByTestId('nav-appointments');
        this.prescriptions = page.getByTestId('nav-prescriptions');
    }

    async verifyNavigatation(locator : Locator, urlText : string){
        await locator.click();
        await expect(this.page).toHaveURL(urlText);
    }

}




// Verify all tabs are present and navigatable on dashboard navigation bar.