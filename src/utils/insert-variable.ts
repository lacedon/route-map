import { isDefined } from './is-defined';

export type Value = void | string | number | boolean;

export function insertVariable(
  result: string,
  key: string,
  value: Value,
): string {
  return result.replace(
    new RegExp(`(\\w+=)?\\{${key}\\}`, 'g'),
    isDefined(value) ? `$1${value.toString()}` : '',
  );
}

export function insertVariables<Variables extends Record<string, Value> | void>(
  url: string,
  variables: Partial<Variables>,
  defaultVariables: void | Partial<Variables>,
  insertVariableMethod: (
    result: string,
    key: string,
    value: Value,
  ) => string = insertVariable,
): string {
  let resultURL = url;
  const variableKeys = new Set(variables ? Object.keys(variables) : undefined);

  for (const key of variableKeys) {
    resultURL = insertVariableMethod(
      resultURL,
      key,
      variables[key] ?? defaultVariables[key],
    );
  }

  if (defaultVariables) {
    for (const key of Object.keys(defaultVariables)) {
      if (!variableKeys.has(key)) {
        resultURL = insertVariableMethod(resultURL, key, defaultVariables[key]);
      }
    }
  }

  return resultURL;
}