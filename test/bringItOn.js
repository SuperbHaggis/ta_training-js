import * as assert from 'assert';
import HomePage from '../pages/HomePage.mjs';
import PostPage from '../pages/PostPage.mjs';

describe('Tests "Bring it on" challenge', () => {
  const titleText = 'how to gain dominance among developers';
  
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
    await PostPage.getTitle(titleText);
  });

  it('Post has the correct syntax highlighting', async () => {
    await PostPage.getSyntax('Bash');
  });

  it('Post the correct content text', async () => {
    assert.equal(await PostPage.getPostText(), 'git config --global user.name "New Sheriff in Town"\n' + 'git reset $ (git commit-tree HEAD ^ {tree} -m "Legacy code")\n' + 'git push origin master --force');
  });

  it ('Closes the browser when finished', async () => {
    await PostPage.quit();
  });
});