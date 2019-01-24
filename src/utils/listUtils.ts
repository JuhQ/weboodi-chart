const notEmpty = (data: string) => data.length > 0;
const notEmptyList = <T>(data: T[]) => data.length > 0;
const max = (lista: number[]) => Math.max(...lista);
const map = <T>(
  list: T[],
  keys: keyof T | Array<keyof T>,
): Array<T[keyof T] | undefined> =>
  list.reduce<Array<T[keyof T]>>(
    (acc, item) => [
      ...acc,
      ...(Array.isArray(keys) ? keys : [keys]).map((key) => item[key]),
    ],
    [],
  );

export { notEmpty, notEmptyList, map, max };
