import {
  style,
  style2,
  styleBlue,
  styleBlue2,
  styleGreen,
  styleGreen2,
} from './css';
import {
  ConvertedCourse,
  ConvertedCourseWithKeskiarvo,
} from './interfaces/Interfaces';
import { filterArvosana, negate } from './utils/helpers';
import {
  findOpintoByLyhenne,
  map,
  notEmpty,
  takeUntil,
} from './utils/listUtils';
import { average, laskePainotettuKeskiarvo } from './utils/numberUtils';
import { isTruthy } from './utils/validators';

// TODO: Typings
export const annaMulleKeskiarvotKursseista = (
  stuff: ConvertedCourse[],
): any[] =>
  stuff.filter(filterArvosana).map((item, i, list) => ({
    ...item,
    keskiarvo: average(
      takeUntil(map(list, 'arvosana'), i + 1).filter(negate(isNaN)),
    ).toFixed(2),
    painotettuKeskiarvo: laskePainotettuKeskiarvo(takeUntil(list, i + 1)),
  }));

// TODO: Typings
const annaMulleKeskiarvotTietyistäKursseista = ({ kurssit, stuff }) =>
  annaMulleKeskiarvotKursseista(
    stuff.filter(({ lyhenne }) => kurssit.includes(lyhenne)),
  );

// TODO: Typings
const hommaaMulleKeskiarvotTietyistäOpinnoistaThxbai = ({
  stuff,
  keskiarvot,
  kurssit,
}) => {
  if (!kurssit.length) {
    return [];
  }

  const opinnot = annaMulleKeskiarvotTietyistäKursseista({
    kurssit,
    stuff,
  });

  return keskiarvot.reduce((initial, item) => {
    const jeejee = findOpintoByLyhenne({ opinnot, lyhenne: item.lyhenne });

    if (jeejee) {
      return [...initial, { ...jeejee, fromOpinnot: true }];
    }

    const mitäs = initial.filter(({ fromOpinnot }) => fromOpinnot).reverse()[0];

    return [...initial, { ...mitäs, arvosana: 0 } || item];
  }, []);
};

// TODO: Typings
export const rakenteleDataSetitKeskiarvoChartille = ({
  arvosanallisetMerkinnät,
  keskiarvot,
  keskiarvotPerusopinnoista,
  keskiarvotAineopinnoista,
}) =>
  [
    notEmpty(keskiarvot) && {
      label: 'Keskiarvo',
      data: map(keskiarvot, 'keskiarvo'),
      ...style,
    },
    notEmpty(arvosanallisetMerkinnät) && {
      label: 'Painotettu keskiarvo',
      data: map(arvosanallisetMerkinnät, 'painotettuKeskiarvo'),
      ...style2,
    },
    notEmpty(keskiarvotPerusopinnoista) && {
      label: 'Perusopintojen keskiarvo',
      data: map(keskiarvotPerusopinnoista, 'keskiarvo'),
      ...styleBlue,
    },
    notEmpty(keskiarvotAineopinnoista) && {
      label: 'Aineopintojen keskiarvo',
      data: map(keskiarvotAineopinnoista, 'keskiarvo'),
      ...styleGreen,
    },
    notEmpty(keskiarvotPerusopinnoista) && {
      label: 'Perusopintojen painotettu keskiarvo',
      data: map(keskiarvotPerusopinnoista, 'painotettuKeskiarvo'),
      ...styleBlue2,
    },
    notEmpty(keskiarvotAineopinnoista) && {
      label: 'Aineopintojen painotettu keskiarvo',
      data: map(keskiarvotAineopinnoista, 'painotettuKeskiarvo'),
      ...styleGreen2,
    },
  ].filter(isTruthy);

// TODO: Typings
export const laskeKeskiarvot = ({
  stuff,
  keskiarvot,
  perusOpinnot,
  aineOpinnot,
}) => {
  const keskiarvotPerusopinnoista = hommaaMulleKeskiarvotTietyistäOpinnoistaThxbai(
    {
      stuff,
      keskiarvot,
      kurssit: perusOpinnot,
    },
  );

  const keskiarvotAineopinnoista = hommaaMulleKeskiarvotTietyistäOpinnoistaThxbai(
    {
      stuff,
      keskiarvot,
      kurssit: aineOpinnot,
    },
  );

  return { keskiarvotPerusopinnoista, keskiarvotAineopinnoista };
};
