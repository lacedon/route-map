import { normalizeQueryString } from '@/utils/normalize-query-string';
import { insertVariables, Value } from '@/utils/insert-variable';

export type Route<Variables = void> = (variables: Variables) => string;

function createRoute<Variables extends Record<string, Value> | void = void>(
  url: string,
  defaultVariables?: Partial<Variables>,
): Route<Variables>;
function createRoute<Variables extends Record<string, Value> | void = void>(
  createURL: (variables: Variables) => string,
  defaultVariables?: Partial<Variables>,
): Route<Variables>;
function createRoute<Variables extends Record<string, Value> | void = void>(
  url: string | ((variables: Variables) => string),
  defaultVariables?: Partial<Variables>,
): Route<Variables> {
  if (typeof url === 'function')
    return (variables: Variables) => normalizeQueryString(url(variables));

  if (typeof url !== 'string' || !/\{(?:\.{3})?\w+\}/.test(url))
    return () => url;

  return (variables: Variables) =>
    normalizeQueryString(insertVariables(url, variables, defaultVariables));
}

export { createRoute };
