import { initWidget } from './widget';

describe('initWidget', () => {
  it('should throw error if called not in an iframe', () => {
    expect(() => {
      initWidget('*');
    }).toThrow();
  });
});
