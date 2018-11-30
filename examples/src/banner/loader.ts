import { createContainer, initSizePlugin } from '@widget-kit/container';

const container = createContainer(window, {
  url: 'http://localhost:8080/widget.html',
});

initSizePlugin(container, {
  initialWidth: '100%',
  initialHeight: '0px',
});
