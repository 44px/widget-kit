import { createContainer } from './container';

describe('createContainer', () => {
  it('should create iframe with a given url', () => {
    const URL = 'https://widget.example.com/';
    const { iframe } = createContainer(window, {
      url: URL,
    });

    expect(iframe.src).toBe(URL);
    expect(iframe.parentElement).toBe(window.document.body);
  });

  it('should attach iframe to parentElement', () => {
    const { document } = window;
    const parent = document.createElement('div');
    document.body.appendChild(parent);

    const { iframe } = createContainer(window, {
      url: 'https://widget.example.com/',
      parentElement: parent,
    });

    expect(iframe.parentElement).toBe(parent);
  });
});
