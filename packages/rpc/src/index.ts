import { createConnection as internalCreateConnection } from './rpc';

export {
  Request,
  Response,
  ResponseProducerFn,
  ResponseHandlerFn,
  HandlerFn,
  Connection,
  createRequest,
} from './rpc';

export function createConnection(targetWindow: Window, targetOrigin: string = '*') {
  return internalCreateConnection(window, targetWindow, targetOrigin);
}
