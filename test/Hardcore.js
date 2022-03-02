import * as assert from 'assert';
import HomePage from '../pages/GCHomePage.mjs';
import EmailPage from '../pages/EmailPage.mjs';
import CalculatorPage from '../pages/GCCalculatorPage.mjs';

describe('Tests "Hardcore" challenge', async () => {
  
// it('Navigates to the Google Cloud homepage', async () => {
  //   await HomePage.open();
  // });
  
  // it('Searches for the calculator page', async () => {
  //   await HomePage.useSearchBar('Google Cloud Platform Pricing Calculator');
  // });

  // const googleWindow = await CalculatorPage.setWindow();
  // const emailWindow

  it('Fills out the page with desired options', async () => {
    await CalculatorPage.open();
    
    await CalculatorPage.switchToFormIFrame();

    await CalculatorPage.enterInstances(4);
    await CalculatorPage.selectOption('select_91', 'select_option_80');
    await CalculatorPage.selectOption('select_103', 'select_option_218');
    await CalculatorPage.selectOption('select_105', 'select_option_421');
    await CalculatorPage.clickGPUCheckbox();
    await CalculatorPage.selectOption('select_454', 'select_option_461');
    await CalculatorPage.selectOption('select_456', 'select_option_465');
    await CalculatorPage.selectOption('select_416', 'select_option_444');
    await CalculatorPage.selectOption('select_111', 'select_option_239');
    await CalculatorPage.selectOption('select_118', 'select_option_116');

    await CalculatorPage.clickButton('//*[@id="mainForm"]/div[2]/div/md-card/md-card-content/div/div[1]/form/div[18]/button');
  });

  it('Generates a 10minutemail account', async () => {
    await EmailPage.switchToNewPage();
    await EmailPage.open();
  });

  // it('Emails an estimate to the 10minutemail account', async () => {
  //   const emailAddress = await EmailPage.getEmailAddress();
  //   await EmailPage.changeWindow();
  //   await CalculatorPage.switchToFormIFrame();
  //   await CalculatorPage.clickButton('//*[@id="email_quote"]');
  //   await CalculatorPage.enterEmailAddress(emailAddress);
  //   await CalculatorPage.clickButton('//*[@id="dialogContent_538"]/form/md-dialog-actions/button[2]');
  // });

});