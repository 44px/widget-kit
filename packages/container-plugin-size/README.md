# @widget-kit/container-plugin-size

Control iframe size from widget.

### Install

```bash
$ npm install --save @widget-kit/container-plugin-size
```

### Usage

```js
// Main window ("loader" script):
initSizePlugin(container, {
  initialSize: {
    width: '100%',
    height: '0',
  },
});

// Widget:
const request = setSize({
  height: '100%',
  maxHeight: '500px',
});
widget.send(request);
```

### API Reference

#### `initSizePlugin(container, [config])`

Registers handler for `setSize` requests and allows to set initial size.

- `container`: a `Container` instance returned by `createContainer`
- `config`: allows to set initial size properties (width, height, maxWidth and maxHeight). All properties accept string values (e.g '200px' or '100%').

#### `setSize(size)`

Creates request with a new size.

- `size`: properties that should be changed (width, height, maxWidth, maxHeight)
