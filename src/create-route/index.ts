import {
  insertVariables,
  InsertVariable,
  Value,
} from '../utils/insert-variable';
import {
  normalizeQueryString as defaultNormalizeQueryString,
  NormalizeQueryString,
} from '../utils/normalize-query-string';

export type Route<Variables = void> = (variables: Partial<Variables>) => string;

type CreateURL<Variables> = (variables: Variables) => string;

interface Options {
  insertVariable?: InsertVariable;
  normalizeQueryString?: NormalizeQueryString;
}

function createRoute<Variables extends Record<string, unknown> | void = void>(
  url: string,
  defaultVariables?: Partial<Variables>,
  options?: Options,
): Route<Variables>;

function createRoute<Variables extends unknown | void = void>(
  createURL: CreateURL<Variables>,
  defaultVariables?: Partial<Variables>,
  options?: Options,
): Route<Variables>;

function createRoute<Variables extends Record<string, Value> | void = void>(
  url: string | CreateURL<Variables>,
  defaultVariables?: Partial<Variables>,
  {
    insertVariable,
    normalizeQueryString = defaultNormalizeQueryString,
  }: Options = {},
): Route<Variables> {
  if (typeof url === 'function') {
    return (variables) =>
      normalizeQueryString(
        insertVariables(
          url({ ...defaultVariables, ...variables } as Variables),
          variables,
          defaultVariables,
          insertVariable,
        ),
      );
  }

  if (typeof url !== 'string' || !/\{(?:\.{3})?\w+\}/.test(url)) {
    return () => url;
  }

  return (variables) =>
    normalizeQueryString(
      insertVariables(url, variables, defaultVariables, insertVariable),
    );
}

export { createRoute };
