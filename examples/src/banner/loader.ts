import { createContainer } from '@widget-kit/container';
import { initSizePlugin } from '@widget-kit/container-plugin-size';

const container = createContainer('http://localhost:8080/banner/widget.html');

initSizePlugin(container, {
  initialSize: {
    width: '100%',
    height: '0',
  },
});
