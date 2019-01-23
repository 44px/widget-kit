# widget-kit

A set of utilities for embeddable widgets — apps which are installed on a wide range of different sites. They have to work in unpredictable environment and interact with external code. widget-kit aims to make these tasks easier.

## What's included

`@widget-kit/rpc` — establishes connection between two windows allowing both to send and handle requests.

`@widget-kit/container` — loads widget into iframe to isolate it from site’s CSS and provide own JS context. This package bundles `@widget-kit/rpc` so widget and site can communicate.

If you are building widget from scratch you can start with `container` and use plugins for common tasks:

`@widget-kit/container-plugin-size` — change iframe size from widget.

`@widget-kit/container-plugin-position-fixed` — control iframe position relative to viewport. Useful for widgets which "floats" on a page, like chats and popups.

## Development

`npm install` — install common dev dependencies and each package dependencies

`npm run bootstrap` — install dependencies for packages and create symlinks

`npm test` — run tests for all packages
