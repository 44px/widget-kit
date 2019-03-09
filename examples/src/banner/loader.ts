import { createContainer } from '@widget-kit/container';
import { initSizePlugin } from '@widget-kit/container-plugin-size';

const container = createContainer(`${__webpack_public_path__}/widget.html`);

initSizePlugin(container, {
  initialSize: {
    width: '100%',
    height: '0',
  },
});
