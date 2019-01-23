# @widget-kit/rpc

Establishes connection between two windows allowing both to send and handle requests.

## Install

```bash
$ npm install --save @widget-kit/rpc
```

## Usage

```js
// Main window:
const hostConnection = createConnection(
  window,
  iframe.contentWindow,
  'https://remote.example.com'
);

hostConnection.handle('ping', (respond) => {
  respond('pong');
});

// Iframe (loaded from https://remote.example.com):
const widgetConnection = createConnection(window, window.parent);
const pingRequest = createRequest('ping');
widgetConnection.send(pingRequest, (response) => {
  console.log(response.payload);  // prints 'pong'
});
```

## API Reference

### `createConnection(currentWindow, targetWindow, [targetOrigin])`

Returns `Connection` object with `send` and `handle` methods. 

- `currentWindow`: a reference to window where `createConnection` is called 
- `targetWindow`: a reference to remote window
- `targetOrigin`: an origin that `targetWindow`'s origin must match. This check performed for both outgoing and incoming requests

### `send(request, [onResponse])`

Sends prepared request
- `request`: a plain object containing request method, arguments list and set of service fields. Use `createRequest` helper to create proper request 
- `onResponse`: response handler. Accepts `Response` object with `payload` and optional `error` fields


### `handle(method, handler)`

Registers request handler for a given method.

- `method`: an unique method identifier. It's recommended to have prefix with your app name for custom methods (like `myAwesomeApp.analytics.sendEvent`)
- `handler`: TODO: HandlerFn

### `createRequest(method, ...args)`

TODO: description

- `method`: string
- `args`: any

```js
const sum = (a, b) => createRequest('myapp.sum', a, b);
```
