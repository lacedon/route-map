import { createRoute } from './index';

describe('createRoute should return a function that returns a right route string', () => {
  test('createRoute returns a function', () => {
    expect(typeof createRoute('test')).toEqual('function');
    expect(typeof createRoute(() => 'test')).toEqual('function');
  });

  test('createRoute insert variables into string', () => {
    const url = 'test-{key}-{def}';
    const result = 'test-test-default';

    expect(
      createRoute<{ key: string; def: string }>(url, { def: 'default' })({
        key: 'test',
      }),
    ).toEqual(result);

    expect(
      createRoute<{ key: string; def: string }>(() => url, {
        def: 'default',
      })({ key: 'test' }),
    ).toEqual(result);
  });
});
