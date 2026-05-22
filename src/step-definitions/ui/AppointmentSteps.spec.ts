import { When, Then } from "@cucumber/cucumber";
import { AppointmentsPage } from "../../pages/AppointmentsPage";
import { CustomWorld } from "../../utils/world";

When('user schedules an appointment', async function (this: CustomWorld) {
    const appontmentsPage = new AppointmentsPage(this.page);
    await appontmentsPage.scheduleAppointment();
});

Then('verify appointment is displayed in the list', async function () {
     
});