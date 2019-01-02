import { createRequest, initWidget } from '@widget-kit/container';

const widget = initWidget(window);
const pingRequest = createRequest('ping');

widget.send(pingRequest, (response) => {
  console.log(response.payload);
});
