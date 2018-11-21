interface Sequential {
  sequenceId: number;
}

const REQUEST_TYPE = '@widget-kit/rpc/request';
const RESPONSE_TYPE = '@widget-kit/rpc/response';

export interface Request extends Sequential {
  readonly type: '@widget-kit/rpc/request';
  readonly method: string;
  readonly args: any[];
}

export function createRequest(method: string, ...args: any): Request {
  return {
    method,
    args,
    type: REQUEST_TYPE,
    sequenceId: 0,
  };
}

export interface Response extends Sequential {
  readonly type: '@widget-kit/rpc/response';
  readonly payload: any;
  readonly error?: any;
}

function createResponse(request: Request, payload: any, error?: any): Response {
  return {
    payload,
    error,
    type: RESPONSE_TYPE,
    sequenceId: request.sequenceId,
  };
}

type Message = Request | Response;

export type ResponseProducerFn = (payload: any, error?: any) => void;

export type HandlerFn = (produceResponse: ResponseProducerFn, ...args: any) => any;

export type ResponseHandlerFn = (response: Response) => any;

export interface Connection {
  handle(method: string, handler: HandlerFn): void;

  send(request: Request, onResponse?: ResponseHandlerFn): void;
}

type RequestHandlersMap = {
  [method: string]: HandlerFn;
};

type ResponseHandlersMap = {
  [sequenceId: number]: ResponseHandlerFn;
};

export function createConnection(
  currentWindow: Window,
  targetWindow: Window,
  targetOrigin: string = '*',
): Connection {
  const postMessage = (message: Message) => targetWindow.postMessage(message, targetOrigin);

  const requestHandlers: RequestHandlersMap = {};
  function handleRequest(request: Request): void {
    const handler = requestHandlers[request.method];
    if (typeof handler !== 'function') {
      // TODO: log warning in dev mode or maybe in debug mode?
      return;
    }
    const responseProducer: ResponseProducerFn = (payload, error) => {
      postMessage(createResponse(request, payload, error));
    };
    handler(responseProducer, ...request.args);
  }

  const responseHandlers: ResponseHandlersMap = {};
  function handleResponse(response: Response): void {
    const handler = responseHandlers[response.sequenceId];
    if (typeof handler !== 'function') {
      return;
    }
    handler(response);
    delete requestHandlers[response.sequenceId];
  }

  currentWindow.addEventListener('message', (event) => {
    if (!isEventTrusted(event, targetWindow, targetOrigin)) {
      return;
    }

    const message = checkMessage(event.data);
    if (!message) {
      return;
    }

    switch (message.type) {
      case REQUEST_TYPE:
        return handleRequest(message);
      case RESPONSE_TYPE:
        return handleResponse(message);
    }
  });

  const nextSequenceId = createSequenceIdGenerator();
  return {
    handle(method: string, handler: HandlerFn): void {
      if (typeof requestHandlers[method] === 'function') {
        throw new Error(`Handler for ${method} already declared`);
      }

      requestHandlers[method] = handler;
    },
    send(request: Request, onResponse?: (response: Response) => any): void {
      // TODO: Should throw on invalid requests
      request.sequenceId = nextSequenceId();
      if (onResponse) {
        responseHandlers[request.sequenceId] = onResponse;
      }
      postMessage(request);
    },
  };
}

function createSequenceIdGenerator() {
  let sequenceId = 0;
  return () => {
    sequenceId += 1;
    return sequenceId;
  };
}

function isEventTrusted(
  event: MessageEvent,
  expectedWindow: Window,
  expectedOrigin: string,
): boolean {
  return (
    event.source === expectedWindow && (expectedOrigin === '*' || event.origin === expectedOrigin)
  );
}

function checkMessage(message: any): Message | null {
  if (message && typeof message.sequenceId === 'number' && typeof message.type === 'string') {
    return message as Message;
  }

  return null;
}
