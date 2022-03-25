const Page = require('./page');

class PastebinPostPage extends Page {
  get textarea() {
    return $('<textarea>');
  }

  get syntaxAnchor() {
    return $('*=Bash');
  }

  get title() {
    return browser.getTitle();
  }

  async waitForTitleChange() {
    await browser.waitUntil(
      async () =>
        (await browser.getTitle()) !==
        'Pastebin.com - #1 paste tool since 2002!'
    );
  }
}

module.exports = new PastebinPostPage();
