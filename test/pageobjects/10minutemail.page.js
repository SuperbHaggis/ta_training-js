const Page = require('./page');

class TenMinuteMailPage extends Page {
  get emailInput() {
    return $('#mail_address');
  }

  async getEmailAddress() {
    await driver.waitUntil(
      async () => (await this.emailInput).getValue() !== ''
    );
    return (await this.emailInput).getValue();
  }

  // open() {
  //   return super.open('https://10minutemail.com');
  // }
}

module.exports = new TenMinuteMailPage();
