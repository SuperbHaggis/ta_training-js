import * as assert from 'assert';
import HomePage from './pages/GCHomePage.mjs';
import CalculatorPage from './pages/GCCalculatorPage.mjs';

describe('Tests "Hurt Me Plenty" challenge', () => {
  // it('Navigates to the Google Cloud homepage', async () => {
  //   await HomePage.open();
  // });
  
  // it('Searches for the calculator page', async () => {
  //   await HomePage.useSearchBar('Google Cloud Platform Pricing Calculator');
  // });

  it('Navigates to the calculator page', async () => {
    // The webdriver instance kept getting different search results,
    // so I wasn't able to navigate to the calculator page from the search page.
    // Otherwise, I would have navigated by clicking the correct result.
    await CalculatorPage.open();
  });

  it('Switches to the form\'s iframe', async () => {
    await CalculatorPage.switchToFormIFrame()
  });

  it('Enters the desired number of instances', async () => {
    await CalculatorPage.enterInstances(4);
  });

  it('Selects the free Operating System option', async () => {
    await CalculatorPage.selectOption('select_91', 'select_option_80');
  });

  it('Selects the N1 Series', async () => {
    await CalculatorPage.selectOption('select_103', 'select_option_218');
  });

  it('Selects the n1-standard-8 Machine Type', async () => {
    await CalculatorPage.selectOption('select_105', 'select_option_421');
  });

  it('Adds specified number of GPUs', async () => {
    await CalculatorPage.clickGPUCheckbox();
    await CalculatorPage.selectOption('select_454', 'select_option_461');
    await CalculatorPage.selectOption('select_456', 'select_option_465');
  });

  it('Selects the desired number of SSDs', async () => {
    await CalculatorPage.selectOption('select_416', 'select_option_444');
  });

  it('Selects the desired Datacenter location', async () => {
    await CalculatorPage.selectOption('select_111', 'select_option_239');
  });

  it('Selects the desired usage length', async () => {
    await CalculatorPage.selectOption('select_118', 'select_option_116');
  });

  it('Adds selected options to Estimate', async () => {
    await CalculatorPage.clickEstimateButton();
  });

  it('Estimate VM class corresponds to form VM class', async () => {
    assert.match(await CalculatorPage.getEstimateData('//*[@id="compute"]/md-list/md-list-item[4]/div'), /regular/);
  });

  it('Estimate Instance Type corresponds to form Instance Type', async () => {
    assert.match(await CalculatorPage.getEstimateData('//*[@id="compute"]/md-list/md-list-item[5]/div[1]'), /n1-standard-8/);
  });
  
  it('Estimate Region corresponds to form Region', async () => {
    assert.match(await CalculatorPage.getEstimateData('//*[@id="compute"]/md-list/md-list-item[1]'), /Frankfurt/);
  });

  it('Estimate SSD number corresponds to form SSD number', async () => {
    assert.match(await CalculatorPage.getEstimateData('//*[@id="compute"]/md-list/md-list-item[7]/div[1]'), /4x375/);
  });

  it('Estimate commitment term corresponds to form commitment term', async () => {
    assert.match(await CalculatorPage.getEstimateData('//*[@id="compute"]/md-list/md-list-item[3]/div'), /1/);
  });

  it('Estimate value equals expect value', async() => {
    assert.match(await CalculatorPage.getEstimateData('//*[@id="compute"]/md-list/md-list-item[8]/div/b'), /1,265.78/);
  });
});