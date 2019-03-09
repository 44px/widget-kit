# @widget-kit/container

Provides own context for widget via iframe and allows communication between iframe and host page.

Embeddable widgets have to work in unpredictable environment — there are tons of sites and each of them have unique mix of JS scripts and global CSS. So no one can guarantee your widget wouldn't be broken by changed `Array.prototype.forEach` or something like `* {position: relative !important}`.  

The solution is to split widget in three parts:
- `snippet` — small script that loads your code. It's installed on client's site and so you have no control on this snippet once you give it away.
- `loader` — initial script that loaded and added to the host page by the snippet. It's loaded from your servers so you can update it easily. And it can work with page's data. But page's CSS and JS still can break this script.
- `widget` — loaded into iframe by the loader script. It has limited access to the host page, but lives in its own context fully controlled by you and safe from external CSS and JS.

It can be shown as:

```
 +--------------------------------------+
 | client-site.com                      |
 |--------------------------------------|
 | snippet, inline script               |
 |                                      |
 | loader, script tag                   |
 |   src="//widget.com/loader.js"       |
 |                                      |
 | +----------------------------------+ |
 | | widget, iframe                   | |
 | |   src="//widget.com/widget.html" | |
 | +----------------------------------+ |
 +--------------------------------------+  
```

## Install

```bash
$ npm install --save @widget-kit/container
```

## Usage

```js
// Main window:
const container = createContainer('https://remote.example.com/widget.html');

container.handle('ping', (respond) => {
  respond('pong');
});

// Iframe (loaded from https://remote.example.com):
const widget = initWidget();
const pingRequest = createRequest('ping');

widget.send(pingRequest, (response) => {
  console.log(response.payload);
});
```

## API Reference

### `createContainer(url, config)`

Creates iframe element and loads url from config into it. Establishes connection between current window and iframe's window. Should be called from host page.

- `url`: an url of widget that would be loaded into iframe.
- `config`:
  - `parentElement`: allows to define element that iframe would be attached to. Default value is `document.body`.

### `initWidget([containerOrigin])`

Establishes connection between current (iframe) and parent window. Should be called in widget code.

- `containerOrigin`: origin of a page your widget can talk to. Default value is `'*'` (no restrictions). 
