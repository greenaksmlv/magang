const { config } = require('./config');
const { test, expect } = require('./setup');

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