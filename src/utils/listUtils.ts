import { Course, Paivays } from '../interfaces/Interfaces';
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

const mapInvoke = (list, method) => list.map(item => item[method](item));

// TODO: Remove any
const sort = (list: any, key: string) =>
  [...list].sort((a: any, b: any) => b[key] - a[key]);

const findPvm = <T>(list: Array<T & Paivays>, key: string) =>
  list.find(val => val.pvm === key);

// TODO: add test
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

// TODO: add test
const createCoursesArray = target =>
  target.value
    .split(',')
    .map(putsaaTeksti)
    .filter(notEmpty);

// TODO: add test
const sorttaaStuffLukukausienMukaan = (a: Course, b: Course) =>
  a.pvmDate.getTime() - b.pvmDate.getTime();

// TODO: Typings
// TODO: add test
const takeUntil = (list, n) => list.slice(0, n);

// TODO: Typings
// TODO: add test
const laskeStuffistaHalututJutut = ({ stuff, key }) =>
  stuff.reduce(
    (acc, item) => ({
      ...acc,
      [item[key]]: (acc[item[key]] || 0) + 1,
    }),
    {},
  );

// TODO: Typings
// TODO: add test
const partition = (list, predicate) => [
  list.filter(negate(predicate)),
  list.filter(predicate),
];

// TODO: Typings
// TODO: add test
const findOpintoByLyhenne = ({ opinnot, lyhenne }) =>
  opinnot.find(item => lyhenne === item.lyhenne);

// TODO: Typings
// TODO: add test
const atleastThreeItemsInList = list => list.length > 3;

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
