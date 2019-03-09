import { createContainer } from '@widget-kit/container';
import { initPositionFixedPlugin } from '@widget-kit/container-plugin-position-fixed';
import { initSizePlugin } from '@widget-kit/container-plugin-size';

const container = createContainer(`${__webpack_public_path__}/widget.html`);

initSizePlugin(container, {
  initialSize: {
    width: '0',
    height: '0',
  },
});

initPositionFixedPlugin(container);
