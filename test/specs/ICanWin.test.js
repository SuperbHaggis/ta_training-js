const HomePage = require('./test/pageobjects/pastebinHome.page');
const PostPage = require('./test/pageobjects/pastebinPost.page');

describe('I Can Win task', () => {
  it('should open pastebin.com and create a new post', async () => {
    await HomePage.open();

    await HomePage.enterPostText('Hello from WebDriver');

    await HomePage.selectExpiration('10 Minutes');

    await HomePage.enterTitle('helloweb');

    await HomePage.btnSubmit.click();
  });

  it('should have the correct title', async () => {
    await PostPage.waitForTitleChange();
    await expect(browser).toHaveTitleContaining('helloweb');
  });

  it('should have the correct post text', async () => {
    await expect(PostPage.textarea).toHaveText('Hello from WebDriver');
  });
});
