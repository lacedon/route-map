import { normalizeQueryString } from '@/utils/normalize-query-string';
import {
  insertVariables,
  InsertVariable,
  Value,
} from '@/utils/insert-variable';

export type Route<Variables = void> = (variables: Partial<Variables>) => string;

type CreateURL<Variables> = (variables: Partial<Variables>) => string;

interface Options {
  insertVariable?: InsertVariable;
}

function createRoute<Variables extends Record<string, Value> | void = void>(
  url: string,
  defaultVariables?: Partial<Variables>,
  options?: Options,
): Route<Variables>;

function createRoute<Variables extends Record<string, Value> | void = void>(
  createURL: CreateURL<Variables>,
  defaultVariables?: Partial<Variables>,
  options?: Options,
): Route<Variables>;

function createRoute<Variables extends Record<string, Value> | void = void>(
  url: string | CreateURL<Variables>,
  defaultVariables?: Partial<Variables>,
  { insertVariable }: Options = {},
): Route<Variables> {
  if (typeof url === 'function')
    return (variables) =>
      normalizeQueryString(
        insertVariables(
          url(variables),
          variables,
          defaultVariables,
          insertVariable,
        ),
      );

  if (typeof url !== 'string' || !/\{(?:\.{3})?\w+\}/.test(url))
    return () => url;

  return (variables) =>
    normalizeQueryString(
      insertVariables(url, variables, defaultVariables, insertVariable),
    );
}

export { createRoute };
