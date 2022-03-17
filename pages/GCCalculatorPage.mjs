import Page from "./Page.mjs";
import { By, Key, until } from 'selenium-webdriver';

class CalculatorPage extends Page {
  constructor() {
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
    this.price = '1,265.78'
  }

  async setWindow() {
    const originalWindow = await driver.getWindowHandle();
    return originalWindow;
  }
  
  async open() {
    await super.open('https://cloud.google.com/products/calculator');
  }
  
  async switchToFormIFrame() {
    const iframe = await driver.wait(until.elementLocated(By.css('iframe')));
    await driver.switchTo().frame(iframe);
    const iframeChild = await driver.findElement(By.id('myFrame'));
    await driver.switchTo().frame(iframeChild);
  }

  async enterInstances(number) {
    await driver.wait(until.elementLocated(By.id('input_79')), 10000).click();
    for (let i = 0; i < number; i++) {
      await driver.actions()
      .keyDown(Key.ARROW_UP)
      .perform()
    }    
  }

  async selectOption(selectID, optionID) {
    await driver.wait(until.elementLocated(By.id(selectID), 10000)).click();
    const option = await driver.wait(until.elementLocated(By.id(optionID)));
    await driver.wait(until.elementIsVisible(option)).click();
  }

  async clickGPUCheckbox() {
    await driver.findElement(By.css('[aria-label="Add GPUs"')).click();
  }

  async getEstimateData(text) {
    const estimateData = await driver.findElement(By.partialLinkText(text));
    return estimateData.getText();
  }

  async getEstimatePrice() {
    return await this.getEstimateData('USD');
  }
  
  async clickButton(id) {
    await driver.findElement(By.id(id)).click();
  }

  async enterEmailAddress(emailAddress) {
    const formField = await driver.wait(until.elementLocated(By.id('input_532')), 10000);
    const emailField = await driver.wait(until.elementIsVisible(formField));
    emailField.click();
    emailField.sendKeys(emailAddress);
  }
}

export default new CalculatorPage;