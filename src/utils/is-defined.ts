export function isDefined<Value>(
  value: undefined | void | null | Value
): value is Value {
  return typeof value !== "undefined" && value !== null;
}
