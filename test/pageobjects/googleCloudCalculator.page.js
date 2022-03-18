const Page = require('./page');

class GoogleCloudCalculatorPage extends Page {
  constructor() {
    this.instanceNum = 4;
    this.osSelect = 'select_91';
    this.osOption = 'select_option_80';
    this.seriesSelect = 'select_103';
    this.seriesOption = 'select_option_218';
    this.machineTypeSelect = 'select_105';
    this.machineTypeOption = 'select_option_421';
    this.gpuSelect = 'select_454';
    this.gpuOption = 'select_option_461';
    this.gpuNumSelect = 'select_456';
    this.gpuNumOption = 'select_option_465';
    this.ssdSelect = 'select_416';
    this.ssdOption = 'select_option_444';
    this.locationSelect = 'select_111';
    this.locationOption = 'select_option_239';
    this.useageSelect = 'select_118';
    this.useageOption = 'select_option_116';
    this.vmClass = 'regular';
    this.instanceType = 'n1-standard-8';
    this.location = 'Frankfurt';
    this.ssd = '4x375';
    this.term = '1';
  }
  
  get instancesInput() {
    return $('#input_80');
  }

  get gpuCheckbox() {
    return $('[aria-label="Add GPUs"]');
  }

  get estimateBtn() {
    return $('button=Add to Estimate');
  }

  get emailEstimteBtn() {
    return $('#email_quote');
  }

  get emailInput() {
    return $('#input_542');
    
  }

  get emailBtn() {
    return $('button=Send Email');
  }

  async clickEstimateBtn() {
    await this.gpuCheckbox.click();
  }

  async switchToFormIframe() {
    const firstIframe = await driver.$('<iframe />');
    await driver.switchToFrame(firstIframe);
    const secondIframe = await driver.$('#myFrame');
    await driver.switchToFrame(secondIframe);
  }

  async inputInstancesNumber(number) {
    await this.instancesInput.setValue(number);
  }

  async selectOptionByID(selectPlaceholder, optionID) {
    const select = await driver.$(`[placeholder="${selectPlaceholder}"]`);
    await select.click();

    await driver.waitUntil(async () => await driver.$(`#${optionID}`).isDisplayed());
    const option = await driver.$(`#${optionID}`);
    await option.click();
  }

  async getEstimateText(text) {
    const estimate = await driver.$(`div*=${text}`);
    return estimate.getText();
  }

  async getEstimatePrice() {
    const price = await driver.$('h2*=USD');
    return (await price.getText()).replace(/^0-9./, '');
  }
}

module.exports = new GoogleCloudCalculatorPage();
