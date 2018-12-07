import { createContainer, initSizePlugin, initPositionFixedPlugin } from '@widget-kit/container';

const container = createContainer(window, {
  url: 'http://localhost:8080/widget.html',
});

initSizePlugin(container, {
  initialSize: {
    width: '0',
    height: '0',
  },
});

initPositionFixedPlugin(container);
