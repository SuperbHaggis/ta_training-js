const Page = require('./page');

class GoogleCloudCalculatorPage extends Page {
  get instancesInput() {
    return $('/html/body/md-content/md-card/div/md-card-content[1]/div[2]/div/md-card/md-card-content/div/div[1]/form/div[1]/div[1]/md-input-container/input');
  }

  get gpuCheckbox() {
    return $('/html/body/md-content/md-card/div/md-card-content[1]/div[2]/div/md-card/md-card-content/div/div[1]/form/div[11]/div[1]/md-input-container/md-checkbox');
  }

  get estimateBtn() {
    // return $('/html/body/md-content/md-card/div/md-card-content[1]/div[2]/div/md-card/md-card-content/div/div[1]/form/div[17]/button');
    return $('button=Add to Estimate');
  }

  get emailEstimteBtn() {
    return $('/html/body/md-content/md-card/div/md-card-content[2]/md-card/md-card-content/div/div/div/div[2]/button[1]');
  }

  get emailInput() {
    return $('/html/body/div[7]/md-dialog/form/md-content/div[3]/md-input-container/input');
    
  }

  get emailBtn() {
    return $('/html/body/div[7]/md-dialog/form/md-dialog-actions/button[2]');
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

  async selectOptionByValue(selectPlaceholder, optionValue) {
    const select = await driver.$(`[placeholder="${selectPlaceholder}"]`);
    await select.click();

    await driver.waitUntil(async () => await driver.$(`[value="${optionValue}"]`).isDisplayed());
    const option = await driver.$(`[value="${optionValue}"]`);
    await option.click();
  }

  async getEstimateText(xPath) {
    const estimate = await driver.$(xPath);
    return estimate.getText();
  }
}

module.exports = new GoogleCloudCalculatorPage();
