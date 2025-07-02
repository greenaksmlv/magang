const { channel } = require('diagnostics_channel');
const { config } = require('./config');
const { test, expect } = require('./setup');

/**
 * Memilih lokasi keberangkatan dari dropdown asal/departure
 * @param {object} webApp - Objek halaman dari Playwright
 * @param {string} departure - Nama outlet keberangkatan
 */

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

/**
 * Memilih tujuan perjalanan dari dropdown tujuan/arrival
 * @param {object} webApp 
 * @param {string} arrival - Nama outlet tujuan 
 */

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

/**
 * Memilih tanggal keberangkatan dari kalender
 * @param {object} webApp 
 * @param {string} date - Format tanggal contoh: "July 23, 2025" 
 */

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

/**
 * Menentukan jumlah penumpang dan klik tombol cari
 * @param {object} webApp 
 * @param {number} totalPassenger 
 */

// Helper function to select passenger count
async function selectPassenger(webApp, totalPassenger) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select passenger count',
    });
    await webApp.locator(`xpath=//div[@class='ss-single-selected']`).click();
    await webApp.locator(`xpath=//div[normalize-space()='${totalPassenger} Orang']`).click(); // kalau banyak pemesan, tambahin "Orang"

    // button search
    await webApp.locator(`xpath=//button[@class='btn btn-cari btn-block h-100 br-16']`).click();
}

/**
 * Memilih jadwal keberangkatan pertama yang tersedia 
 */

// Helper function to select schedule
async function selectSchedule(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select travel schedule',
    });
    const scheduleButton = webApp.locator(`xpath=(//button[@class='btn btn-sm color-primary br-16 py-2 px-4 mb-1'][normalize-space()='Pilih'])[1]`);
    await scheduleButton.click();
}

/**
 * Mengisi data pemesan dan penumpang yang disesuaikan dengan config.js 
 * Mengklik checkbox apabila pemesan adalah penumpang
 * Apabila bukan penumpang, maka akan mengisi secara manual
 */

// Helper function to input passenger data
async function inputPassengerData(webApp) {
    const passengerData = config.passenger_data;
    const passengers = passengerData.passengers;
    const totalPassengers = passengers.length;

    test.info().annotations.push({
        type: 'allure.step',
        value: 'Input passenger details',
    });

    // Fill buyer details
    await webApp.locator(`xpath=//input[@id='pemesan']`).fill(passengerData.name);
    await webApp.locator(`xpath=//input[@placeholder='Masukkan Email']`).fill(passengerData.email);
    await webApp.locator(`xpath=//input[@placeholder='Masukkan No. Telpon']`).fill(passengerData.phone_number);

    // Handle "Pemesan adalah penumpang" checkbox
    if (passengerData.cust_name_same != 0) {
        await webApp.locator(`xpath=//label[normalize-space()='Pemesan adalah penumpang']`).click();
    } else {
        // If not same, fill the first passenger manually
        await webApp.locator(`xpath=//input[@id='penumpang1']`).fill(passengerData.custName);
    }

    // Buyer = passenger
    const startIndex = passengerData.cust_name_same != 0 ? 1 : 0;

    for (let i = startIndex; i < totalPassengers; i++) {
        const passenger = passengers[i];
        if (passenger?.name) {
            await webApp.locator(`xpath=//input[@id='penumpang${i + 1}']`).fill(passenger.name);
        }
    }

    //click button "Selanjutnya"
    await webApp.locator(`xpath=//button[@id='submit']`).click();
}

/**
 * Memilih kursi sesuai dengan nama dan nomor yang ada di config.js
 * Apabila penumpang > 1 maka, akan klik nama penumpang lalu akan memilih nomor kursi
 */

// Helper function to select seat
async function selectSeat(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select seat',
    });

    const passengers = config.passenger_data.passengers;

    for (let i = 0; i < passengers.length; i++) {
        const passenger = passengers[i];
        const passengerIndex = i + 1;

        console.log(`Select seat ${passenger.seat_number} for passenger ${passenger.name}`);

    // Wait for and click passenger block
        const passengerBlock = webApp.locator(`xpath=//div[contains(text(),'${passenger.name}')]`);
        await expect(passengerBlock).toBeVisible({ timeout: 10000 }); // safer timeout
        await passengerBlock.click();

        await webApp.waitForTimeout(1000); //pause berfore seat selection
    
    // Seat selection
        const seatLocator = webApp.locator(`xpath=//p[normalize-space()='${passenger.seat_number}']`);
        await expect(seatLocator).toBeVisible({ timeout: 5000 });
        await seatLocator.click();
    }

    // Submit selection
    await webApp.locator(`xpath=//button[@id='submit']`).click();
}

/**
 * Menggunakan kode vocher yang valid
 */

// Helper function to use voucher
async function usingVoucher(webApp, voucherCode) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'use voucher',
    });

    if(voucherCode != ''){
        const buttonVoucher = webApp.locator(`xpath=//button[@id='btnListVoucher']`);
        await expect(buttonVoucher).toBeVisible({ timeout: 1000 });
        await buttonVoucher.click();
        await webApp.locator(`xpath=//input[@id='kodeVouchers']`).fill(voucherCode);
        await webApp.locator(`xpath=//button[@id='btnCekVoucher']`).click();
    } else {
        return;
    }
}

/**
 * Memilih metode pembayaran dari label
 */

// Helper function to select payment method
async function selectPayment(webApp, channel, paymentMethod) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Select payment method',
    });

    // const section = webApp.locator(`xpath=//p[normalize-space()='Pilih Metode Pembayaran']`).click();

    const payment = webApp.locator(`xpath=//label[@for='${paymentMethod}']`).click();
}

/**
 * Menyetujui dan mengklik checkbox syarat dan ketentuan, lalu submit
 */

// Helper function checking buttin syarat n ketentuan
async function checkingTnc(webApp) {
    const tncButton = webApp.locator(`xpath=//label[contains(text(),'Silahkan tandai kotak ini sebagai bukti bahwa anda')]`);
    await tncButton.click();

    await webApp.locator(`xpath=//button[@id='submit']`).click();
}

/**
 * Pengujian utama untuk proses pemesanan tiket
 * 
 * Allure Labels:
 * - feature: Reservation
 * - severity: critical
 * - platform: web
 * - status: pass
 */

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



