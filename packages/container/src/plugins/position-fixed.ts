import { Request, createRequest } from '@widget-kit/rpc';
import { Container } from '../container';

const enum METHODS {
  getPosition = 'plugins.positionFixed.getPosition',
  setPosition = 'plugins.positionFixed.setPosition',
}

export interface Config {
  initialPosition?: Position;
}

interface Position {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export function initPositionFixedPlugin(container: Container, config: Config): void {
  const { iframe, handle } = container;

  function setPosition(position: Position) {
    position.top && (iframe.style.top = position.top);
    position.left && (iframe.style.left = position.left);
    position.right && (iframe.style.right = position.right);
    position.bottom && (iframe.style.bottom = position.bottom);
  }

  iframe.style.position = 'fixed';
  if (config.initialPosition) {
    setPosition(config.initialPosition);
  }

  handle(METHODS.getPosition, (produceResponse) => {
    const { top, left, right, bottom } = iframe.getBoundingClientRect();
    produceResponse({ top, left, right, bottom });
  });

  handle(METHODS.setPosition, (_, position: Position) => {
    setPosition(position);
  });
}

export function getPosition(): Request {
  return createRequest(METHODS.getPosition);
}

export function setPosition(position: Position): Request {
  return createRequest(METHODS.setPosition, position);
}
