const { config } = require('./config');
const { test, expect } = require('./setup');

/**
 * Navigasi ke halaman Galeri dari Landing page/halaman utama
 * 
 * alur:
 * - Mencari tombol atau link "Galeri"
 * - Klik link untuk menuju ke halaman Galeri
 * - Verifikasi bahwa elemen judul halaman Galeri muncul
 */

// Helper function to check galery
async function galery(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to galery page',
    });

    const galeryPath = webApp.locator(`xpath=//a[normalize-space()='Galeri']`);

    await galeryPath.click();
    await expect(webApp.locator(`xpath=//h3[@class='header-title mb-2 text-white']`)).toBeVisible();
}

// /**
//  * Pengujian utama untuk fitur Galeri
//  * 
//  * Tujuan:
//  * - Memastikan pengguna dapat mengakses halaman Galeri
//  * 
//  * Allure Labels:
//  * - feature: galery page 
//  * - severity: normal
//  * - platform: web
//  * - status: pass
//  */

// Main test
test('galery', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: galery page',
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

    // Start the access to galery page
    await galery(webApp);
});