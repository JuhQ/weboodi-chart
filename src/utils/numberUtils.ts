import { map } from './listUtils';

const add = (a: number, b: number): number => a + b;

const sum = (list: number[]): number => list.reduce(add, 0);

const average = (list: number[]): number => sum(list) / list.length;

// TODO: Typings
const laskePainotettuKeskiarvo = data => {
  const arvosanallisetOpintosuoritukset = data.filter(
    ({ arvosana }) => !isNaN(arvosana),
  );

  return arvosanallisetOpintosuoritukset.length
    ? (
        arvosanallisetOpintosuoritukset.reduce(
          (acc, { op, arvosana }) => acc + arvosana * op,
          0,
        ) / sum(map(arvosanallisetOpintosuoritukset, 'op'))
      ).toFixed(2)
    : NaN;
};

export { add, average, sum, laskePainotettuKeskiarvo };
