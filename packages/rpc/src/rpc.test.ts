import { JSDOM } from 'jsdom';
import { createConnection, createRequest } from './rpc';

describe('RPC', () => {
  it('should send and handle messages', (done) => {
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

  it('should produce and handle responses', (done) => {
    expect.assertions(2);
    const METHOD = 'sum';
    const ERROR_TEXT = 'Sum accepts only positive numbers';
    const [hostWindow, widgetWindow] = createWindows();
    const hostConnection = createConnection(hostWindow, widgetWindow);
    hostConnection.handle(METHOD, (respond, a: number, b: number) => {
      if (a > 0 && b > 0) {
        respond(a + b);
      } else {
        respond(null, ERROR_TEXT);
      }
    });

    const widgetConnection = createConnection(widgetWindow, hostWindow);
    const sumRequest = (a, b) => createRequest(METHOD, [a, b]);
    widgetConnection.send(sumRequest(1, 2), (response) => {
      expect(response.payload).toBe(3);
    });

    widgetConnection.send(sumRequest(-1, 2), (response) => {
      expect(response.error).toBe(ERROR_TEXT);
      done();
    });
  });

  it('should throw error when redeclaring handlers', () => {
    const METHOD = 'test';
    const [hostWindow, widgetWindow] = createWindows();
    const hostConnection = createConnection(hostWindow, widgetWindow);

    hostConnection.handle(METHOD, () => 1);
    expect(() => {
      hostConnection.handle(METHOD, () => 2);
    }).toThrow();
  });

  it('should skip non-protocol messages', (done) => {
    const METHOD = 'test';
    const [hostWindow, widgetWindow] = createWindows();
    const hostConnection = createConnection(hostWindow, widgetWindow);

    const handler = jest.fn();
    hostConnection.handle(METHOD, handler);

    // non-protocol message
    hostWindow.postMessage({ method: METHOD }, '*');
    hostWindow.postMessage('test', '*');

    setTimeout(() => {
      expect(handler).toBeCalledTimes(0);
      done();
    });
  });

  it('should skip messages from untrusted origin', (done) => {
    const METHOD = 'test';
    const [hostWindow, widgetWindow] = createWindows();
    const hostConnection = createConnection(
      hostWindow,
      widgetWindow,
      'https://trusted.example.com',
    );

    const handler = jest.fn();
    hostConnection.handle(METHOD, handler);

    // widgetWindow has origin 'https://remote.example.com'
    const widgetConnection = createConnection(widgetWindow, hostWindow);
    widgetConnection.send(createRequest(METHOD));

    setTimeout(() => {
      expect(handler).toBeCalledTimes(0);
      done();
    });
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
