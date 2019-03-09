# @widget-kit/container-plugin-position-fixed [![npm](https://img.shields.io/npm/v/@widget-kit/container-plugin-position-fixed.svg)](https://www.npmjs.com/package/@widget-kit/container-plugin-position-fixed) [![gzip size](https://img.shields.io/bundlephobia/minzip/@widget-kit/container-plugin-position-fixed.svg?label=gzip%20size)](https://bundlephobia.com/result?p=@widget-kit/container-plugin-position-fixed)

Control iframe position from widget.

## Install

```bash
$ npm install --save @widget-kit/container-plugin-position-fixed
```

## Usage

```js
// Main window ("loader" script):
initPositionFixedPlugin(container, {
  initialPosition: {
    top: '0',
    left: '0',
  },
});

// Widget:
const request = setPosition({
  top: '50%',
  left: '50%',
});
widget.send(request);
```

## API Reference

### `initPositionFixedPlugin(container, [config])`

Registers handler for `setPosition` requests, sets `position: fixed` for iframe and allows to set initial position.

- `container`: a `Container` instance returned by `createContainer`.
- `config`: allows to set initial position properties (top, left, right, bottom). All properties accept string values (e.g. '200px' or '100%').

### `setPosition(position)`

Creates request with a new position.

- `position`: properties that would be changed (top, left, right, bottom).
