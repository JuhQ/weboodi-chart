import { Paivays } from '../interfaces/Interfaces';

const notEmpty = (data: string) => data.length > 0;
const notEmptyList = <T>(data: T[]) => data.length > 0;
const min = (lista: number[]) => Math.min(...lista);
const max = (lista: number[]) => Math.max(...lista);
const map = <T>(
  list: T[],
  keys: keyof T | Array<keyof T>,
): Array<T[keyof T] | undefined> =>
  list.reduce<Array<T[keyof T]>>(
    (acc, item) => [
      ...acc,
      ...(Array.isArray(keys) ? keys : [keys]).map(key => item[key]),
    ],
    [],
  );

const contains = <T>(list: T[], key: T) => list.indexOf(key) > -1;

const mapInvoke = (list, method) => list.map(item => item[method](item));

// TODO: Remove any
const sort = (list: any, key: string) =>
  [...list].sort((a: any, b: any) => b[key] - a[key]);

const findPvm = <T>(list: Array<T & Paivays>, key: string) =>
  list.find(val => val.pvm === key);

export {
  notEmpty,
  notEmptyList,
  map,
  min,
  max,
  contains,
  mapInvoke,
  sort,
  findPvm,
};
