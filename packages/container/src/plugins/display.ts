import { Request, createRequest } from '@widget-kit/rpc';
import { Container } from '../container';

const enum METHODS {
  hide = 'plugins.display.hide',
  show = 'plugins.display.show',
}

export interface Config {
  visible?: boolean;
}

export function initDisplayPlugin(container: Container, config: Config): void {
  const { iframe, handle } = container;

  function setDisplay(visible: boolean = true) {
    iframe.style.display = visible ? 'block' : 'none';
  }

  setDisplay(config.visible);

  handle(METHODS.hide, () => setDisplay(false));
  handle(METHODS.show, () => setDisplay(true));
}

export function hide(): Request {
  return createRequest(METHODS.hide);
}

export function show(): Request {
  return createRequest(METHODS.show);
}
