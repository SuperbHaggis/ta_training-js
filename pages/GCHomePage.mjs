import { By, Key } from 'selenium-webdriver';
import Page from "./Page.mjs";

class HomePage extends Page {
  async open() {
    await super.open('https://cloud.google.com/');
  }
  
  async useSearchBar(searchText) {
    await driver.findElement(By.css('devsite-search')).click();
    await driver.findElement(By.css('input'))
      .sendKeys(searchText, Key.ENTER);
  }
}

export default new HomePage;