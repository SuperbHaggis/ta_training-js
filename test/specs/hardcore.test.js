const HomePage = require('../pageobjects/googleCloudHome.page');
const CalcPage = require('../pageobjects/googleCloudCalculator.page');
const EmailPage = require('../pageobjects/10minutemail.page');
const Product = require('../models/Product');

describe('Hardcore task', () => {
  it('should open cloud.google.com and search for the Pricing Calculator', async () => {
    await HomePage.open();
    await HomePage.searchForText('Google Cloud Platform Pricing Calculator');

    await expect(browser).toHaveTitleContaining('Google Cloud Platform Pricing Calculator');
  });

  it('should navigate to the Calculator page via the correct search result', async () => {
    await HomePage.selectSearchResult('Google Cloud Platform Pricing Calculator');

    await expect(browser).toHaveTitleContaining('Google Cloud Pricing Calculator')
  });

  it('should select the desired options and submit for an estimate', async() => {
    const product = new Product(4, 'n1', 'CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-8', 'NVIDIA Tesla V100', '1', 'Frankfurt (europe-west3)', '1 Year');
    
    await CalcPage.switchToFormIframe();

    await CalcPage.inputInstancesNumber(4);
    await CalcPage.selectOptionByValue('Series', product.series);
    await CalcPage.selectOptionByValue('Instance type', product.instance);
    await CalcPage.gpuCheckbox.click();
    await CalcPage.selectOptionByText('GPU type', product.gpu);
    await CalcPage.selectOptionByText('Number of GPUs', product.gpuNum);
    await CalcPage.selectOptionByText('Local SSD', product.ssd);
    await CalcPage.selectOptionByText('Datacenter location', product.location);
    await CalcPage.selectOptionByText('Committed usage', product.years);

    await CalcPage.estimateBtn.click();
  });

  it('should open a new tab and navigate to 10minutemail.com', async () => {
    browser.newWindow('https://10minutemail.com/', {windowName: '10minutemail'});
  });

  it('should email the estimate to the 10minutemail account', async() => {
    const email = await EmailPage.getEmailAddress();
    await browser.switchWindow('google.com');
    await CalcPage.switchToFormIframe();
    await (await CalcPage.emailEstimteBtn).click();
    await (await CalcPage.emailInput).click();
    await (await CalcPage.emailInput).setValue(email);
    await (await CalcPage.emailBtn).click();
    await browser.switchWindow('10minutemail');
  });

  // it('should have the correct price in estimate email', async () => {
  //   await expect(await CalcPage.getEstimateText('//*[@id="compute"]/md-list/md-list-item[3]/div'))
  //     .toContain('1 Year');
  // });
});
