import { getContainerAndWidget } from './test-utils';
import { initSizePlugin, getSize, setSize } from './size';

describe('Size plugin', () => {
  it('keeps default values', () => {
    const [container, _] = getContainerAndWidget();
    initSizePlugin(container, {});
    expect(container.iframe.style.width).toBe('');
    expect(container.iframe.style.height).toBe('');
    expect(container.iframe.style.maxWidth).toBe('');
    expect(container.iframe.style.maxHeight).toBe('');
  });

  it('sets initial values', () => {
    const [container, _] = getContainerAndWidget();
    initSizePlugin(container, {
      initialSize: {
        width: '100px',
        height: '200px',
        maxWidth: '101px',
        maxHeight: '201px',
      },
    });
    expect(container.iframe.style.width).toBe('100px');
    expect(container.iframe.style.height).toBe('200px');
    expect(container.iframe.style.maxWidth).toBe('101px');
    expect(container.iframe.style.maxHeight).toBe('201px');
  });

  it('handles getSize request', (done) => {
    const [container, widget] = getContainerAndWidget();
    initSizePlugin(container, {
      initialSize: {
        width: '100px',
        height: '200px',
        maxWidth: '101px',
        maxHeight: '201px',
      },
    });
    widget.send(getSize(), (response) => {
      // JSDOM implementation of getBoundingClientRect returns zeros for all values
      // So check here just shape of response but not values
      expect(response.payload.width).toBeDefined();
      expect(response.payload.height).toBeDefined();
      done();
    });
  });

  it('handles setSize request', (done) => {
    const [container, widget] = getContainerAndWidget();
    initSizePlugin(container, {
      initialSize: {
        width: '100px',
        height: '200px',
        maxWidth: '101px',
        maxHeight: '201px',
      },
    });
    widget.send(setSize({ width: '10%', height: '20%', maxWidth: '11%', maxHeight: '21%' }));
    setTimeout(() => {
      expect(container.iframe.style.width).toBe('10%');
      expect(container.iframe.style.height).toBe('20%');
      expect(container.iframe.style.maxWidth).toBe('11%');
      expect(container.iframe.style.maxHeight).toBe('21%');
      done();
    });
  });

  it('handles setSize request: only width', (done) => {
    const [container, widget] = getContainerAndWidget();
    initSizePlugin(container, {
      initialSize: {
        width: '100px',
        height: '200px',
      },
    });
    widget.send(setSize({ width: '150px' }));
    setTimeout(() => {
      expect(container.iframe.style.width).toBe('150px');
      expect(container.iframe.style.height).toBe('200px');
      done();
    });
  });
});
