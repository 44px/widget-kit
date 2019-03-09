import { createContainer } from '@widget-kit/container';

const container = createContainer(`${__webpack_public_path__}/widget.html`);

container.handle('ping', (respond) => {
  respond('pong');
});
