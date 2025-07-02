const { config } = require('./config');
const { test, expect } = require('./setup');

/**
 * Navigasi ke halaman Blog dari landing page/halaman utama
 * 
 * Alur:
 * - Cari tombol "Blog" di halaman utama
 * - Pastikan tombol terlihat
 * - Klik tombol untuk menuju ke halaman Blog
 * - Verifikasi bahwa elemen judul halaman blog muncul
 */

async function aboutUs(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to Blog Page',
    });

    const blogPath = webApp.locator(`xpath=//a[normalize-space()='Blog']`);

    await blogPath.isVisible();
    await blogPath.click();

    // Expect the page to have text berita Connex
    await expect(webApp.locator(`xpath=//h3[@class='header-title mb-2 text-white']`)).toBeVisible();
}

// /**
//  * Klik salah satu berita/artikel yang ada di Blog berdasarkan key yang ada di config
//  * 
//  * @param {object} webApp - Konteks browser dari Playwright 
//  * @param {string} newsKey - Key untuk mencari path artikel dari config.news 
//  * 
//  * Alur:
//  * - Mengambil path artikel dari config.news
//  * - Temukan tombol berita/selengkapnya
//  * - Pastikan tombol terlihat
//  * - Klik tombol
//  */

async function berita(webApp, newsKey) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Melihat berita di blog',
    });

    const news = config.news[newsKey];
    const beritaBtn = webApp.locator(`xpath=//a[@href='${news}']`);
    
    await expect(beritaBtn).toBeVisible();
    await beritaBtn.click();
}

/**
 * Pengujian utama untuk fitur Blog
 * 
 * Tujuan: 
 * - Memastikan pengguna dapat mengakses halaman Blog
 * - Memastikan salah satu fitur artikel berita dapat diakses 
 * 
 * Allure Labels:
 * - feature: Access to blog
 * - severity: normal
 * - platform: web
 * - status: pass
 */

// Main test
test('blog', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Access to blog',
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

    // Start to access about us
    await aboutUs(webApp);

    // Click berita 
    await berita(webApp, 'hindariTransit');
});
