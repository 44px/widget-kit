import { Request, createRequest } from '@widget-kit/rpc';
import { Container } from '../container';

const enum METHODS {
  getPosition = 'plugins.positionFixed.getPosition',
  setPosition = 'plugins.positionFixed.setPosition',
}

export interface Config {
  initialTop?: string;
  initialLeft?: string;
}

export function initPositionFixedPlugin(container: Container, config: Config): void {
  const { iframe, handle } = container;

  function setPosition(top?: string | null, left?: string | null) {
    if (top) {
      iframe.style.top = top;
    }

    if (left) {
      iframe.style.left = left;
    }
  }

  iframe.style.position = 'fixed';
  setPosition(config.initialTop, config.initialLeft);

  handle(METHODS.getPosition, (produceResponse) => {
    const { top, left } = iframe.getBoundingClientRect();
    produceResponse({ top, left });
  });

  handle(METHODS.setPosition, (_, top: string | null, left: string | null) => {
    setPosition(top, left);
  });
}

export function getPosition(): Request {
  return createRequest(METHODS.getPosition);
}

export function setPosition(top: string | null, left: string | null): Request {
  return createRequest(METHODS.setPosition, top, left);
}
