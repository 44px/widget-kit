import { createContainer, initSizePlugin, initPositionFixedPlugin } from '@widget-kit/container';

const container = createContainer(window, {
  url: 'http://localhost:8080/widget.html',
});

initSizePlugin(container, {
  initialWidth: '0',
  initialHeight: '0',
});

initPositionFixedPlugin(container, {
  initialTop: '50%',
  initialLeft: '100%',
});
