import { styleBlue } from '../css';
import { Course } from '../interfaces/Interfaces';
import { draw } from '../utils/draw';
import { times } from '../utils/listUtils';
import { viikkojaAikavälillä } from '../utils/numberUtils';
import { buildData, groupataanKurssitAjanKanssa, makeLabels } from './utils';

const viikkohistografi = (stuff: Course[]) => {
  const ekaSuoritusViikkojaSitten = viikkojaAikavälillä(
    stuff[0].pvmDate,
    new Date(),
  );

  const viikkolista = times(ekaSuoritusViikkojaSitten);
  const jep = groupataanKurssitAjanKanssa(viikkojaAikavälillä, stuff);

  const data = buildData(viikkolista, jep);

  draw({
    id: 'viikko-histografi',
    type: 'line',
    labels: makeLabels(data, 'weeks'),
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
