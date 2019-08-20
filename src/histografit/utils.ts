import moment from 'moment';

import { Course } from '../interfaces/Interfaces';
import { takeUntil } from '../utils/listUtils';
import {
  kuukausiaAikavälillä,
  viikkojaAikavälillä,
} from '../utils/numberUtils';

export type Groupattuna = Record<number, number>;

export const buildData = (list: number[], jep: Groupattuna) =>
  list
    .map((value: number) => jep[value - 1] || 0)
    .reverse()
    .reduce((initial: number[], arvo: number, i: number, list: number[]) => {
      const aikaisemmat = takeUntil(list, i);

      return [...initial, arvo || (i && Math.max(...aikaisemmat)) || 0];
    }, []);

type TimeAgo = 'weeks' | 'months';

export const makeLabels = (data: number[], timeAgo: TimeAgo) =>
  data.map((_, i) => {
    const viikkoaSitten = Math.abs(i - data.length - 1);

    return moment()
      .subtract(viikkoaSitten, timeAgo)
      .format('D.M.YYYY');
  });

type AikaFunktio = typeof viikkojaAikavälillä | typeof kuukausiaAikavälillä;

export const groupataanKurssitAjanKanssa = (
  fn: AikaFunktio,
  stuff: Course[],
): Groupattuna =>
  stuff.reduce((initial, item) => {
    const weeksAgo = fn(item.pvmDate, new Date());
    return {
      ...initial,
      [weeksAgo]: item.cumulativeOp,
    };
  }, {});
