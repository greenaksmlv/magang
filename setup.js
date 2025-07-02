/**
 * @file setup.js
 * @description
 * File ini digunakan untuk mengatur konfigurasi awal sebelum menjalankan setiap pengujian Playwright
 * Ini mencakup peluncuran browser, membuka halaman awal situs Connex, dan juga menutup popup yang muncul
 * Ini juga menyediakan instance `webApp` yang digunakan di seluruh test
 */

const { test, expect, chromium } = require('@playwright/test');
const { config } = require('./config');


/**
 * @function closePopup
 * @description
 * Menutup semua popup awal yang muncul ketika halaman dimuat
 * Fungsi ini akan mencari tombol close dengan ikon `fa-times-circle` dan mengklik tombolnya selama masih terlihat
 * 
 * @param {Page} newPage - Halaman browser yang sedang dibuka 
 */
// Close popup
async function closePopup(newPage) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Close initial popup',
    });

   // Locate the close button
    const closeButton = newPage.locator("xpath=//i[@class='fa fa-times-circle text-danger fs-18 close-pop-info']");

    while (true) {
        // Check if the close button is visible
        const isVisible = await closeButton.isVisible();

        // If the close button is not visible, break out of the loop
        if (!isVisible) {
            console.log("No visible close buttons left.");
            break;
        }

        // If the close button is visible, click it
        await closeButton.click();
        
        // Optional: Wait for any UI update to reflect the click
        await newPage.waitForTimeout(500);  // Adjust timeout if needed
    }
}

// Export assertion util
exports.expect = expect;

/**
 * @typedef {object} Fixtures
 * @property {page} webApp - Halaman yang telah disiapkan dan bebas dari popup awal
 */

/**
 * @description
 * Fixture `webApp` mengoverride Playwright default `page` dengan page yang baru 
 * Fixture ini akan:
 * 1. Meluncurkan browser Chromium
 * 2. Membuka halaman awal Connex (`config.url.website`)
 * 3. Menutup popup jiga ada
 * 4. Menyediakan halaman yang siap untuk digunakan pada setiap test
 */

exports.test = test.extend({
    webApp: async ({ page }, use) => {
        // Launch the browser in headless mode here
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const newPage = await context.newPage();  // Create a new page here
        const url = config.url.website;
        await newPage.goto(url);
        await closePopup(newPage)
        await use(newPage); // Use the newPage instead of the existing page
        await browser.close();
    },
});




