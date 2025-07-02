const { config } = require('./config');
const { test, expect } = require('./setup');

/**
 * Fungsi untuk mengakses halaman "Cara Bayar"
 * Memeriksa instruksi pembayarannya berdasarkan metode yang ditentukan
 * 
 * Alur:
 * - Klik link "Cara Bayar" yang berada di footer
 * - Verifikasi judul halaman muncul
 * - Untuk setiap metode pembayaran dalam array `methods`:
 *      - Klik metode pembayaran 
 *      - Klik dropdown untuk mendapatkan instruksi
 *      - Verifikasi bahwa detail instruksi terlihat
 * 
 * @param {object} webApp - Konteks Playwright (browser page)
 * @param {Array<string>} methods - Daftar ID metode pembayaran yang ingin diketahui dari (config.more_info.method) 
 */

// Helper function to check how to pay 
async function howToPay(webApp, methods) {
    test.info().annotations.push({ 
        type: 'allure.step',
        value: 'Navigate to how to pay page',
    });

    await webApp.locator(`xpath=//a[normalize-space()='Cara Bayar']`).click();

    // Expect the page to have text METODE PEMBAYARAN CONNEX SHUTTLE
    await expect(webApp.locator(`xpath=//h4[normalize-space()='Metode Pembayaran Connex Shuttle']`)).toBeVisible();

    for (const method of methods) {
        console.log(`Select how to pay payment method: ${method}`);

    // click the method you want to know
    await webApp.locator(`xpath=//a[@id='${method}']`).click();

    // click the dropdown section for the information on how to pay
    await webApp.locator(`xpath=//h5[normalize-space()='Pembayaran Telkom (ATM, E-Banking, M-Banking)']`).click();

    // wait for the detail instructions to be visible
    await expect(webApp.locator(`xpath=//h6[contains(text(),'CARA PEMBAYARAN MENGGUNAKAN Pembayaran Telkom')]`)).toBeVisible();
    }
}

// /**
//  * Pengujian utama untuk fitur "Cara Bayar"
//  * 
//  * Tujuan: 
//  * - Memastikan halaman "Cara Bayar" dapat diakses
//  * - Memastikan bahwa pengguna dapat melihat instruksi pembayaran untuk metode yang diinginkan
//  * 
//  * Allure Labels:
//  * - feature: how to pay page
//  * - severity: normal
//  * - platform: web
//  * - status: pass
//  */

// Main test
test('how to pay', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: how to pay page',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'severity: normal',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'platform: web',
    });
    test.info().annotations.push({
        type: 'allure.label',
        value: 'status: pass',
    });

    // Start the how to pay process
    await howToPay(webApp, config.more_info.method);
});