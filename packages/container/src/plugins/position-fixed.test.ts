import { getContainerAndWidget } from './test-utils';
import { initPositionFixedPlugin, getPosition, setPosition } from './position-fixed';

describe('PositionFixed plugin', () => {
  it('sets initial values', () => {
    const [container, _] = getContainerAndWidget();
    initPositionFixedPlugin(container, {
      initialTop: '10px',
      initialLeft: '20px',
    });
    expect(container.iframe.style.top).toBe('10px');
    expect(container.iframe.style.left).toBe('20px');
  });

  it('handles getPosition request', (done) => {
    const [container, widget] = getContainerAndWidget();
    initPositionFixedPlugin(container, {
      initialTop: '10px',
      initialLeft: '20px',
    });
    widget.send(getPosition(), (response) => {
      // JSDOM implementation of getBoundingClientRect returns zeros for all values
      // So check here just shape of response but not values
      expect(response.payload.top).toBeDefined();
      expect(response.payload.left).toBeDefined();
      done();
    });
  });

  it('handles setPosition request', (done) => {
    const [container, widget] = getContainerAndWidget();
    initPositionFixedPlugin(container, {
      initialTop: '10px',
      initialLeft: '20px',
    });
    widget.send(setPosition('50%', '40%'));
    setTimeout(() => {
      expect(container.iframe.style.top).toBe('50%');
      expect(container.iframe.style.left).toBe('40%');
      done();
    });
  });

  it('handles setPosition request: only top', (done) => {
    const [container, widget] = getContainerAndWidget();
    initPositionFixedPlugin(container, {
      initialTop: '10px',
      initialLeft: '20px',
    });
    widget.send(setPosition('100px', null));
    setTimeout(() => {
      expect(container.iframe.style.top).toBe('100px');
      expect(container.iframe.style.left).toBe('20px');
      done();
    });
  });

  it('handles setPosition request: only left', (done) => {
    const [container, widget] = getContainerAndWidget();
    initPositionFixedPlugin(container, {
      initialTop: '10px',
      initialLeft: '20px',
    });
    widget.send(setPosition(null, '100px'));
    setTimeout(() => {
      expect(container.iframe.style.top).toBe('10px');
      expect(container.iframe.style.left).toBe('100px');
      done();
    });
  });
});
