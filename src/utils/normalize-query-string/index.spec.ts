import { normalizeQueryString } from './index';

test('normalizeQueryString should return false for null', () => {
  expect(normalizeQueryString('https://test.test/?&&asd=123&&&a=1&&')).toEqual(
    'https://test.test/?asd=123&a=1',
  );
});

test('normalizeQueryString should return false for null', () => {
  expect(normalizeQueryString('https://test.test/?&&')).toEqual(
    'https://test.test/',
  );
});

test('normalizeQueryString should return false for null', () => {
  expect(normalizeQueryString('https://test.test/?')).toEqual(
    'https://test.test/',
  );
});

test('normalizeQueryString should return false for null', () => {
  expect(normalizeQueryString('https://test.test/?a=123&as=1&')).toEqual(
    'https://test.test/?a=123&as=1',
  );
});

test('normalizeQueryString should return false for null', () => {
  expect(normalizeQueryString('https://test.test/')).toEqual(
    'https://test.test/',
  );
});
