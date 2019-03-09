# widget-kit

A set of utilities for embeddable widgets — apps which are installed on a wide range of different sites. They have to work in unpredictable environment and interact with external code. widget-kit aims to make these tasks easier.

## What's included

### @widget-kit/rpc
[![npm](https://img.shields.io/npm/v/@widget-kit/rpc.svg)](https://www.npmjs.com/package/@widget-kit/rpc) [![gzip size](https://img.shields.io/bundlephobia/minzip/@widget-kit/rpc.svg?label=gzip%20size)](https://bundlephobia.com/result?p=@widget-kit/rpc)

Establishes connection between two windows allowing both to send and handle requests.

### @widget-kit/container
[![npm](https://img.shields.io/npm/v/@widget-kit/container.svg)](https://www.npmjs.com/package/@widget-kit/container) [![gzip size](https://img.shields.io/bundlephobia/minzip/@widget-kit/container.svg?label=gzip%20size)](https://bundlephobia.com/result?p=@widget-kit/container)

Loads widget into iframe to isolate it from site’s CSS and provide own JS context. This package bundles `@widget-kit/rpc` so widget and site can communicate.

If you are building widget from scratch you can start with `container` and use plugins for common tasks:

### @widget-kit/container-plugin-size
[![npm](https://img.shields.io/npm/v/@widget-kit/container-plugin-size.svg)](https://www.npmjs.com/package/@widget-kit/container-plugin-size) [![gzip size](https://img.shields.io/bundlephobia/minzip/@widget-kit/container-plugin-size.svg?label=gzip%20size)](https://bundlephobia.com/result?p=@widget-kit/container-plugin-size)

Change iframe size from widget ([example](https://44px.github.io/widget-kit/banner/)).

### @widget-kit/container-plugin-position-fixed
[![npm](https://img.shields.io/npm/v/@widget-kit/container-plugin-position-fixed.svg)](https://www.npmjs.com/package/@widget-kit/container-plugin-position-fixed) [![gzip size](https://img.shields.io/bundlephobia/minzip/@widget-kit/container-plugin-position-fixed.svg?label=gzip%20size)](https://bundlephobia.com/result?p=@widget-kit/container-plugin-position-fixed)

Control iframe position relative to viewport. Useful for widgets which "floats" on a page, like [chats](https://44px.github.io/widget-kit/chat/) and [popups](https://44px.github.io/widget-kit/popup/).

## Development

`npm install` — install common dev dependencies and each package dependencies

`npm run bootstrap` — install dependencies for packages and create symlinks

`npm test` — run tests for all packages
