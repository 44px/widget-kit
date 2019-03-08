import { Connection, createConnection } from '@widget-kit/rpc';
import { resolveOrigin } from './resolve-origin';

export interface Container extends Connection {
  iframe: HTMLIFrameElement;
}

export interface Config {
  parentElement?: Element;
}

export function createContainer(widgetUrl: string, config: Config = {}): Container {
  const document = window.document;
  const parentElement = config.parentElement || document.body;
  const iframe = document.createElement('iframe');
  iframe.src = widgetUrl;
  iframe.frameBorder = '0';
  iframe.scrolling = 'no';
  parentElement.appendChild(iframe);

  const widgetWindow = iframe.contentWindow as Window;
  const widgetOrigin = resolveOrigin(window, widgetUrl);
  const { send, handle } = createConnection(widgetWindow, widgetOrigin);

  return { send, handle, iframe };
}
