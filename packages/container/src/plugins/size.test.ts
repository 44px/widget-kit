import { getContainerAndWidget } from './test-utils';
import { initSizePlugin, getSize, setSize } from './size';

describe('Size plugin', () => {
  it('sets initial values', () => {
    const [container, _] = getContainerAndWidget();
    initSizePlugin(container, {
      initialWidth: '100px',
      initialHeight: '200px',
    });
    expect(container.iframe.style.width).toBe('100px');
    expect(container.iframe.style.height).toBe('200px');
  });

  it('handles getSize request', (done) => {
    const [container, widget] = getContainerAndWidget();
    initSizePlugin(container, {
      initialWidth: '100px',
      initialHeight: '200px',
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
      initialWidth: '100px',
      initialHeight: '200px',
    });
    widget.send(setSize('10%', '20%'));
    setTimeout(() => {
      expect(container.iframe.style.width).toBe('10%');
      expect(container.iframe.style.height).toBe('20%');
      done();
    });
  });

  it('handles setSize request: only width', (done) => {
    const [container, widget] = getContainerAndWidget();
    initSizePlugin(container, {
      initialWidth: '100px',
      initialHeight: '200px',
    });
    widget.send(setSize('150px', null));
    setTimeout(() => {
      expect(container.iframe.style.width).toBe('150px');
      expect(container.iframe.style.height).toBe('200px');
      done();
    });
  });

  it('handles setSize request: only height', (done) => {
    const [container, widget] = getContainerAndWidget();
    initSizePlugin(container, {
      initialWidth: '100px',
      initialHeight: '200px',
    });
    widget.send(setSize(null, '300px'));
    setTimeout(() => {
      expect(container.iframe.style.width).toBe('100px');
      expect(container.iframe.style.height).toBe('300px');
      done();
    });
  });
});
