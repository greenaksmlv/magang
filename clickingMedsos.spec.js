const { config } = require('./config');
const { test, expect } = require('./setup');

// Helper function to click on medsos
async function clickMedsos(webApp) {
    test.info().annotations.push({ 
        type: 'allure.step',
        value: 'Clicking medsos on website footer',
    });

    const fcbkBtn = webapp.locator(config.media_sosial.facebook);
    await expect(fcbkBtn).toBeVisible();
    await fcbkBtn.click();

    const igBtn = webApp.locator(config.media_sosial.instagram);
    await expect(igBtn).toBeVisible();
    await igBtn.click();

    const ttBtn = webApp.locator(config.media_sosial.tiktok);
    await expect(ttBtn).toBeVisible();
    await ttBtn.click();
}

// Main test
test('clicking media social', async ({ webApp }) => {
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
    
    // Start the access to click the media social
    await clickMedsos(webApp, 'instagram');
});