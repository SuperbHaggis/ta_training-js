const Page = require('./page');

class GoogleCloudHomePage extends Page {
  get searchBar() {
    return $('[name="q"]');
  }

  async searchForText(text) {
    await this.searchBar.setValue(text);
    await this.searchBar.addValue('\uE007');
  }

  async selectSearchResult(text) {
    await driver.$(`*=${text}`).click();
  }

  open() {
    return super.open('https://cloud.google.com');
  }
}

module.exports = new GoogleCloudHomePage();
