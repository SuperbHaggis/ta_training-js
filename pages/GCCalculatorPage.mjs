import Page from "./Page.mjs";
import { By, Key, until } from 'selenium-webdriver';

class CalculatorPage extends Page {
  // This is only because the search results were not coming up correctly
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
    await driver.wait(until.elementLocated(By.id('input_78')), 10000).click();
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

  async clickEstimateButton() {
    await driver.findElement(By.xpath('//*[@id="mainForm"]/div[2]/div/md-card/md-card-content/div/div[1]/form/div[18]/button')).click();
  }

  async getEstimateData(xpath) {
    const estimateData = await driver.findElement(By.xpath(xpath));
    return estimateData.getText();
  }
  
  // async chooseOS() {
  //   await driver.wait(until.elementLocated(By.id('select_91'), 10000)).click();
  //   const option = await driver.wait(until.elementLocated(By.id('select_option_80')))
  //   await driver.wait(until.elementIsVisible(option)).click();
  // }

  // async chooseSeries() {
  //   await driver.findElement(By.id('select_103')).click();
  //   const option = await driver.wait(until.elementLocated(By.id('select_option_218')), 10000);
  //   await driver.wait(until.elementIsVisible(option)).click();
  // }

  // async chooseMachineType() {
  //   await driver.findElement(By.id('select_105')).click();
  //   const option = await driver.wait(until.elementLocated(By.id('select_option_421')), 10000);
  //   await driver.wait(until.elementLocated(option)).click();
  // }
}

export default new CalculatorPage;