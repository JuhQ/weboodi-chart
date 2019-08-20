import { ConvertedCourse, Course, Paivays } from '../interfaces/Interfaces';
import { negate } from './helpers';
import { putsaaTeksti, searchForCourseFromList } from './stringUtils';
import { isArray } from './validators';

const notEmpty = <T>(data: T[] | string) => data.length > 0;
const min = (list: number[]) => Math.min(...list);
const max = (list: number[]) => Math.max(...list);
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

const mapInvoke = (list: any[], method: string) =>
  list.map(item => item[method](item));

const sort = (list: any[], key: string) =>
  [...list].sort((a: any, b: any) => b[key] - a[key]);

const findPvm = <T>(
  list: ConvertedCourse[],
  key: string,
): ConvertedCourse | undefined => list.find(val => val.pvm === key);

const findFromKurssiTietokanta = ({ db, lyhenne }) =>
  Object.keys(db).reduce((acc, key) => {
    const courseFound = searchForCourseFromList({ acc, db, key, lyhenne });

    return (
      acc ||
      (courseFound || isArray(db[key])
        ? courseFound
          ? courseFound.name
          : acc
        : findFromKurssiTietokanta({ db: db[key], lyhenne }))
    );
  }, '');

const createCoursesArray = target =>
  target.value
    .split(',')
    .map(putsaaTeksti)
    .filter(notEmpty);

const sorttaaStuffLukukausienMukaan = (a: Course, b: Course) =>
  a.pvmDate.getTime() - b.pvmDate.getTime();

// TODO: Typings
const takeUntil = (list, n: number) => list.slice(0, n);

// TODO: Typings
const laskeStuffistaHalututJutut = ({ stuff, key }) =>
  stuff.reduce(
    (acc, item: ConvertedCourse) => ({
      ...acc,
      [item[key]]: (acc[item[key]] || 0) + 1,
    }),
    {},
  );

// TODO: Typings
const partition = (list, predicate) => [
  list.filter(negate(predicate)),
  list.filter(predicate),
];

// TODO: Typings
const findOpintoByLyhenne = ({ opinnot, lyhenne }) =>
  opinnot.find(item => lyhenne === item.lyhenne);

// TODO: Typings
const atleastThreeItemsInList = list => list && list.length > 3;

// TODO add test
export const times = (n: number): number[] =>
  Array(n)
    .fill(1)
    .map((_, i) => i);

export {
  notEmpty,
  partition,
  findOpintoByLyhenne,
  map,
  min,
  takeUntil,
  max,
  atleastThreeItemsInList,
  laskeStuffistaHalututJutut,
  contains,
  mapInvoke,
  sort,
  findPvm,
  sorttaaStuffLukukausienMukaan,
  findFromKurssiTietokanta,
  createCoursesArray,
};
