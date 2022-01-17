import { insertVariable, insertVariables } from './insert-variable';

describe('insertVariable should return a new string with a variable into base string', () => {
  test('insertVariable should set a variable by a key', () => {
    expect(insertVariable('start-{key}-end', 'key', 'content')).toEqual(
      'start-content-end',
    );
  });

  test('insertVariable should set the right variable by key', () => {
    expect(insertVariable('start-{key}-{key1}-end', 'key', 'content')).toEqual(
      'start-content-{key1}-end',
    );
  });

  test('insertVariable should set the right variable multiple times', () => {
    expect(insertVariable('start-{key}-{key}-end', 'key', 'content')).toEqual(
      'start-content-content-end',
    );
  });

  test("insertVariable should hide the variable if it's empty", () => {
    expect(insertVariable('start-{key}-end', 'key', undefined)).toEqual(
      'start--end',
    );
  });
});

describe('insertVariables should return a new string with variable map into base string', () => {
  test('insertVariables use variable map to set into the string', () => {
    expect(insertVariables('start-{key}-end', { key: 'content' })).toEqual(
      'start-content-end',
    );
  });

  test('insertVariables use default variable map if there is no variable in the main map', () => {
    expect(
      insertVariables<{ key: string }>(
        'start-{key}-end',
        { key: undefined },
        { key: 'default' },
      ),
    ).toEqual('start-default-end');
    expect(
      insertVariables<{ key: string }>(
        'start-{key}-end',
        { key: 'main' },
        { key: 'default' },
      ),
    ).toEqual('start-main-end');
    expect(
      insertVariables<{ key: string, key1: string }>(
        'start-{key}-{key1}-end',
        { key: 'main' },
        { key1: 'default' },
      ),
    ).toEqual('start-main-default-end');
  });

  test('insertVariables allow to work with a custom variable', () => {
    const mockedInsertVariable = jest.fn(insertVariable);

    const result = insertVariables(
      'start-{key}-end',
      { key: 'content' },
      undefined,
      mockedInsertVariable,
    );

    expect(result).toEqual('start-content-end');
    expect(mockedInsertVariable.mock.calls.length).toEqual(1);
    expect(mockedInsertVariable.mock.calls[0][0]).toEqual('start-{key}-end');
    expect(mockedInsertVariable.mock.calls[0][1]).toEqual('key');
    expect(mockedInsertVariable.mock.calls[0][2]).toEqual('content');
  });
});
