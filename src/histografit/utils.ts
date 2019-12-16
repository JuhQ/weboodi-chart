import moment from 'moment';

import { Course } from '../interfaces/Interfaces';
import {
  kuukausiaAikavälillä,
  viikkojaAikavälillä,
} from '../utils/numberUtils';

type AikaFunktio = typeof viikkojaAikavälillä | typeof kuukausiaAikavälillä;
export type Groupattuna = Record<number, number>;
type TimeAgo = 'weeks' | 'months';

const findSmallerFromList = (list: number[], i: number) =>
  list.filter((arvo, index) => index < i && arvo > 0).reverse()[0];

export const buildData = (list: number[], jep: Groupattuna) =>
  list
    .slice()
    .reverse()
    .map((value: number) => jep[value + 1] || 0)
    .map((value, i, array) => value || findSmallerFromList(array, i));

export const makeLabels = (
  data: number[],
  timeAgo: TimeAgo,
  format = 'D.M.YYYY',
) =>
  data
    .map((_, i) =>
      moment()
        .subtract(i, timeAgo)
        .format(format),
    )
    .reverse();

const nyt = new Date();
export const groupataanKurssitAjanKanssa = (
  fn: AikaFunktio,
  stuff: Course[],
): Groupattuna =>
  stuff.reduce((initial, { pvmDate, cumulativeOp }) => {
    const timeAgo = fn(pvmDate, nyt);
    return {
      ...initial,
      [timeAgo]: cumulativeOp,
    };
  }, {});
