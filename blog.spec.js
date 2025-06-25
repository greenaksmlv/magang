const { config } = require('./config');
const { test, expect } = require('./setup');

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
