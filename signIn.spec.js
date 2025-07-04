const { config } = require('./configConnex');
const { test, expect } = require('./setup');


/**
 * Fungsi untuk melakukan proses Sign In
 * 
 * Alur: 
 * - Cari tombol "Masuk" di halaman utama
 * - Klik tombol Masuk
 * - Verifikasi halaman login muncul
 * - Cari dan klik tombol metode login yang disesuaikan dengan `method`
 * 
 * @param {object} webApp - Konteks Playwright browser 
 * @param {string} method - Key metode login yang disesuaikan dengan konfigurasi di configConnex.sign_methods
 */

// Helper function to Sign In
async function signIn(webApp, method) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Sign in with method: ${method}',
    });

    await webApp.locator(`xpath=//a[normalize-space()='Masuk']`).click();
    await expect(webApp.locator(`xpath=//h4[normalize-space()='Masuk Dengan']`)).toBeVisible();

    const selector = configConnex.sign_methods[method];
    const button = webApp.locator(selector);
    await expect(button).toBeVisible();
    await button.click();
}

/**
 * Pengujian utama untuk proses Sign In
 * 
 * Tujuan:
 * - Memastikan bahwa halaman login dapat diakses
 * - Memastikan bahwa tombol login menggunakan metode tertentu dapat diklik
 * 
 * Allure Labels:
 * - feature: sign in
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('sign in', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: sign in page',
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

    // Start the access to sign in page
    await signIn(webApp, 'google');
});

