import Page from "./Page.mjs";
import { By, Key, until } from 'selenium-webdriver';

class CalculatorPage extends Page {
  // This is only because the search results were not coming up correctly
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
    await driver.findElement(By.xpath('//*[@id="mainForm"]/div[2]/div/md-card/md-card-content/div/div[1]/form/div[11]/div[1]/md-input-container/md-checkbox')).click();
  }

  async getEstimateData(xpath) {
    const estimateData = await driver.findElement(By.xpath(xpath));
    return estimateData.getText();
  }
  
  async clickButton(xpath) {
    await driver.findElement(By.xpath(xpath)).click();
  }

  async enterEmailAddress(emailAddress) {
    const formField = await driver.wait(until.elementLocated(By.id('input_532')), 10000);
    const emailField = await driver.wait(until.elementIsVisible(formField));
    emailField.click();
    emailField.sendKeys(emailAddress);
  }
}

export default new CalculatorPage;