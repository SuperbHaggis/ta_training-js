const HomePage = require('./test/pageobjects/pastebinHome.page');
const PostPage = require('./test/pageobjects/pastebinPost.page');

describe('I Can Win task', () => {
  it('should open pastebin.com and create a new post', async () => {
    await HomePage.open();

    await HomePage.enterPostText('git config --global user.name "New Sheriff in Town"\uE007git reset $ (git commit-tree HEAD ^ {tree} -m "Legacy code")\uE007git push origin master --force');

    await HomePage.selectSyntax(HomePage.syntax);
    await HomePage.selectExpiration(HomePage.expiration);

    await HomePage.enterTitle(HomePage.title);

    await HomePage.btnSubmit.click();
  });

  it('should have the correct title', async () => {
    await PostPage.waitForTitleChange();
    await expect(browser).toHaveTitleContaining('how to gain dominance among developers');
  });

  it('should have the correct post text', async () => {
    await expect(PostPage.textarea).toHaveText('git config --global user.name "New Sheriff in Town"\n' + 'git reset $ (git commit-tree HEAD ^ {tree} -m "Legacy code")\n' + 'git push origin master --force');
  });

  it('should have the correct syntax highlighting', async () => {
    await expect(PostPage.syntaxAnchor).toHaveText('Bash');
  });
});
