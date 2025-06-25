const { config } = require('./config');
const { test, expect } = require('./setup');

// Helper function to lacak paket
async function packetTracking(webApp) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Navigate to lacak paket page',
    });

    try {
        await webApp.locator(`xpath=//a[normalize-space()='Lacak Paket']`).click();
        await webApp.locator(`xpath=//input[@placeholder='Masukan Kode Disini']`).fill(codeBooking);
        await webApp.locator(`xpath=//button[normalize-space()='Cek Paket']`).click();
    } catch (error) {
        test.fail(`Error in packetTracking: ${error.message}`);
        throw error; 
     }
} 

// Helper function to check tracking info with try-catch
async function dataTracking(webApp, codeBooking) {
    test.info().annotations.push({
        type: 'allure.step',
        value: 'Get packet info, while information packet is visible, checked',
    });

    try {
        await expect(webApp.locator(`xpath=//input[@placeholder='Masukan Kode Disini']`)).toBeVisible();
    } catch (error) {
        test.fail(`Error in dataTracking: ${error.message}`);
        throw error;
    }
}

// Main test 
test('packetTracking', async ({ webApp }) => {
    // Add Allure Labels for categorizing in the report
    test.info().annotations.push({
        type: 'allure.label',
        value: 'feature: Tracking Packet',
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
    
    try {
        // Starting the tracking process
        await packetTracking(webApp, config.booking_code.packet);
        await dataTracking(webApp, config.booking_code.packet);
    } catch (error) {
        // Handle any error that might occur during the test
        test.fail(`Test failed: ${error.message}`);
        throw error; 
    }
});