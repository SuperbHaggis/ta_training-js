const HomePage = require('../pageobjects/googleCloudHome.page');
const CalcPage = require('../pageobjects/googleCloudCalculator.page');
const EmailPage = require('../pageobjects/10minutemail.page');

describe('Hardcore task', () => {
  before(async () => {
    await HomePage.open();
    await HomePage.searchForText('Google Cloud Platform Pricing Calculator');
    await HomePage.selectSearchResult('Google Cloud Platform Pricing Calculator');
    
    await CalcPage.switchToFormIframe();
    await CalcPage.inputInstancesNumber(CalcPage.instanceNum);
    await CalcPage.selectOptionByID(CalcPage.seriesSelect, CalcPage.seriesOption);
    await CalcPage.selectOptionByID(CalcPage.machineTypeSelect, CalcPage.machineTypeOption);
    await CalcPage.gpuCheckbox.click();
    await CalcPage.selectOptionByValue(CalcPage.gpuSelect, CalcPage.gpuOption);
    await CalcPage.selectOptionByID(CalcPage.gpuNumSelect, CalcPage.gpuNumOption);
    await CalcPage.selectOptionByID(CalcPage.ssdSelect, CalcPage.ssdOption);
    await CalcPage.selectOptionByID(CalcPage.locationSelect, CalcPage.locationOption);
    await CalcPage.selectOptionByID(CalcPage.useageSelect, CalcPage.usageOption);

    browser.newWindow('https://10minutemail.com/', {windowName: '10minutemail'});

    const email = await EmailPage.getEmailAddress();
    await browser.switchWindow('google.com');
    await CalcPage.switchToFormIframe();
    await (await CalcPage.emailEstimteBtn).click();
    await (await CalcPage.emailInput).click();
    await (await CalcPage.emailInput).setValue(email);
    await (await CalcPage.emailBtn).click();
    await browser.switchWindow('10minutemail');

  });

  it('should have the correct price in estimate email', async () => {
    await expect(EmailPage.getEmailEstimate())
      .toEqual(CalcPage.getEstimatePrice());
  });
});
