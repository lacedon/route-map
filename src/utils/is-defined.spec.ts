import { isDefined } from './is-defined';

describe('isDefined should return false for not defined values', () => {
  test('isDefined should return false for null', () => {
    expect(isDefined(null)).toEqual(false);
  });

  test('isDefined should return false for undefined', () => {
    expect(isDefined(undefined)).toEqual(false);
  });
});

describe('isDefined should return true for defined values', () => {
  test('isDefined should return true for 0', () => {
    expect(isDefined(0)).toEqual(true);
  });

  test('isDefined should return true for 123', () => {
    expect(isDefined(123)).toEqual(true);
  });

  test('isDefined should return true for ""', () => {
    expect(isDefined('')).toEqual(true);
  });

  test('isDefined should return true for "test"', () => {
    expect(isDefined('test')).toEqual(true);
  });

  test('isDefined should return true for false', () => {
    expect(isDefined(false)).toEqual(true);
  });

  test('isDefined should return true for true', () => {
    expect(isDefined(true)).toEqual(true);
  });
});
