import moment from 'moment';

import { Course } from '../interfaces/Interfaces';
import { takeUntil } from '../utils/listUtils';
import {
  kuukausiaAikavälillä,
  viikkojaAikavälillä,
} from '../utils/numberUtils';

type AikaFunktio = typeof viikkojaAikavälillä | typeof kuukausiaAikavälillä;
export type Groupattuna = Record<number, number>;
type TimeAgo = 'weeks' | 'months';

export const buildData = (list: number[], jep: Groupattuna) =>
  list
    .slice()
    .map((value: number) => jep[value - 1] || 0)
    .reverse()
    .reduce((initial: number[], arvo: number, i: number, list: number[]) => {
      const aikaisemmat = takeUntil(list, i);

      return [...initial, arvo || (i && Math.max(...aikaisemmat)) || 0];
    }, []);

export const makeLabels = (data: number[], timeAgo: TimeAgo) =>
  data.map((_, i) =>
    moment()
      .subtract(Math.abs(i - data.length - 1), timeAgo)
      .format('D.M.YYYY'),
  );

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
