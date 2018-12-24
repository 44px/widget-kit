# @widget-kit/rpc

Establishes connection between two windows allowing both to send and handle requests.

### Install

```bash
$ npm install --save @widget-kit/rpc
```

### Usage

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

### API Reference

#### `createConnection(currentWindow, targetWindow, [targetOrigin])`

Returns `Connection` object with `send` and `handle` methods. 

- `currentWindow`: Window
- `targetWindow`: Window
- `targetOrigin`: if specified it will be used to restrict all sent and also check all incoming requests.

#### `send(request, [onResponse])`

Sends prepared request
- `request`: a plain object containing request method, arguments list and set of service fields. Use `createRequest` helper to create proper request.  
- `onResponse`: response handler. Should accept `Response` object with `payload` and optional `error` fields


#### `handle(method, handler)`

Registers request handler for a given method.

- `method`: string
- `handler`: HandlerFn

#### `createRequest(method, ...args)`

TODO: description

- `method`: string
- `args`: any

```js
const sum = (a, b) => createRequest('sum', a, b);
```
