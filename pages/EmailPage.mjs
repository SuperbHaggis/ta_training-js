import Page from "./Page.mjs";
import { By, Key, until } from 'selenium-webdriver';

class EmailPage extends Page {
  async changeWindow() {
    const currentWindow = await driver.getWindowHandle();
    const windows = await driver.getAllWindowHandles();
    windows.forEach(async window => {
      if (window !== currentWindow) await driver.switchTo().window(window);
    })
    await driver.switchTo();
  }

  async switchToNewPage() {
    await driver.switchTo().newWindow('tab');
  }
  
  async open() {
    await super.open('https://10minutemail.com/');
  }

  async getEmailAddress() {
    const address = await driver.findElement(By.xpath('//*[@id="email-widget"]'))
    return address.getText();
  }
}

export default new EmailPage;