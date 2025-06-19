const { channel } = require('diagnostics_channel');
const { config } = require('./config');
const { test, expect } = require('./setup');
const { time } = require('console');
const { isNumber } = require('util');


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

// Helper function to select passenger count
async function selectPassenger(webApp, totalPassenger) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select passenger count',
    });
    await webApp.locator(`xpath=//div[@class='ss-single-selected']`).click();
    await webApp.locator(`xpath=//div[normalize-space()='${totalPassenger} Orang']`).click(); // kalau banyak pemesan, tambahin "Orang"
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
async function inputPassengerData(webApp) {
    const passengerData = config.passenger_data;

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
        await webApp.locator("id=penumpang1").fill(config.passenger_data.custName)
    }

    // Fill in other passenger names
    const totalPassengers = config.journey.passenger_count || 1;

    // If pemesan == penumpang1, start from penumpang2
    const startIndex = passengerData.cust_name_same !== 0 ? 2 : 1;

    for (let i = startIndex; i <= totalPassengers; i++) {
        const passenger = passengerData.passengers[i - 1];
        if (passenger?.name) {
            await webApp.locator(`#penumpang${i}`).fill(passenger.name);
        }
    }
    
    //click button "Selanjutnya"
    // await webApp.locator(`xpath=//button[@id='submit']`).click();
    await Promise.all([
    webApp.waitForNavigation({ waitUntil: 'load' }),
    webApp.locator(`xpath=//button[@id='submit']`).click(),
    ]);

}

// Helper function to select seat
async function selectSeat(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select seats for each passenger',
    });

    const passengers = config.passenger_data.passengers;

    for (let i = 0; i < passengers.length; i++) {
        const passenger = passengers[i];
        const passengerIndex = i + 1;

    // Wait for and click passenger block
        const passengerBlock = webApp.locator(`xpath=//div[normalize-space()='${passengerIndex}']`);
        await expect(passengerBlock).toBeVisible({ timeout: 5000 });
        await passengerBlock.click();

        await webApp.waitForTimeout(500); //pause before seat selection

    // Seat selection
        const seatNumber = passenger.seat_number;
        const seatLocator = webApp.locator(`xpath=//p[normalize-space()='${seatNumber}']`);
        await expect(seatLocator).toBeVisible({ timeout: 5000 });
        await seatLocator.click();
    }

    // Finally, submit the selection
    await webApp.locator(`xpath=//button[@id='submit']`).click(); 

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
    await selectPassenger(webApp, config.journey.passenger_count);
    if (config.journey.passengerCount > 1) {
        await selectPassenger(webApp, config.journey.passenger_count);
    }
    
    // Search for available schedules
    await webApp.locator("xpath=//button[@class='btn btn-cari btn-block h-100 br-16']").click();
    
    // Select a schedule
    await selectSchedule(webApp);


    
    // Input passenger details
    await inputPassengerData(webApp);
    
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



