const HomePage = require('../pageobjects/googleCloudHome.page');
const CalcPage = require('../pageobjects/googleCloudCalculator.page');
const EmailPage = require('../pageobjects/10minutemail.page');

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

  it('should select the desired options', async() => {
    await CalcPage.switchToFormIframe();
    await CalcPage.inputInstancesNumber(4);
    await CalcPage.selectOptionByValue('Series', 'n1');
    await CalcPage.selectOptionByValue('Instance type', 'CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-8');
    await CalcPage.gpuCheckbox.click();
    await CalcPage.selectOptionByValue('GPU type', 'NVIDIA_TESLA_V100');
    await CalcPage.selectOptionByID('Number of GPUs', 'select_option_466');
    await CalcPage.selectOptionByID('Local SSD', 'select_option_443');
    await CalcPage.selectOptionByID('Datacenter location', 'select_option_240');
    await CalcPage.selectOptionByID('Committed usage', 'select_option_117');
  });

  it('should submit the options for an estimate', async () => {
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
    await driver.pause(100000);
  });

  // it('should have the correct VM Class in estimate email', async () => {
  //   await expect(await CalcPage.getEstimateText('//*[@id="compute"]/md-list/md-list-item[4]/div'))
  //     .toContain('regular');
  // });

  // it('should have the correct Instance Type in estimate email', async () => {
  //   await expect(await CalcPage.getEstimateText('//*[@id="compute"]/md-list/md-list-item[5]/div[1]'))
  //     .toContain('n1-standard-8');
  // });

  // it('should have the correct Region in estimate email', async () => {
  //   await expect(await CalcPage.getEstimateText('//*[@id="compute"]/md-list/md-list-item[1]/div'))
  //     .toContain('Frankfurt');
  // });

  // it('should have the correct SSD in estimate email', async () => {
  //   await expect(await CalcPage.getEstimateText('//*[@id="compute"]/md-list/md-list-item[7]/div[1]'))
  //     .toContain('2x375 GiB');
  // });

  // it('should have the correct Commitment Term in estimate email', async () => {
  //   await expect(await CalcPage.getEstimateText('//*[@id="compute"]/md-list/md-list-item[3]/div'))
  //     .toContain('1 Year');
  // });
});
