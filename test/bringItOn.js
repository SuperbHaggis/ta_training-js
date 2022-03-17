import * as assert from 'assert';
import HomePage from '../pages/PBHomePage.mjs';
import PostPage from '../pages/PBPostPage.mjs';

describe('Tests "Bring it on" challenge', () => {
  before(async () => {
    await HomePage.open('https://www.pastebin.com');
    await HomePage.enterPostText('git config --global user.name "New Sheriff in Town"');
    await HomePage.enterNewLine();
    await HomePage.enterPostText('git reset $ (git commit-tree HEAD ^ {tree} -m "Legacy code")');
    await HomePage.enterNewLine();
    await HomePage.enterPostText('git push origin master --force');
    await HomePage.chooseSyntax();
    await HomePage.chooseExpiration();
    await HomePage.enterTitle(titleText);
    await HomePage.submitPost();
  });

  it('Post has the correct title', async () => {
    assert.equal(await PostPage.getTitle(PostPage.title), 'how to gain dominance among developers');
  });

  it('Post has the correct syntax highlighting', async () => {
    assert.equal(await PostPage.syntax, 'Bash');
  });

  it('Post the correct content text', async () => {
    assert.equal(await PostPage.getPostText(), 'git config --global user.name "New Sheriff in Town"\n' + 'git reset $ (git commit-tree HEAD ^ {tree} -m "Legacy code")\n' + 'git push origin master --force');
  });

  after(async () => {
    await PostPage.quit();
  });
});