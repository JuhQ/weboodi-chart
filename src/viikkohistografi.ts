import moment from 'moment';

import { styleBlue } from './css';
import { Course } from './interfaces/Interfaces';
import { draw } from './utils/draw';
import { takeUntil, times } from './utils/listUtils';
import { viikkojaAikavälillä } from './utils/numberUtils';

type Groupattuna = Record<number, number>;

const groupataanKurssitViikkoihin = (stuff: Course[]): Groupattuna =>
  stuff.reduce((initial, item) => {
    const weeksAgo = viikkojaAikavälillä(item.pvmDate, new Date());
    return {
      ...initial,
      [weeksAgo]: item.cumulativeOp,
    };
  }, {});

const buildData = (viikkolista: number[], jep: Groupattuna) =>
  viikkolista
    .map((viikko: number) => jep[viikko - 1] || 0)
    .reverse()
    .reduce((initial: number[], arvo: number, i: number, list: number[]) => {
      const aikaisemmat = takeUntil(list, i);

      return [...initial, arvo || (i && Math.max(...aikaisemmat)) || 0];
    }, []);

const viikkohistografi = (stuff: Course[]) => {
  const ekaSuoritusViikkojaSitten = viikkojaAikavälillä(
    stuff[0].pvmDate,
    new Date(),
  );

  const viikkolista = times(ekaSuoritusViikkojaSitten);
  const jep = groupataanKurssitViikkoihin(stuff);

  const data = buildData(viikkolista, jep);

  const labels = data.map((_, i) => {
    const viikkoaSitten = Math.abs(i - data.length - 1);

    return moment()
      .subtract(viikkoaSitten, 'weeks')
      .format('D.M.YYYY');
  });

  draw({
    id: 'viikko-histografi',
    type: 'line',
    labels,
    datasets: [
      {
        label: 'noppia',
        data,
        ...styleBlue,
      },
    ],
  });
};

export default viikkohistografi;
