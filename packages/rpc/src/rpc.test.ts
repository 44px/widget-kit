import { JSDOM } from 'jsdom';
import { createConnection, createRequest } from './rpc';

describe('RPC', () => {
  it('should send and handle messages', done => {
    const PING = 'ping';
    const PONG = 'pong';
    const [hostWindow, widgetWindow] = createWindows();

    const hostConnection = createConnection(hostWindow, widgetWindow, 'https://remote.example.com');
    hostConnection.handle(PING, () => {
      hostConnection.send(createRequest(PONG));
    });

    const widgetConnection = createConnection(widgetWindow, hostWindow);
    widgetConnection.handle(PONG, () => done());
    widgetConnection.send(createRequest(PING));
  });
});

function createWindows(): [Window, Window] {
  const localOrigin = 'https://example.com';
  const local = new JSDOM(``, { url: localOrigin, runScripts: 'dangerously' });

  const { document } = local.window;
  const remoteOrigin = 'https://remote.example.com';
  const remote = document.createElement('iframe');
  remote.src = remoteOrigin;
  document.body.appendChild(remote);

  const remoteWindow = remote.contentWindow as Window;
  return [
    patchMessageEvent(local.window, remoteWindow),
    patchMessageEvent(remoteWindow, local.window),
  ];
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
