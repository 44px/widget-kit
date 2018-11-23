import { Request, createRequest } from '@widget-kit/rpc';
import { Container } from '../container';

const enum METHODS {
  getSize = 'plugins.size.getSize',
  setSize = 'plugins.size.setSize',
}

export interface Config {
  initialWidth?: string;
  initialHeight?: string;
}

export function initSizePlugin(container: Container, config: Config): void {
  const { iframe, handle } = container;

  function setSize(width?: string | null, height?: string | null) {
    if (width) {
      iframe.style.width = width;
    }

    if (height) {
      iframe.style.height = height;
    }
  }

  setSize(config.initialWidth, config.initialHeight);

  handle(METHODS.getSize, (produceResponse) => {
    const { width, height } = iframe.getBoundingClientRect();
    produceResponse({ width, height });
  });

  handle(METHODS.setSize, (_, width: string | null, height: string | null) => {
    setSize(width, height);
  });
}

export function getSize(): Request {
  return createRequest(METHODS.getSize);
}

export function setSize(width: string | null, height: string | null): Request {
  return createRequest(METHODS.setSize, width, height);
}
