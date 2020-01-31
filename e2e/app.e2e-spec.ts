import { FormbuilderPage } from './app.po';

describe('formbuilder App', () => {
  let page: FormbuilderPage;

  beforeEach(() => {
    page = new FormbuilderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
