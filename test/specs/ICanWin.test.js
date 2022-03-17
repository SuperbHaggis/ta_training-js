const HomePage = require('./test/pageobjects/pastebinHome.page');
const PostPage = require('./test/pageobjects/pastebinPost.page');

describe('I Can Win task', () => {
  it('should open pastebin.com and create a new post', async () => {
    await HomePage.open();

    await HomePage.enterPostText(HomePage.postText);

    await HomePage.selectExpiration(HomePage.expiration);

    await HomePage.enterTitle(HomePage.title);

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
