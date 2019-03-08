import { Container, createContainer, Request, Widget } from '@widget-kit/container';
import { initPositionFixedPlugin, setPosition } from './position-fixed';

describe('PositionFixed plugin', () => {
  let container: Container;
  let widget: Widget;
  const dispatchEvent = window.dispatchEvent;
  beforeEach(() => {
    container = createContainer('https://widget.example.com');

    let sequenceId = 0;
    widget = {
      send(request: Request): void {
        sequenceId += 1;
        request.sequenceId = sequenceId;
        window.postMessage(request, '*');
      },
      handle: jest.fn(),
    };

    // Since JSDOM has no support for event.origin and event.source add them manually
    const widgetWindow = container.iframe.contentWindow as Window;
    window.dispatchEvent = (event: Event): boolean => {
      if (event.type === 'message') {
        Object.defineProperty(event, 'source', {
          value: widgetWindow,
        });
        Object.defineProperty(event, 'origin', {
          value: widgetWindow.location.origin,
        });
      }
      return dispatchEvent(event);
    };
  });

  it('keeps default values', () => {
    initPositionFixedPlugin(container);
    expect(container.iframe.style.position).toBe('fixed');
    expect(container.iframe.style.top).toBe('');
    expect(container.iframe.style.left).toBe('');
    expect(container.iframe.style.right).toBe('');
    expect(container.iframe.style.bottom).toBe('');
  });

  it('sets initial values', () => {
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
