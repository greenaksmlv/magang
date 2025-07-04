const { config } = require('../config');
const { test, expect } = require('../setup');

/**
 * Navigasi ke halaman "Kontak" dari landing page/halaman utama
 * 
 * Alur: 
 * - Mencari tombol atau link "Kontak"
 * - Klik link untuk menuju ke halaman Kontak
 * - Verifikasi bahwa elemen judul halaman Kontak muncul
 */

// Helper function to check contact
async function contactUs(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to contact us page',
    });

    const contactPath = webApp.locator(`xpath=//a[normalize-space()='Kontak']`);

    await contactPath.click();
    await expect(webApp.locator(`xpath=//h3[@class='header-title mb-2 text-white']`)).toBeVisible();
}

/**
 * Pengujian utama untuk fitur Contact Us
 * 
 * Tujuan:
 * - Memastikan pengguna dapat mengakses halaman Kontak
 * 
 * Allure Labels:
 * - feature: contact us page
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('contact', async ({ webApp }) => {
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

    // Start the access to contact us page
    await contactUs(webApp);
});