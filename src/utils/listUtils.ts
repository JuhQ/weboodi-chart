const notEmpty = (data: string) => data.length > 0;
const notEmptyList = <T>(data: T[]) => data.length > 0;
const map = <T>(
  list: T[],
  keys: keyof T | Array<keyof T>,
): Array<T[keyof T] | undefined> =>
  list.reduce<Array<T[keyof T]>>((acc, item) => {
    return [
      ...acc,
      ...(Array.isArray(keys) ? keys : [keys]).map((key) => item[key]),
    ];
  }, []);

export { notEmpty, notEmptyList, map };
