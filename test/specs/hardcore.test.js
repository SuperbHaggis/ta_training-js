const HomePage = require('../pageobjects/googleCloudHome.page');
const CalcPage = require('../pageobjects/googleCloudCalculator.page');
const EmailPage = require('../pageobjects/10minutemail.page');
const Product = require('../models/Product');

describe('Hardcore task', () => {
  before(async () => {
    await HomePage.open();
    await HomePage.searchForText('Google Cloud Platform Pricing Calculator');
    await HomePage.selectSearchResult(
      'Google Cloud Platform Pricing Calculator'
    );

    const product = new Product(
      4,
      'select_option_218',
      'select_option_421',
      'select_option_461',
      'select_option_465',
      'select_option_444',
      'select_option_239',
      'select_option_116'
    );

    await CalcPage.switchToFormIframe();

    await CalcPage.inputInstancesNumber(4);
    await CalcPage.selectOptionByValue(CalcPage.seriesSelect, product.series);
    await CalcPage.selectOptionByValue(
      CalcPage.machineTypeSelect,
      product.instance
    );
    await CalcPage.gpuCheckbox.click();
    await CalcPage.selectOptionByText(CalcPage.gpuSelect, product.gpu);
    await CalcPage.selectOptionByText(CalcPage.gpuNumSelect, product.gpuNum);
    await CalcPage.selectOptionByText(CalcPage.ssdSelect, product.ssd);
    await CalcPage.selectOptionByText(
      CalcPage.locationSelect,
      product.location
    );
    await CalcPage.selectOptionByText(CalcPage.useageSelect, product.years);

    await CalcPage.estimateBtn.click();

    browser.newWindow('https://10minutemail.com/', {
      windowName: '10minutemail',
    });

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
    await expect(EmailPage.getEmailEstimate()).toEqual(
      CalcPage.getEstimatePrice()
    );
  });
});
