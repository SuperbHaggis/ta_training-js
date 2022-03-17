import * as assert from 'assert';
import HomePage from '../pages/GCHomePage.mjs';
import EmailPage from '../pages/EmailPage.mjs';
import CalculatorPage from '../pages/GCCalculatorPage.mjs';

describe('Tests "Hardcore" challenge', async () => {
  before(async () => {
    await HomePage.open();
    await HomePage.useSearchBar('Google Cloud Platform Pricing Calculator');
    await CalculatorPage.switchToFormIFrame();
    await CalculatorPage.enterInstances(4);
    await CalculatorPage.selectOption(CalculatorPage.osSelect, CalculatorPage.osOption);
    await CalculatorPage.selectOption(CalculatorPage.seriesSelect, CalculatorPage.seriesOption);
    await CalculatorPage.selectOption(CalculatorPage.machineTypeSelect, CalculatorPage.machineTypeOption);
    await CalculatorPage.selectOption(CalculatorPage.gpuSelect, CalculatorPage.gpuOption);
    await CalculatorPage.selectOption(CalculatorPage.gpuNumSelect, CalculatorPage.gpuNumOption);
    await CalculatorPage.selectOption(CalculatorPage.ssdSelect, CalculatorPage.ssdOption);
    await CalculatorPage.selectOption(CalculatorPage.locationSelect, CalculatorPage.locationOption);
    await CalculatorPage.selectOption(CalculatorPage.useageSelect, CalculatorPage.useageOption);
    await CalculatorPage.clickEstimateButton();

    await EmailPage.switchToNewPage();
    await EmailPage.open();
    const emailAddress = await EmailPage.getEmailAddress();
    await EmailPage.changeWindow();

    await CalculatorPage.switchToFormIFrame();
    await CalculatorPage.clickButton('email_quote');
    await CalculatorPage.enterEmailAddress(emailAddress);
    await CalculatorPage.clickButton('dialogContent_538');
  });

  it('Emailed estimate equals Calculator estimate', async () => {
    assert.equal(CalculatorPage.getEstimatePrice(), EmailPage.getEmailEstimate());
  });
});