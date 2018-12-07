import { getContainerAndWidget } from './test-utils';
import { initPositionFixedPlugin, setPosition } from './position-fixed';

describe('PositionFixed plugin', () => {
  it('keeps default values', () => {
    const [container, _] = getContainerAndWidget();
    initPositionFixedPlugin(container, {});
    expect(container.iframe.style.position).toBe('fixed');
    expect(container.iframe.style.top).toBe('');
    expect(container.iframe.style.left).toBe('');
    expect(container.iframe.style.right).toBe('');
    expect(container.iframe.style.bottom).toBe('');
  });

  it('sets initial values', () => {
    const [container, _] = getContainerAndWidget();
    initPositionFixedPlugin(container, {
      initialPosition: {
        top: '10px',
        left: '20px',
        right: '30px',
        bottom: '40px',
      },
    });
    expect(container.iframe.style.position).toBe('fixed');
    expect(container.iframe.style.top).toBe('10px');
    expect(container.iframe.style.left).toBe('20px');
    expect(container.iframe.style.right).toBe('30px');
    expect(container.iframe.style.bottom).toBe('40px');
  });

  it('handles setPosition request', (done) => {
    const [container, widget] = getContainerAndWidget();
    initPositionFixedPlugin(container, {
      initialPosition: {
        top: '10px',
        left: '20px',
        right: '30px',
        bottom: '40px',
      },
    });
    widget.send(
      setPosition({
        top: '50%',
        left: '40%',
        right: '30%',
        bottom: '20%',
      }),
    );
    setTimeout(() => {
      expect(container.iframe.style.top).toBe('50%');
      expect(container.iframe.style.left).toBe('40%');
      expect(container.iframe.style.right).toBe('30%');
      expect(container.iframe.style.bottom).toBe('20%');
      done();
    });
  });

  it('handles setPosition request: only top', (done) => {
    const [container, widget] = getContainerAndWidget();
    initPositionFixedPlugin(container, {
      initialPosition: {
        top: '10px',
        left: '20px',
      },
    });
    widget.send(setPosition({ top: '100px' }));
    setTimeout(() => {
      expect(container.iframe.style.top).toBe('100px');
      expect(container.iframe.style.left).toBe('20px');
      expect(container.iframe.style.right).toBe('');
      expect(container.iframe.style.bottom).toBe('');
      done();
    });
  });
});
