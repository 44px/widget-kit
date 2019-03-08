import { Container, createContainer, Request, Widget } from '@widget-kit/container';
import { initSizePlugin, setSize } from './size';

describe('Size plugin', () => {
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
    initSizePlugin(container);
    expect(container.iframe.style.width).toBe('');
    expect(container.iframe.style.height).toBe('');
    expect(container.iframe.style.maxWidth).toBe('');
    expect(container.iframe.style.maxHeight).toBe('');
  });

  it('sets initial values', () => {
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

  it('handles setSize request', (done) => {
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
