import { By, Key } from 'selenium-webdriver';
import Page from './Page.mjs';

class HomePage extends Page {
  async open() {
    await super.open('https://www.pastebin.com')
  }
  
  async enterPostText(postText) {
    await driver
      .findElement(By.id('postform-text'))
      .sendKeys(postText);
  }

  async enterTitle(titleText) {
    await driver
      .findElement(By.id('postform-name'))
      .sendKeys(titleText);
  }

  async chooseExpiration() {
    const expiration = await driver.findElement(By.id('postform-expiration'));
    expiration.click();
    await driver.actions()
      .keyDown(Key.ARROW_DOWN)
      .keyDown(Key.ARROW_DOWN)
      .keyDown(Key.ENTER)
      .perform();
  }

  getExpiration() {
    return driver.findElement(By.id('postform-expiration'));
  }

  async chooseSyntax() {
    const syntax = await driver
      .findElement(By.id('postform-format'));
    
    await syntax.click();
    await driver.actions()
      .keyDown(Key.ARROW_DOWN)
      .keyDown(Key.ENTER)
      .perform();
  }

  getSyntax() {
    return driver.findElement(By.id('postform-format'));
  }

  async submitPost() {
    await driver.findElement(By.id('postform-format')).submit();
  }

  async enterNewLine() {
    await driver.actions()
      .keyDown(Key.SHIFT)
      .sendKeys(Key.ENTER)
      .keyUp(Key.SHIFT)
      .perform();
  }
}

export default new HomePage;