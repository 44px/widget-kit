import { Request, createRequest } from '@widget-kit/rpc';
import { Container } from '../container';

const enum METHODS {
  getSize = 'plugins.size.getSize',
  setSize = 'plugins.size.setSize',
}

export interface Config {
  initialSize?: Size;
}

interface Size {
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
}

export function initSizePlugin(container: Container, config: Config): void {
  const { iframe, handle } = container;

  function setSize(size: Size) {
    size.width && (iframe.style.width = size.width);
    size.height && (iframe.style.height = size.height);
    size.maxWidth && (iframe.style.maxWidth = size.maxWidth);
    size.maxHeight && (iframe.style.maxHeight = size.maxHeight);
  }

  if (config.initialSize) {
    setSize(config.initialSize);
  }

  handle(METHODS.getSize, (produceResponse) => {
    const { width, height } = iframe.getBoundingClientRect();
    produceResponse({ width, height });
  });

  handle(METHODS.setSize, (_, size: Size) => {
    setSize(size);
  });
}

export function getSize(): Request {
  return createRequest(METHODS.getSize);
}

export function setSize(size: Size): Request {
  return createRequest(METHODS.setSize, size);
}
