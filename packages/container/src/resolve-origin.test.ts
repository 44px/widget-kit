import { resolveOrigin } from './resolve-origin';

describe('resolveOrigin', () => {
  it('throws on invalid url', () => {
    expect(() => {
      resolveOrigin(window, 'test');
    }).toThrow();
  });

  it('handles http scheme', () => {
    const origin = resolveOrigin(window, 'http://example.com/path/file.html');
    expect(origin).toEqual('http://example.com');
  });

  it('handles https scheme', () => {
    const origin = resolveOrigin(window, 'https://example.com/path/file.html');
    expect(origin).toEqual('https://example.com');
  });

  it('handles port', () => {
    const origin = resolveOrigin(window, 'https://example.com:8080/path/file.html');
    expect(origin).toEqual('https://example.com:8080');
  });

  it('handles protocol relative url', () => {
    // current scheme is https (see "testURL" property in jest config)
    const origin = resolveOrigin(window, '//example.com:8080/path/file.html');
    expect(origin).toEqual('https://example.com:8080');
  });
});
