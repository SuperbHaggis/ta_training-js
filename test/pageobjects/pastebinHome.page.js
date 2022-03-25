const Page = require('./page');

class PastebinHomePage extends Page {
  get postFormTextarea() {
    return $('#postform-text');
  }

  get syntaxSelect() {
    return $('[data-select2-id="1"');
  }

  get expirationSelect() {
    return $('[data-select2-id="3"]');
  }

  get titleTextbox() {
    return $('#postform-name');
  }

  get btnSubmit() {
    return $('button[type="submit"]');
  }

  async enterPostText(postText) {
    await this.postFormTextarea.setValue(postText);
  }

  async selectSyntax(text) {
    await this.syntaxSelect.click();
    await $(`li=${text}`).click();
  }

  async selectExpiration(text) {
    await this.expirationSelect.click();
    await $(`li=${text}`).click();
  }

  async enterTitle(text) {
    await this.titleTextbox.setValue(text);
  }

  open() {
    return super.open('https://www.pastebin.com');
  }
}

module.exports = new PastebinHomePage();
