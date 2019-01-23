const isTruthy = (v) => v;

const isString = (val: unknown): val is string => typeof val === "string";

const isArray = <T>(val: unknown): val is T[] => Array.isArray(val);

export { isTruthy, isArray, isString };
