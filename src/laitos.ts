import { style, styleBlue, styleGreen, styleGreen2 } from './css';
import { ConvertedCourse, Laitos } from './interfaces/Interfaces';
import { draw } from './utils/draw';
import { negate } from './utils/helpers';
import { map, sort } from './utils/listUtils';
import { average, laskePainotettuKeskiarvo } from './utils/numberUtils';
import { getLaitos } from './utils/stringUtils';

// TODO: Typings
export const piirräLaitosGraafit = data => {
  const dataset = sort(Object.values(data), 'op');

  draw({
    id: 'chart-laitos-graafit',
    type: 'bar',
    labels: map(dataset, 'laitos'),
    datasets: [
      {
        label: 'Kursseja',
        data: map(dataset, 'courseCount'),
        ...style,
      },
      {
        label: 'Nopat',
        data: map(dataset, 'op'),
        ...styleBlue,
      },
      {
        label: 'Keskiarvo',
        data: map(dataset, 'keskiarvo'),
        ...styleGreen,
      },
      {
        label: 'Painotettu keskiarvo',
        data: map(dataset, 'painotettuKeskiarvo'),
        ...styleGreen2,
      },
    ],
  });
};

type Juuu = Record<string, Laitos>;

export const grouppaaEriLaitostenKurssit = (courses: ConvertedCourse[]): Juuu =>
  courses.reduce((acc, kurssi) => {
    const { lyhenne, op, arvosana } = kurssi;
    const laitos = getLaitos(lyhenne);
    const edellisenKierroksenData = acc[laitos];
    const arvosanat = edellisenKierroksenData
      ? [...edellisenKierroksenData.arvosanat, arvosana].filter(negate(isNaN))
      : [arvosana].filter(negate(isNaN));
    const keskiarvo = Number(average(arvosanat).toFixed(2));
    const painotettuKeskiarvo = laskePainotettuKeskiarvo(
      edellisenKierroksenData ? edellisenKierroksenData.kurssit : [kurssi],
    );

    const dataJeejee = {
      op,
      arvosanat,
      keskiarvo,
      painotettuKeskiarvo,
      laitos,
      courseCount: 1,
      kurssit: [kurssi],
    } as Laitos;

    return {
      ...acc,
      [laitos]: edellisenKierroksenData
        ? {
          ...edellisenKierroksenData,
          ...dataJeejee,
          courseCount: edellisenKierroksenData.courseCount + 1,
          op: edellisenKierroksenData.op + op,
          kurssit: [...edellisenKierroksenData.kurssit, kurssi],
        }
        : dataJeejee,
    };
  }, {});
