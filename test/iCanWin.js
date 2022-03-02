const {Builder, By, Key, until} = require('selenium-webdriver');

(async function iCanWin() {
  let driver = new Builder().forBrowser('chrome').build();
  await driver.wait(() => 'loaded', 10000)
  
  await driver.get('https://www.pastebin.com');

  let postForm = await driver.wait(until.elementLocated(By.id('postform-text')), 50000);
  let expiration = await driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div[2]/div[1]/div[2]/div/form/div[5]/div[1]/div[2]/div')), 50000);
  let title = await driver.wait(until.elementLocated(By.id('postform-name')), 5000);
  let submitButton = await driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div[2]/div[1]/div[2]/div/form/div[5]/div[1]/div[8]/button')), 5000);

  await postForm.click();
  await postForm.sendKeys('Hello from WebDriver');

  await expiration.click();
  await driver.actions()
    .keyDown(Key.ARROW_DOWN)
    .keyDown(Key.ARROW_DOWN)
    .keyDown(Key.ENTER)
    .perform()

  await title.click();
  await title.sendKeys('helloweb');

  await submitButton.submit();

  // await driver.quit();
})()