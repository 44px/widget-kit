export function resolveOrigin(window: Window, url: string): string {
  const matches = url.match(/^(https?:)?\/\/[.\w]+(:\d+)?/i);
  if (!matches) {
    throw new Error('Invalid url');
  }
  return matches[0].replace(/^\/\//, `${window.location.protocol}//`);
}
