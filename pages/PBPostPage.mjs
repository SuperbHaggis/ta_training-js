import { By, Key, until } from 'selenium-webdriver';
import Page from './Page.mjs';

class PostPage extends Page {
  async getSyntax(linkText) {
    await driver.wait(until.elementLocated(By.linkText(linkText)), 10000);
  }

  async getTitle(titleText) {
    await driver.wait(until.titleContains(titleText), 10000);
  }
  
  async getPostText() {
    await driver.wait(until.elementLocated(By.linkText('raw'))).click();
    const postText = await driver.wait(until.elementLocated(By.css('pre')), 10000);
    return postText.getText();
  }
}

export default new PostPage