import { initWidget } from './widget';
import { JSDOM } from 'jsdom';

describe('initWidget', () => {
  it('should throw error if called not in an iframe', () => {
    expect(() => {
      initWidget(window, '*');
    }).toThrow();

    const parent = new JSDOM(``);
    const { document } = parent.window;
    const widget = document.createElement('iframe');
    widget.src = 'about:blank';
    document.body.appendChild(widget);
    expect(() => {
      initWidget(widget.contentWindow as Window);
    }).not.toThrow();
  });
});
