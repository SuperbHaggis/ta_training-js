import * as webdriver from 'selenium-webdriver';

class Page {
  constructor() {
    global.driver = new webdriver.Builder().forBrowser('chrome').build()
  }

  async open(url) {
    await driver.get(url);
  }

  async quit() {
    await driver.quit();
  }
}

export default Page