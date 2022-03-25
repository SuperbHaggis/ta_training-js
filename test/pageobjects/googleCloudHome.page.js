const Page = require('./page');

class GoogleCloudHomePage extends Page {
  get searchBar() {
    return $('[name="q"]');
  }

  async searchForText(text) {
    await this.searchBar.setValue(text);
    const enterKey = '\uE007';
    await this.searchBar.addValue(enterKey);
  }

  async selectSearchResult(text) {
    await driver.$(`*=${text}`).click();
  }

  open() {
    return super.open('https://cloud.google.com');
  }
}

module.exports = new GoogleCloudHomePage();
