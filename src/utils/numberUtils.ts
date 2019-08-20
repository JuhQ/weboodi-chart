import moment from 'moment';

import { ConvertedCourse } from '../interfaces/Interfaces';
import { filterArvosana } from './helpers';
import { map } from './listUtils';

export const add = (a: number, b: number): number => a + b;

export const sum = (list: number[]): number => list.reduce(add, 0);

export const average = (list: number[]): number => sum(list) / list.length;

const wadap = list =>
  list.reduce((acc, { op, arvosana }) => acc + arvosana * op, 0) /
  sum(map(list, 'op') as number[]);

export const laskePainotettuKeskiarvo = (data: ConvertedCourse[]): number => {
  const arvosanallisetOpintosuoritukset = data.filter(filterArvosana);

  return arvosanallisetOpintosuoritukset.length
    ? Number(wadap(arvosanallisetOpintosuoritukset).toFixed(2))
    : NaN;
};

export const viikkojaAikavälillä = (eka: Date, toka: Date): number =>
  Math.ceil(moment.duration(moment(toka).diff(moment(eka))).asWeeks());
