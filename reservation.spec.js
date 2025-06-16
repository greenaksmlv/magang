const { channel } = require('diagnostics_channel');
const { config } = require('./config');
const { test, expect } = require('./setup');

// Helper function to pick departure
async function pickDeparture(webApp, departure) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick departure',
    });
    await expect(webApp.locator(`xpath=//span[@id='label-asal']`)).toBeVisible();
    await webApp.locator(`xpath=//span[@id='label-asal']`).click();
    await webApp.locator(`xpath=//div[@class='dropdown-item outlet-item d-flex align-items-center pl-5']//span[contains(text(),'${departure}')]`).click();
}

// Helper function to pick arrival
async function pickArrival(webApp, arrival) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Pick arrival',
    });
    await expect(webApp.locator(`xpath=//span[@id='label-tujuan']`)).toBeVisible();
    await webApp.locator(`xpath=//span[@id='label-tujuan']`).click();
    await webApp.locator(`xpath=//div[@class='dropdown-menu listoutlet show']//div[@class='div-listoutlet overflow-auto']//div//div//span[contains(text(),'${arrival}')]`).click();
}

// Helper function to select date
async function selectDate(webApp, date) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select travel date',
    });
    const dateField = webApp.locator(`xpath=//span[@id='label-tglpergi']`);
    await expect(dateField).toBeVisible();
    await dateField.click();
    
    // Next month
    await webApp.locator(`xpath=//span[@class='flatpickr-next-month']`).click();
    await webApp.locator(`xpath=//span[@aria-label='${date}']`).click();
}

// Helper function to input passenger data for multiple passengers
async function inputAllPassengerData(webApp) {
    const passengers = config.passenger_data.passengers;
    for (let i=0; i<passengers.length; i++) {
        const passenger = passengers[i];

        if (i ===0 ) {
            await inputBookerPassengerData(
                webApp,
                passenger.name,
                config.passenger_data.booker.email,
                config.passenger_data.booker.phone_number,
                config.passenger_data.cust_name_same,
                config.passenger_data.custName
            );
        } else {
            await inputPassengerNameOnly(webApp, i + 1, passenger.name);
        }

        await selectSeat(webApp, passenger.seat_number || (i + 1));
    }
}

// Helper function to select passenger count
async function selectPassenger(webApp, totalPassenger) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select passenger count',
    });
    await webApp.locator(`xpath=//div[@class='ss-single-selected']`).click();
    
    const passengerCountOption = webApp.locator(`xpath=//div[normalize-space()='${totalPassenger}']`);
    await expect(passengerCountOption).toBeVisible({ timeout: 3000 });
    await passengerCountOption.click();
}

// Helper function to select schedule
async function selectSchedule(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select travel schedule',
    });
    const scheduleButton = webApp.locator(`xpath=(//button[@class='btn btn-sm color-primary br-16 py-2 px-4 mb-1'][normalize-space()='Pilih'])[1]`);
    await scheduleButton.click();
}

// Helper function to input passenger data
async function inputPassengerData(webApp, name, email, phoneNumber, custName) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Input passenger details',
    });
    await webApp.locator(`xpath=//input[@id='pemesan']`).fill(config.passenger_data.name);
    await webApp.locator(`xpath=//input[@placeholder='Masukkan Email']`).fill(config.passenger_data.email);
    await webApp.locator(`xpath=//input[@placeholder='Masukkan No. Telpon']`).fill(config.passenger_data.phone_number);
    
    //untuk klik checkbox "Pemesan adalah penumpang"
    if(config.passenger_data.cust_name_same != 0){
        await webApp.locator("xpath=//label[@for='samacheck']").click()
    } else{
         //Input cust name
        await webApp.locator("id=penumpang1").
        fill(config.passenger_data.custName)
    }

    //click button "Selanjutnya"
    await webApp.locator(`xpath=//button[@id='submit']`).click();
}

// Helper function to select seat
async function selectSeat(webApp, numSeat) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select seat',
    });
    const seat = webApp.locator(`xpath=//div[@id='${numSeat}']//p[1]`);
    await seat.click();

    await webApp.locator(`xpath=//button[normalize-space()='Selanjutnya']`).click();
    
}

// Helper function to use voucher
async function usingVoucher(webApp, voucherCode) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Use voucher',
    });

    if(voucherCode != ''){
        const buttonVoucher = webApp.locator("id=btnListVoucher")
        await expect(buttonVoucher).toBeVisible({timeout: 1000})
        await buttonVoucher.click()
        await webApp.locator("id=KodeVouchers").fill(voucherCode)

        await webApp.locator("id=btnCekVoucher").click()
    } else{
        return
    }
    
}


// Helper function to select payment method
async function selectPayment(webApp, paymentMethod) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select payment method',
    });

    const section = webApp.locator(`xpath=//p[normalize-space()='Pilih Metode Pembayaran']`);
    await section.click(); // expand first

    // const option = webApp.locator(`xpath=//p[normalize-space()='Pembayaran Instan']`);
    // await expect(option).toBeVisible({ timeout: 10000 });
    // await option.click();

    const payment = webApp.locator(`xpath=//img[@alt='${paymentMethod}']`);
    await payment.click(config.payment.collapse1);
}

// Helper function to checking button syarat n ketentuan
async function checkingTnc(webApp) {
    const tncButton = webApp.locator(`xpath=//label[contains(text(),'Silahkan tandai kotak ini sebagai bukti bahwa anda')]`);
    await tncButton.click()

    await webApp.locator(`xpath=//button[@id='submit']`).click();
}

// Main test
test('reservation', async ({ webApp }) => {
    // Add Allure Labels for better categorization in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Reservation',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'severity: critical',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'platform: web',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'status: pass',
    });

    // Start the reservation process
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Start reservation process',
    });

    // Pick departure and arrival
    await pickDeparture(webApp, config.journey.departure);
    await webApp.waitForTimeout(1000); // Replace pageWaitUntil with explicit timeout
    await pickArrival(webApp, config.journey.arrival);
    
    // Select date and passenger count if needed
    await selectDate(webApp, config.journey.date);
    //if (config.journey.passenger_count > 1) {
        await selectPassenger(webApp, config.journey.passenger_count);
    //}
    
    // Search for available schedules
    await webApp.locator("xpath=//button[@class='btn btn-cari btn-block h-100 br-16']").click();
    
    // Select a schedule
    await selectSchedule(webApp);
    
    // Input passenger details
    await inputAllPassengerData(webApp);
    
    // Select seat
    await selectSeat(webApp, config.passenger_data.seat_number);

    if(config.voucher.freepass != ''){
        await usingVoucher(webApp, config.voucher.freepass)
    }
    else if(config.voucher.harga != ''){
        await usingVoucher(webApp, config.voucher.harga)
    }
    else if(config.voucher.diskon != ''){
        await usingVoucher(webApp, config.voucher.diskon)
    }

    // Select payment method
    await selectPayment(webApp, config.payment.collapse1.gopay);
    
    // Accept terms and submit
    await checkingTnc(webApp)
    
});



