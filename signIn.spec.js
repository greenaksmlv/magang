const { config } = require('./config');
const { test, expect } = require('./setup');

// Helper function to Sign In
async function signIn(webApp, method) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Sign in with method: ${method}',
    });

    await webApp.locator(`xpath=//a[normalize-space()='Masuk']`).click();
    await expect(webApp.locator(`xpath=//h4[normalize-space()='Masuk Dengan']`)).toBeVisible();

    const selector = config.sign_methods[method];
    const button = webApp.locator(selector);
    await expect(button).toBeVisible();
    await button.click();
}

// Main test
test('sign in', async ({ webApp }) => {
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

    // Start the access to sign in page
    await signIn(webApp, 'google');
});

