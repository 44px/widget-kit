import { getContainerAndWidget } from './test-utils';
import { initDisplayPlugin, show, hide } from './display';

describe('Display plugin', () => {
  it('sets initial values', () => {
    const [container, _] = getContainerAndWidget();
    initDisplayPlugin(container, {
      visible: false,
    });
    expect(container.iframe.style.display).toBe('none');
  });

  it('sets default initial values', () => {
    const [container, _] = getContainerAndWidget();
    initDisplayPlugin(container, {});
    expect(container.iframe.style.display).toBe('block');
  });

  it('handles show request', (done) => {
    const [container, widget] = getContainerAndWidget();
    initDisplayPlugin(container, {
      visible: false,
    });
    widget.send(show());
    setTimeout(() => {
      expect(container.iframe.style.display).toBe('block');
      done();
    });
  });

  it('handles hide request', (done) => {
    const [container, widget] = getContainerAndWidget();
    initDisplayPlugin(container, {
      visible: true,
    });
    widget.send(hide());
    setTimeout(() => {
      expect(container.iframe.style.display).toBe('none');
      done();
    });
  });
});
