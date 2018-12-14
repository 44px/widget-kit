import { Container, Widget, createContainer, initWidget } from '@widget-kit/container';
import { JSDOM } from 'jsdom';

export function getContainerAndWidget(): [Container, Widget] {
  const dom = new JSDOM(``, { url: 'https://example.com' });
  const container = createContainer(dom.window, {
    url: 'https://widget.example.com',
  });
  const iframeWindow = container.iframe.contentWindow as Window;
  const widget = initWidget(iframeWindow, '*');
  patchMessageEvent(dom.window, iframeWindow);
  patchMessageEvent(iframeWindow, dom.window);
  return [container, widget];
}

// Since JSDOM has no support for event.origin and event.source add them manually
function patchMessageEvent(window: Window, source: Window): Window {
  const dispatchEvent = window.dispatchEvent;
  window.dispatchEvent = (event: Event): boolean => {
    if (event.type === 'message') {
      Object.defineProperty(event, 'source', {
        value: source,
      });
      Object.defineProperty(event, 'origin', {
        value: source.location.origin,
      });
    }
    return dispatchEvent(event);
  };
  return window;
}
