const { config } = require('./config');
const { test, expect } = require('./setup');

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

// Main test
test('galery', async ({ webApp }) => {
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

    // Start the access to galery page
    await galery(webApp);
});