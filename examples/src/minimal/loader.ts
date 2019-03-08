import { createContainer } from '@widget-kit/container';

const container = createContainer('http://localhost:8080/minimal/widget.html');

container.handle('ping', (respond) => {
  respond('pong');
});
