import { Container, Request, createRequest } from '@widget-kit/container';

const enum METHODS {
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

export function initPositionFixedPlugin(container: Container, config: Config = {}): void {
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

  handle(METHODS.setPosition, (_, position: Position) => {
    setPosition(position);
  });
}

export function setPosition(position: Position): Request {
  return createRequest(METHODS.setPosition, position);
}
