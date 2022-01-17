export function normalizeQueryString(url: string): string {
  return url
    .replace(/(\?|&)&*/g, '$1') // remove ?&, &&, etc.
    .replace(/(\?|&)$/, ''); // remove ? or & at the end of the string
}
