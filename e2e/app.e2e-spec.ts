import { UnidasPage } from './app.po';

describe('unidas App', () => {
  let page: UnidasPage;

  beforeEach(() => {
    page = new UnidasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
