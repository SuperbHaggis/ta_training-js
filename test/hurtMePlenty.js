import * as assert from 'assert';
import HomePage from '../pages/GCHomePage.mjs';
import CalculatorPage from '../pages/GCCalculatorPage.mjs';

describe('Tests "Hurt Me Plenty" challenge', () => {
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
  });

  it('Estimate VM class corresponds to form VM class', async () => {
    assert.match(await CalculatorPage.getEstimateData(CalculatorPage.vmClass), /regular/);
  });

  it('Estimate Instance Type corresponds to form Instance Type', async () => {
    assert.match(await CalculatorPage.getEstimateData(CalculatorPage.instanceType), /n1-standard-8/);
  });
  
  it('Estimate Region corresponds to form Region', async () => {
    assert.match(await CalculatorPage.getEstimateData(CalculatorPage.location), /Frankfurt/);
  });

  it('Estimate SSD number corresponds to form SSD number', async () => {
    assert.match(await CalculatorPage.getEstimateData(CalculatorPage), /4x375/);
  });

  it('Estimate commitment term corresponds to form commitment term', async () => {
    assert.match(await CalculatorPage.getEstimateData(CalculatorPage.term), /1/);
  });

  it('Estimate value equals expect value', async() => {
    assert.match(await CalculatorPage.getEstimateData(CalculatorPage.price), /1,265.78/);
  });

  after(async () => {
    await CalculatorPage.quit();
  })
});