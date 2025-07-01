const { config } = require('./config');
const { test, expect } = require('./setup');

/**
 * Fungsi untuk menguji interaksi klik pada ikon sumber website
 * Terdapat tombol Google Play Store, App Store, dan Situs Connex
 * 
 * Alur: 
 * - Temukan tombol atau link sumber
 * - Pastikan bahwa tombol/linknya terlihat
 * - Klik tombol/link 
 *  
 * @param {object} webApp - Objek Playwright untuk interaksi halaman 
 */

// Helper function to click media sosial 
async function clickSource(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Clicking website source',
    });

    // const connexBtn = webApp.locator(config.web_source.connex);
    // await expect(connexBtn).toBeVisible();
    // await connexBtn.click();

    const googlePlayBtn = webApp.locator(config.web_source.playstore);
    await expect(googlePlayBtn).toBeVisible();
    await googlePlayBtn.click();

    // const appStoreBtn = webApp.locator(config.web_source.appstore);
    // await expect(appStoreBtn).toBeVisible();
    // await appStoreBtn.click();
}

/**
 * Pengujian utama untuk klik tautan sumber website
 * 
 * Tujuan:
 * - Memastikan bahwa ikon/link web source dapat diklik dari halaman utama
 * 
 * Allure Labels:
 * - feature: click web source
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('clicking source', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: contact us page',
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

    // Start the access to click the webpage source
    await clickSource(webApp, 'playstore');
});