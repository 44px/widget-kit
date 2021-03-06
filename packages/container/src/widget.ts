import { Connection, createConnection } from '@widget-kit/rpc';

export type Widget = Connection;

export function initWidget(containerOrigin: string = '*'): Widget {
  const containerWindow = window.parent;
  if (containerWindow === window) {
    throw new Error('No parent window, widget must be loaded in an iframe');
  }

  return createConnection(containerWindow, containerOrigin);
}
