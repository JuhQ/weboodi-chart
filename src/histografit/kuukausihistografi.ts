import { styleBlue } from '../css';
import { Course } from '../interfaces/Interfaces';
import { draw } from '../utils/draw';
import { times } from '../utils/listUtils';
import { kuukausiaAikavälillä } from '../utils/numberUtils';
import { buildData, groupataanKurssitAjanKanssa, makeLabels } from './utils';

const kuukausihistografi = (stuff: Course[]) => {
  const ekaSuoritusKuukausiaSitten = kuukausiaAikavälillä(
    stuff[0].pvmDate,
    new Date(),
  );

  const kuukausilista = times(ekaSuoritusKuukausiaSitten);
  const jep = groupataanKurssitAjanKanssa(kuukausiaAikavälillä, stuff);
  const data = buildData(kuukausilista, jep);

  draw({
    id: 'kuukausi-histografi',
    type: 'line',
    labels: makeLabels(data, 'months'),
    datasets: [
      {
        label: 'noppia',
        data,
        ...styleBlue,
      },
    ],
  });
};

export default kuukausihistografi;
