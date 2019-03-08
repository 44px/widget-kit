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
  iframe.contentWindow,
  'https://remote.example.com'
);

hostConnection.handle('ping', (respond) => {
  respond('pong');
});

// Iframe (loaded from https://remote.example.com):
const widgetConnection = createConnection(window.parent);
const pingRequest = createRequest('ping');
widgetConnection.send(pingRequest, (response) => {
  console.log(response.payload);  // prints 'pong'
});
```

## API Reference

### `createConnection(currentWindow, targetWindow, [targetOrigin])`

Returns `Connection` object with `send` and `handle` methods. 

- `targetWindow`: a reference to remote window
- `targetOrigin`: an origin that `targetWindow`'s origin must match. This check performed for both outgoing and incoming requests

### `send(request, [onResponse])`

Sends prepared request.

- `request`: a plain object containing request method, arguments list and set of service fields. Use `createRequest` helper to create proper request object
- `onResponse`: response handler. Accepts `Response` object with `payload` and optional `error` fields

### `handle(method, handler)`

Registers request handler for a given method.

- `method`: an unique method identifier. It's recommended to have prefix with your app name for custom methods (like `myAwesomeApp.analytics.sendEvent`)
- `handler`: a handler function that accepts response callback and list of method arguments. You can call response callback at any time passing to it result or error.

Example:

```js
connection.handle('myapp.divide', (respond, a, b) => {
  if (b === 0) {
    respond(null, 'Whoops, you\'re trying to divide by zero!');
  } else {
    respond(a / b);
  }
});
```

### `createRequest(method, ...args)`

Creates request object that could be sent later

- `method`: a name of the called method
- `args`: arguments that would be passed to method handler

Example:

```js
// We can make own "request creator" helper
const sum = (a, b) => createRequest('myapp.sum', a, b);

// And then send this request with different arguments easily
connection.send(sum(1, 1));
connection.send(sum(5, 5));
```
