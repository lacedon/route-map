export function normalizeQueryString(url: string): string {
  return url
    .replace(/(\?|&)&*/g, "$1") // remove ?&, &&, etc.
    .replace(/(\?|&)$/, ""); // remove ? or & at the end of the string
}

// tests:
/*
  https://test.test/?&&asd=123&&&a=1&&
  https://test.test/?&&
  https://test.test/?
  https://test.test/?a=123&as=1&
  https://test.test/
*/
