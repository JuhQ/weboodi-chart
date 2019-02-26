const isTruthy = v => v;

const isString = (val: unknown): val is string => typeof val === 'string';

const isArray = <T>(val: unknown): val is T[] => Array.isArray(val);

const isFloat = (n: string | number) => Number(n) === n && n % 1 !== 0;

// TODO: add tests
const isInBetween = ({
  value,
  values: [start, end],
}: {
  value: Date;
  values: [Date, Date];
}) => value.getTime() >= start.getTime() && value.getTime() <= end.getTime();

export { isTruthy, isArray, isString, isFloat, isInBetween };
