const { config } = require('./configConnex');
const { test, expect } = require('./setup');

/**
 * Fungsi untuk mengakses halaman "Kebijakan Privasi"
 * 
 * Alur:
 * - Klik link "Kebijakan Privasi"
 * - Verifikasi bahwa elemen dengan teks "Kebijakan Privasi" muncul
 * 
 * @param {object} webApp - Objek Playwright untuk halaman web
 */

// Helper function to check on privacy policy
async function privacyPolicy(webApp) {
    test.info().annotations.push({ 
        type: 'allure.step',
        value: 'Navigate to Privacy & Policy',
    });

    await webApp.locator(`xpath=//a[normalize-space()='Kebijakan Privasi']`).click();

    // Expect the page to have the text KEBIJAKAN PRIVASI
    await expect(webApp.locator(`xpath=//h3[normalize-space()='kebijakan privasi']`)).toBeVisible();
}

/**
 * Pengujian utama untuk halaman Privacy Policy
 * 
 * Tujuan:
 * - Memastikan tautan "Kebijakan Privasi" dapat diakses dan menampilkan halaman yang benar
 * 
 * Allure Labels:
 * - feature: Privacy and Policy
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('provacy policy', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Privacy and Policy',
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

    // Start the access to privacy policy
    await privacyPolicy(webApp);
});