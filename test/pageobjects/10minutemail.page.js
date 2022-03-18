const Page = require('./page');

class TenMinuteMailPage extends Page {
  get emailInput() {
    return $('#mail_address');
  }

  async getEmailAddress() {
    driver.waitUntil(async () => (await this.emailInput).getValue() !== '');
    return (await this.emailInput).getValue();
  }

  async getEmailEstimate() {
    await driver.$('#mail_message').click();
    return (await (await driver.$('h3*=USD')).getText()).replace(/^0-9./, '');
  }
}

module.exports = new TenMinuteMailPage();
