import {
  style,
  style2,
  styleBlue,
  styleBlue2,
  styleGreen,
  styleGreen2,
  styleOrange,
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

export const annaMulleKeskiarvotKursseista = (
  stuff: ConvertedCourse[],
): ConvertedCourseWithKeskiarvo[] =>
  stuff.filter(filterArvosana).map((item, i, list) => ({
    ...item,
    keskiarvo: Number(
      average(
        takeUntil(map(list, 'arvosana'), i + 1).filter(negate(isNaN)),
      ).toFixed(2),
    ),
    painotettuKeskiarvo: laskePainotettuKeskiarvo(takeUntil(list, i + 1)),
  }));

const annaMulleKeskiarvotTietyistäKursseista = ({
  kurssit,
  stuff,
}: {
  kurssit: string[];
  stuff: ConvertedCourse[];
}) =>
  annaMulleKeskiarvotKursseista(
    stuff.filter(({ lyhenne }) => kurssit.includes(lyhenne)),
  );

interface Entiedä extends ConvertedCourse {
  fromOpinnot: boolean;
}

interface Jup {
  stuff: ConvertedCourse[];
  keskiarvot: ConvertedCourse[];
  kurssit: string[];
}

const hommaaMulleKeskiarvotTietyistäOpinnoistaThxbai = ({
  stuff,
  keskiarvot,
  kurssit,
}: Jup) => {
  if (!kurssit || !kurssit.length) {
    return [];
  }

  const opinnot = annaMulleKeskiarvotTietyistäKursseista({
    kurssit,
    stuff,
  });

  return keskiarvot.reduce(
    (initial, item) => {
      const jeejee = findOpintoByLyhenne({ opinnot, lyhenne: item.lyhenne });

      if (jeejee) {
        return [...initial, { ...jeejee, fromOpinnot: true }];
      }

      const mitäs = initial
        .filter(({ fromOpinnot }) => fromOpinnot)
        .reverse()[0];

      return [...initial, { ...mitäs, arvosana: 0 } || item];
    },
    [] as Entiedä[],
  );
};

// TODO: Typings
export const rakenteleDataSetitKeskiarvoChartille = ({
  arvosanallisetMerkinnät,
  keskiarvot,
  keskiarvotPerusopinnoista,
  keskiarvotAineopinnoista,
  keskiarvotPääaineesta,
  keskiarvotPerusJaAineopinnoista,
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
    notEmpty(keskiarvotPerusJaAineopinnoista) && {
      label: 'Aine+perusopinnot painotettu keskiarvo',
      data: map(keskiarvotPerusJaAineopinnoista, 'painotettuKeskiarvo'),
      ...styleGreen2,
    },
    notEmpty(keskiarvotPääaineesta) && {
      label: 'Pääaineen painotettu keskiarvo',
      data: map(keskiarvotPääaineesta, 'painotettuKeskiarvo'),
      ...styleOrange,
    },
  ].filter(isTruthy);

// TODO: Typings
export const laskeKeskiarvot = ({
  stuff,
  keskiarvot,
  perusOpinnot,
  aineOpinnot,
  pääaineopinnot,
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

  const keskiarvotPerusJaAineopinnoista = hommaaMulleKeskiarvotTietyistäOpinnoistaThxbai(
    {
      stuff,
      keskiarvot,
      kurssit: [...aineOpinnot, ...perusOpinnot],
    },
  );

  const keskiarvotPääaineesta = hommaaMulleKeskiarvotTietyistäOpinnoistaThxbai({
    stuff,
    keskiarvot,
    kurssit: pääaineopinnot,
  });

  return {
    keskiarvotPerusopinnoista,
    keskiarvotAineopinnoista,
    keskiarvotPerusJaAineopinnoista,
    keskiarvotPääaineesta,
  };
};
