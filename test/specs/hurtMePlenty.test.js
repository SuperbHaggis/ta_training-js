const HomePage = require('./test/pageobjects/googleCloudHome.page');
const CalcPage = require('./test/pageobjects/googleCloudCalculator.page');

describe('Hurt Me Plenty task', () => {
  before(async () => {
    await HomePage.open();
    await HomePage.searchForText('Google Cloud Platform Pricing Calculator');
    await HomePage.selectSearchResult(
      'Google Cloud Platform Pricing Calculator'
    );

    await CalcPage.switchToFormIframe();
    await CalcPage.inputInstancesNumber(CalcPage.instanceNum);
    await CalcPage.selectOptionByID(
      CalcPage.seriesSelect,
      CalcPage.seriesOption
    );
    await CalcPage.selectOptionByID(
      CalcPage.machineTypeSelect,
      CalcPage.machineTypeOption
    );
    await CalcPage.gpuCheckbox.click();
    await CalcPage.selectOptionByValue(CalcPage.gpuSelect, CalcPage.gpuOption);
    await CalcPage.selectOptionByID(
      CalcPage.gpuNumSelect,
      CalcPage.gpuNumOption
    );
    await CalcPage.selectOptionByID(CalcPage.ssdSelect, CalcPage.ssdOption);
    await CalcPage.selectOptionByID(
      CalcPage.locationSelect,
      CalcPage.locationOption
    );
    await CalcPage.selectOptionByID(
      CalcPage.useageSelect,
      CalcPage.usageOption
    );
  });

  it('should submit the options for an estimate', async () => {
    await CalcPage.estimateBtn.click();
  });

  it('should have the correct VM Class in estimate', async () => {
    await expect(await CalcPage.getEstimateText(CalcPage.vmClass)).toContain(
      'regular'
    );
  });

  it('should have the correct Instance Type in estimate', async () => {
    await expect(
      await CalcPage.getEstimateText(CalcPage.instanceType)
    ).toContain('n1-standard-8');
  });

  it('should have the correct Region in estimate', async () => {
    await expect(await CalcPage.getEstimateText(CalcPage.location)).toContain(
      'Frankfurt'
    );
  });

  it('should have the correct SSD in estimate', async () => {
    await expect(await CalcPage.getEstimateText(CalcPage.ssd)).toContain(
      '2x375 GiB'
    );
  });

  it('should have the correct Commitment Term in estimate', async () => {
    await expect(await CalcPage.getEstimateText('CalcPage.term')).toContain(
      '1 Year'
    );
  });
});
