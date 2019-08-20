import { ConvertedCourse } from '../interfaces/Interfaces';
import { map } from './listUtils';

const add = (a: number, b: number): number => a + b;

const sum = (list: number[]): number => list.reduce(add, 0);

const average = (list: number[]): number => sum(list) / list.length;

const wadap = list =>
  list.reduce((acc, { op, arvosana }) => acc + arvosana * op, 0) /
  sum(map(list, 'op') as number[]);

const laskePainotettuKeskiarvo = (data: ConvertedCourse[]): number => {
  const arvosanallisetOpintosuoritukset = data.filter(
    ({ arvosana }) => arvosana !== 'hyv' && !isNaN(arvosana),
  );

  return arvosanallisetOpintosuoritukset.length
    ? Number(wadap(arvosanallisetOpintosuoritukset).toFixed(2))
    : NaN;
};

export { add, average, sum, laskePainotettuKeskiarvo };
