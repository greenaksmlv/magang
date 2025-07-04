const { config } = require('../config');
const { test, expect } = require('../setup');

/**
 * Fungsi untuk menguji tombol media social yang ada di footer halaman
 * 
 * Alur:
 * - Temukan dan klik tombol media social 
 * - Verifikasi bahwa elemen tersebut terlihat
 * 
 * @param {object} webApp - Konteks Playwright halaman web 
 */

// Helper function to click on medsos
async function clickMedsos(webApp) {
    test.info().annotations.push({ 
        type: 'allure.step',
        value: 'Clicking medsos on website footer',
    });

    const igBtn = webApp.locator(config.media_sosial.instagram);
    await expect(igBtn).toBeVisible();
    await igBtn.click();

    // AKTIFKAN JIKA INGIN MENGUJI TOMBOL LAINNYA 
    // const fcbkBtn = webapp.locator(config.media_sosial.facebook);
    // await expect(fcbkBtn).toBeVisible();
    // await fcbkBtn.click();

    // const ttBtn = webApp.locator(config.media_sosial.tiktok);
    // await expect(ttBtn).toBeVisible();
    // await ttBtn.click();
}

/**
 * Pengujian utama untuk fitur klik media social
 * 
 * Tujuan:
 * - Memastikan bahwa ikon media social yang berada di footer dapat diklik dan terlihat
 * 
 * Allure Labels: 
 * - feature: media social
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('clicking media social', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: media soscial',
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
    
    // Start the access to click the media social
    await clickMedsos(webApp, 'instagram');
});