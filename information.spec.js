const { config } = require('./configConnex');
const { test, expect } = require('./setup');

/**
 * Fungsi untuk menguji interaksi klik terhadap elemen nomor telefon yang berada di footer
 * 
 * Alur: 
 * - Temukan elemen nomor telefon
 * - Verifikasi elemen terlihat
 * - Klik elemen yang diinginkan 
 * 
 * @param {object} webApp - Objek halaman Plawright untuk interaksi DOM
 */

// Helper function to click phone numbers on information
async function clickInformation(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Clicking phone numbers on website information',
    });

    const phone1 = webApp.locator(configConnex.phone_info.no1);
    await expect(phone1).toBeVisible();
    await phone1.click();

    // NOMOR TELEFON LAINNYA DAPAT DIAKTIFKAN SESUAI DENGAN KEBUTUHAN
    // const phone2 = webApp.locator(configConnex.phone_info.no2);
    // await expect(phone2).toBeVisible();
    // await phone2.click();

    // const phone3 = webApp.locator(configConnex.phone_info.no3);
    // await expect(phone3).toBeVisible();
    // await phone3.click();

    // const phone4 = webApp.locator(configConnex.phone_info.no4);
    // await expect(phone4).toBeVisible();
    // await phone4.click();
}

/**
 * Pengujian utama untuk fitur klik nomor telefon
 * 
 * Tujuan: 
 * - Memastikan nomor telefon yang tercantum di informasi footer dapat terlihat dan diklik
 * 
 * Allure Labels:
 * - feature: information page
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('clicking phone number info', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: information page',
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
    
    // Start the access to click phone numbers on footer information
    await clickInformation(webApp, 'no1');
})