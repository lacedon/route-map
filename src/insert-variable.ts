import { isDefined } from "./utils/is-defined";

export type Value = void | string | number | boolean;

function insertVariable(url: string, key: string, value: Value): string {
  return url.replace(
    new RegExp(`(\\w+=)?\\[${key}\\]`, "g"),
    isDefined(value) ? `$1${value.toString()}` : ""
  );
}

export function insertVariables<Variables extends Record<string, Value> | void>(
  url: string,
  variables: Variables,
  defaultVariables: void | Partial<Variables>
): string {
  let resultURL = url;
  const variableKeys = new Set(variables ? Object.keys(variables) : undefined);

  for (const key of variableKeys) {
    resultURL = insertVariable(resultURL, key, variables[key]);
  }

  if (defaultVariables) {
    for (const key of Object.keys(defaultVariables)) {
      if (!variableKeys.has(key)) {
        resultURL = insertVariable(resultURL, key, variables[key]);
      }
    }
  }

  return resultURL;
}
