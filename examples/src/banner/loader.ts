import { createContainer, initSizePlugin } from '@widget-kit/container';

const container = createContainer(window, {
  url: 'http://localhost:8080/widget.html',
});

initSizePlugin(container, {
  initialWidth: '0px',
  initialHeight: '0px',
});
