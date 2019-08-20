import {
  style,
  style2,
  styleBlue,
  styleBlue2,
  styleGreen,
  styleGreen2,
} from './css';
import { kurssitietokanta } from './data/courses';
import {
  ConvertedCourse,
  Course,
  CourseArrToObjParams,
} from './interfaces/Interfaces';
import {
  createDom,
  drawLuennoitsijat,
  hommaaMeilleListaAsijoistaDommista,
  piirraRandomStatistiikkaa,
  pitäisköDomRakentaa,
  setHtmlContent,
} from './utils/dom';
import { draw, drawPie } from './utils/draw';
import { negate } from './utils/helpers';
import { kuunteleAsijoita } from './utils/listeners';
import {
  atleastThreeItemsInList,
  contains,
  findFromKurssiTietokanta,
  findOpintoByLyhenne,
  findPvm,
  laskeStuffistaHalututJutut,
  map,
  mapInvoke,
  max,
  notEmpty,
  partition,
  sort,
  sorttaaStuffLukukausienMukaan,
  takeUntil,
} from './utils/listUtils';
import { getListFromLocalStorage, getLocalStorage } from './utils/localStorage';
import {
  add,
  average,
  laskePainotettuKeskiarvo,
  sum,
} from './utils/numberUtils';
import {
  getLaitos,
  luoKivaAvainReducelle,
  nameIncludesAvoinYo,
  poistaAvoinKurssiNimestä,
  poistaKaksoispisteet,
  poistaLiianLyhyetNimet,
  poistaPilkut,
  poistaSulut,
  putsaaTeksti,
  toLowerCase,
} from './utils/stringUtils';
import { piirraRumaTagipilvi } from './utils/tagcloud';
import { isInBetween, isTruthy } from './utils/validators';

const getDuplikaattiKurssit = () =>
  getListFromLocalStorage('duplikaattiKurssit');
const getPerusOpinnot = () => getListFromLocalStorage('perusOpinnot');
const getAineOpinnot = () => getListFromLocalStorage('aineOpinnot');
const getPääaineFromLokaali = () =>
  getLocalStorage<string | null>('pääaine', 'null');
const getSivuaineetFromLokaali = () => getListFromLocalStorage('sivuaineet');

// TODO: Proper param names and typing
const setDailyCumulativeNoppas = ({ pvm, op }) => jee => {
  const today =
    jee.pvm === pvm
      ? {
        cumulativeOp: op + jee.cumulativeOp,
        op: op + jee.op,
      }
      : null;

  return {
    ...jee, // 💩👌
    ...today,
  };
};

// TODO: Param typings
const groupThemCourses = (stuff: ConvertedCourse[]) =>
  stuff
    .reduce(
      (initial, item) =>
        findPvm(initial, item.pvm)
          ? initial.map(setDailyCumulativeNoppas(item))
          : [...initial, item],
      [] as ConvertedCourse[],
    )
    .map(item => ({
      ...item,
      op: item.op <= 10 ? item.op * 10 : item.op,
      realOp: item.op,
    }));

const hanskaaAvatutPaketit = (row: CourseArrToObjParams): boolean =>
  !row[0].includes('   ');

const muutaArrayKivaksiObjektiksi = ([
  lyhenne,
  kurssi,
  op,
  arvosana,
  pvm = '01.01.1970',
  luennoitsija,
]: CourseArrToObjParams): ConvertedCourse => ({
  pvm,
  kurssi,
  lyhenne,
  luennoitsija,
  op: Number(poistaSulut(op)), // paketoitu kandi tms
  arvosana: Number(arvosana),
  pvmDate: rakenteleDateObjekti(getPvmArray(pvm)),
});

// TODO: Fix typings
const lasketaanpaLopuksiKumulatiivisetNopat = (initial, item, i, list) => [
  ...initial,
  {
    ...item,
    cumulativeOp: item.op + (i && initial[i - 1].cumulativeOp),
    keskiarvo: average(
      takeUntil(map(list, 'arvosana'), i + 1).filter(negate(isNaN)),
    ).toFixed(2),
    painotettuKeskiarvo: laskePainotettuKeskiarvo(takeUntil(list, i + 1)),
  },
];

// TODO: Typings
const makeSomeStuff = (duplikaattiKurssit: string[]) =>
  hommaaMeilleListaAsijoistaDommista()
    .map(item => [...Array.from(item.querySelectorAll('td'))])
    .filter(notEmpty)
    .map(item => map(item, 'textContent').map(putsaaTeksti)) // Return type is string[]
    .filter(([lyhenne]) => !duplikaattiKurssit.includes(lyhenne))
    .reverse()
    // @ts-ignore
    .filter(hanskaaAvatutPaketit)
    .filter(atleastThreeItemsInList)
    // @ts-ignore
    .map(muutaArrayKivaksiObjektiksi)
    .filter(({ op }) => !isNaN(op))
    .sort((a, b) => a.pvmDate.getTime() - b.pvmDate.getTime())
    .reduce(lasketaanpaLopuksiKumulatiivisetNopat, []);

// TODO: Typings
const annaMulleKeskiarvotKursseista = (stuff: ConvertedCourse[]) =>
  stuff
    .filter(item => !isNaN(item.arvosana))
    .map((item, i, list) => ({
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
const rakennaListaLuennoitsijoista = (initial, item) => [
  ...initial,
  ...item.luennoitsija
    .split(',')
    .map(putsaaTeksti)
    .filter(notEmpty)
    .map((luennoitsija: string) => ({ ...item, luennoitsija })),
];

// TODO: Typings
const haluaisinTietääLuennoitsijoista = (stuff: ConvertedCourse[]) =>
  stuff
    .reduce(rakennaListaLuennoitsijoista, [])
    .map(item => {
      const luennot = stuff.filter(
        ({ luennoitsija }) => luennoitsija === item.luennoitsija,
      );

      const arvosanat = map(
        luennot.filter(item => !isNaN(item.arvosana)),
        'arvosana',
      ) as number[];

      const keskiarvo = average(arvosanat);

      return {
        ...item,
        kurssimaara: luennot.length,
        luennot: {
          arvosanat,
          keskiarvo: keskiarvo ? keskiarvo.toFixed(2) : 'hyv',
          op: map(luennot, 'op'),
          totalOp: sum(map(luennot, 'op') as number[]),
        },
      };
    })
    .reduce(
      (initial, item) =>
        initial.find(({ luennoitsija }) => luennoitsija === item.luennoitsija)
          ? initial
          : [...initial, item],
      [],
    );

// TODO: Typings
const haluanRakentaaSanapilvenJa2008SoittiJaHalusiSanapilvenTakaisin = (
  stuff: ConvertedCourse[],
) =>
  (map(stuff, 'kurssi') as string[])
    .map(poistaAvoinKurssiNimestä)
    .map(poistaSulut)
    // @ts-ignore
    .reduce((list, kurssi) => [...list, ...kurssi.split(' ')], [])
    .filter(poistaLiianLyhyetNimet)
    .map(poistaPilkut)
    .map(poistaKaksoispisteet)
    .reduce(
      (list, kurssi) => ({
        ...list,
        [kurssi]: (list[kurssi] || 0) + 1,
      }),
      {},
    );

// TODO: Typings
const courseNamesMatch = kurssi => row => row.kurssi === kurssi;

// TODO: Typings
const removeDuplicateCourses = coursesDone => (acc, item) =>
  acc.find(courseNamesMatch(item.kurssi)) ||
  coursesDone.find(courseNamesMatch(item.kurssi))
    ? acc
    : [...acc, item];

// TODO: Typings
const removeAvoinFromKurssiNimi = item => ({
  ...item,
  kurssi: poistaAvoinKurssiNimestä(item.kurssi),
});

// TODO: Typings
const drawOpintoDonitsi = ({ id, stuff, data }) => {
  const [coursesDone, coursesNotDone] = partition(
    data,
    lyhenne => !stuff.find(course => lyhenne === course.lyhenne),
  );

  const opintoData = [
    ...coursesDone.map(lyhenne => ({ lyhenne, done: true })),
    ...coursesNotDone.map(lyhenne => ({ lyhenne, done: false })),
  ]
    .map(({ lyhenne, done }) => ({
      kurssi:
        findFromKurssiTietokanta({ db: kurssitietokanta, lyhenne }) || lyhenne,
      done,
    }))
    .reduce(removeDuplicateCourses(coursesDone), [])
    .map(removeAvoinFromKurssiNimi);

  const greatSuccess =
    coursesDone.length >= opintoData.length ? 'All done, nice!' : '';

  setHtmlContent({
    id: `${id}-progress`,
    content: `${coursesDone.length}/${opintoData.length} ${greatSuccess}`,
  });

  const percentage = ((1 / opintoData.length) * 100).toFixed(2);

  drawPie({
    id,
    labels: map(opintoData, 'kurssi'),
    datasets: opintoData.map(() => percentage),
    backgroundColor: opintoData.map(({ done }) =>
      done ? 'lightgreen' : 'lightgray',
    ),
  });
};

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
const rakenteleDataSetitKeskiarvoChartille = ({
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
const rakenteleDataSetitNoppaChartille = grouped =>
  [
    {
      label: 'Päivän nopat',
      data: map(grouped, 'op'),
    },
    {
      label: 'Nopat',
      data: map(grouped, 'cumulativeOp'),
      ...style,
      type: 'line',
    },
  ].filter(isTruthy);

// TODO: Typings
const drawGraphs = ({
  stuff,
  keskiarvot,
  keskiarvotPerusopinnoista,
  keskiarvotAineopinnoista,
}) => {
  const grouped = groupThemCourses(stuff);
  const arvosanallisetMerkinnät = stuff.filter(({ arvosana }) => arvosana);

  notEmpty(grouped) &&
    draw({
      id: 'chart-nopat',
      customTooltip: true,
      type: 'bar',
      labels: map(grouped, 'pvm'),
      datasets: rakenteleDataSetitNoppaChartille(grouped),
    });

  notEmpty(keskiarvot) &&
    draw({
      id: 'chart-keskiarvo',
      labels: map(keskiarvot, 'pvm'),
      type: 'line',
      datasets: rakenteleDataSetitKeskiarvoChartille({
        arvosanallisetMerkinnät,
        keskiarvot,
        keskiarvotPerusopinnoista,
        keskiarvotAineopinnoista,
      }),
    });
};

// Returns the semester's precise starting and ending dates.
// TODO: Replace with Moment.js
const getLukuvuosi = (vuosi): [Date, Date] => [
  new Date(vuosi, 7, 1),
  new Date(vuosi + 1, 6, 31, 23, 59, 59),
];

const rakenteleDateObjekti = ([paiva, kuukausi, vuosi]: [
  number,
  number,
  number
]) => new Date(vuosi, kuukausi - 1, paiva);

const getPvmArray = (pvm: string) => {
  const splitted = pvm.split('.');
  if (splitted.length === 3) {
    return splitted.map(Number) as [number, number, number];
  }
  // Failsafe
  throw new Error(`getPvmArray(): Parsing date failed: ${JSON.stringify(pvm)}`);
};

const luoLukuvuodelleKivaAvain = ({
  vuosi,
  pvmIsCurrentSemester,
  pvmIsNextSemester,
}: {
  vuosi: number;
  pvmIsCurrentSemester: boolean;
  pvmIsNextSemester: boolean;
}) => {
  if (pvmIsCurrentSemester) {
    return vuosi;
  }

  if (pvmIsNextSemester) {
    // If it's not between the current semester, it must be the next one
    return vuosi + 1;
  }

  return vuosi - 1;
};

const laskeLukukausienNopat = (
  prev,
  { pvmDate, op }: { pvmDate: Date; op: number },
) => {
  const vuosi = pvmDate.getFullYear();

  const pvmIsCurrentSemester = isInBetween({
    value: pvmDate,
    values: getLukuvuosi(vuosi),
  });

  const pvmIsNextSemester = isInBetween({
    value: pvmDate,
    values: getLukuvuosi(vuosi + 1),
  });

  const vuosiJuttu = luoLukuvuodelleKivaAvain({
    vuosi,
    pvmIsCurrentSemester,
    pvmIsNextSemester,
  });

  return { ...prev, [vuosiJuttu]: op + (prev[vuosiJuttu] || 0) };
};

interface GroupedStuff {
  pvmDate: Date;
  op: number;
}

const laskeKuukausienNopat = (
  prev: GroupedStuff,
  { pvmDate, op }: GroupedStuff,
) => {
  const avainOnneen = luoKivaAvainReducelle(pvmDate);
  return { ...prev, [avainOnneen]: op + (prev[avainOnneen] || 0) };
};

// TODO: Typings
const laskeKumulatiivisetKuukausienNopat = (
  prev,
  { pvmDate, cumulativeOp },
) => ({ ...prev, [luoKivaAvainReducelle(pvmDate)]: cumulativeOp });

const ryhmitteleStuffKivasti = ({ fn, stuff }: { fn: any; stuff: Course[] }) =>
  stuff.sort(sorttaaStuffLukukausienMukaan).reduce(fn, {});

// TODO: Typings
const hemmettiSentäänTeeDataSetti = ({ label, data, secondDataSet }) =>
  [
    {
      label,
      data,
      ...styleBlue,
    },
    secondDataSet && { ...secondDataSet, type: 'line', ...styleGreen },
  ].filter(isTruthy);

const piirräPerusGraafiNopille = ({
  id,
  label,
  labels,
  data,
  secondDataSet,
  type = secondDataSet ? 'bar' : 'line',
}: {
  id: string;
  label: string;
  labels: string[];
  data: number[];
  secondDataSet: {
    label: string;
    data: number[];
  };
  type?: string;
}) =>
  draw({
    id,
    labels,
    type,
    datasets: hemmettiSentäänTeeDataSetti({ label, data, secondDataSet }),
  });

const piirteleVuosiJuttujaJookosKookosHaliPus = (stuff: Course[]) => {
  const lukukausiGroups = ryhmitteleStuffKivasti({
    stuff,
    fn: laskeLukukausienNopat,
  });
  const lukukausiKeys = Object.keys(lukukausiGroups);
  const lukukausiData: number[] = Object.values(lukukausiGroups);
  const ekaLukukausi = parseInt(lukukausiKeys[0], 10);
  const vainYksiLukukausiSuoritettu = lukukausiKeys.length === 1;
  const labels = vainYksiLukukausiSuoritettu
    ? [
      `${ekaLukukausi - 1}-${ekaLukukausi}`,
      `${ekaLukukausi}-${ekaLukukausi + 1}`,
      `${ekaLukukausi + 1}-${ekaLukukausi + 2}`,
    ]
    : lukukausiKeys.map(i => `${i}-${parseInt(i, 10) + 1}`);

  // if only one year to show, pad data with zeros
  const data = vainYksiLukukausiSuoritettu
    ? [0, lukukausiData[0], 0]
    : lukukausiData;

  piirräPerusGraafiNopille({
    labels,
    data,
    id: 'chart-nopat-vuosi',
    label: 'Lukuvuoden nopat',
    secondDataSet: {
      label: 'Haalarimerkki here we come',
      data: data.map(() => 55),
    },
    type: 'line',
  });
};

// TODO: Typings
const piirteleKuukausittaisetJututJookosKookosHaliPusJaAdios = ({
  kuukausiGroups,
  kumulatiivisetKuukaudetGroups,
}) => {
  piirräPerusGraafiNopille({
    id: 'chart-nopat-kuukaudet',
    label: 'Kuukauden nopat',
    labels: Object.keys(kuukausiGroups),
    data: Object.values(kuukausiGroups),
    secondDataSet: {
      label: 'Nopat',
      data: Object.values(kumulatiivisetKuukaudetGroups),
    },
  });
};

// TODO: Typings
const piirräDonitsit = ({ stuff, aineOpinnot, perusOpinnot }) => {
  notEmpty(aineOpinnot) &&
    drawOpintoDonitsi({ id: 'aineopinnot', stuff, data: aineOpinnot });

  notEmpty(perusOpinnot) &&
    drawOpintoDonitsi({ id: 'perusopinnot', stuff, data: perusOpinnot });
};

// TODO: Typings
const sorttaaLuennoitsijatKeskiarvonMukaan = (a, b) =>
  b.luennot.keskiarvo - a.luennot.keskiarvo || b.kurssimaara - a.kurssimaara;

// TODO: Typings
const piirräLuennoitsijaListat = luennoitsijat => {
  const luennoitsijatElement = document.querySelector('#luennoitsijat');
  if (luennoitsijatElement === null) {
    throw new Error('piirräLuennoitsijaListat(): Element is null');
  }
  luennoitsijatElement.innerHTML = '';

  drawLuennoitsijat({
    // @ts-ignore
    luennoitsijatElement,
    title: 'Luennoitsijoiden top lista by kurssimaara',
    lista: sort(luennoitsijat, 'kurssimaara'),
  });

  drawLuennoitsijat({
    // @ts-ignore
    luennoitsijatElement,
    title: 'Luennoitsijoiden top lista by keskiarvo',
    lista: [
      ...luennoitsijat
        .filter(({ luennot }) => luennot.keskiarvo !== 'hyv')
        .sort(sorttaaLuennoitsijatKeskiarvonMukaan),
      ...luennoitsijat.filter(({ luennot }) => luennot.keskiarvo === 'hyv'),
    ],
  });

  drawLuennoitsijat({
    // @ts-ignore
    luennoitsijatElement,
    title: 'Luennoitsijoiden top lista by nopat',
    lista: luennoitsijat.sort((a, b) => b.luennot.totalOp - a.luennot.totalOp),
  });
};

const hommaaMatskutLocalStoragesta = () => ({
  duplikaattiKurssit: getDuplikaattiKurssit(),
  perusOpinnot: getPerusOpinnot(),
  aineOpinnot: getAineOpinnot(),
  pääaine: getPääaineFromLokaali(),
  sivuaineet: getSivuaineetFromLokaali(),
});

// TODO: Typings
const laskeKeskiarvot = ({ stuff, keskiarvot, perusOpinnot, aineOpinnot }) => {
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

// TODO: Typings
const piirräGraafiNoppienTaiArvosanojenMäärille = ({ id, label, data }) =>
  draw({
    id,
    type: 'bar',
    labels: Object.keys(data).map(
      key => `${label} ${isNaN(parseInt(key)) ? 'hyv' : key}`,
    ),
    datasets: [
      {
        label: 'Suorituksia',
        data: Object.values(data),
        ...styleBlue,
      },
    ],
  });

// TODO: Typings
const piirräLaitosGraafit = data => {
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

// TODO: Typings
const grouppaaEriLaitostenKurssit = (stuff: ConvertedCourse[]) =>
  stuff.reduce((acc, kurssi) => {
    const { lyhenne, op, arvosana } = kurssi;
    const laitos = getLaitos(lyhenne);
    const edellisenKierroksenData = acc[laitos];
    const arvosanat = edellisenKierroksenData
      ? [...edellisenKierroksenData.arvosanat, arvosana].filter(negate(isNaN))
      : [arvosana].filter(negate(isNaN));
    const keskiarvo = average(arvosanat).toFixed(2);
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
    };

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

// tästä tää lähtee!
const start = () => {
  if (!pitäisköDomRakentaa()) {
    return;
  }

  const {
    duplikaattiKurssit,
    perusOpinnot,
    aineOpinnot,
    pääaine,
    sivuaineet,
  } = hommaaMatskutLocalStoragesta();

  createDom({
    duplikaattiKurssit,
    perusOpinnot,
    aineOpinnot,
    pääaine,
    sivuaineet,
  });

  // Make stuff & filter out undefined things
  // TODO: makeSomeStuff needs typings finished
  const stuff = makeSomeStuff(duplikaattiKurssit).filter(
    (item: Course) => item.luennoitsija !== undefined,
  );

  // prevent division with 0
  if (!stuff.length) {
    return;
  }

  const keskiarvot = annaMulleKeskiarvotKursseista(stuff);

  const {
    keskiarvotPerusopinnoista,
    keskiarvotAineopinnoista,
  } = laskeKeskiarvot({ stuff, keskiarvot, perusOpinnot, aineOpinnot });

  const aineJaPerusopintojenSuoritukset = stuff.filter(
    ({ lyhenne }) =>
      perusOpinnot.includes(lyhenne) || aineOpinnot.includes(lyhenne),
  );

  const luennoitsijat = haluaisinTietääLuennoitsijoista(stuff);

  const suositutSanat = haluanRakentaaSanapilvenJa2008SoittiJaHalusiSanapilvenTakaisin(
    stuff,
  );

  const kuukausiGroups = ryhmitteleStuffKivasti({
    stuff,
    fn: laskeKuukausienNopat,
  });

  const kumulatiivisetKuukaudetGroups = ryhmitteleStuffKivasti({
    stuff,
    fn: laskeKumulatiivisetKuukausienNopat,
  });

  const maxKuukausiNopat = max(Object.values(kuukausiGroups));
  const maxKuukausi = Object.entries(kuukausiGroups).find(
    ([_, op]) => op === maxKuukausiNopat,
  );

  const { keskiarvo } = [...keskiarvot].pop() as { keskiarvo: string };
  const painotettuKeskiarvo = laskePainotettuKeskiarvo(stuff);

  const arvosanatGroupattuna = laskeStuffistaHalututJutut({
    stuff,
    key: 'arvosana',
  });
  const nopatGroupattuna = laskeStuffistaHalututJutut({ stuff, key: 'op' });

  const laitostenKurssit = grouppaaEriLaitostenKurssit(stuff);

  const sivuaineidenMenestys = Object.values(laitostenKurssit).filter(
    // @ts-ignore
    ({ laitos }) =>
      contains(mapInvoke(sivuaineet, 'toUpperCase'), laitos.toUpperCase()),
  );

  const pääaineenMenestys = pääaine
    ? laitostenKurssit[pääaine.toUpperCase()]
    : null;

  piirräLaitosGraafit(laitostenKurssit);

  piirräGraafiNoppienTaiArvosanojenMäärille({
    id: 'chart-arvosanat-groupattuna',
    label: 'Arvosana',
    data: arvosanatGroupattuna,
  });

  piirräGraafiNoppienTaiArvosanojenMäärille({
    id: 'chart-nopat-groupattuna',
    label: 'op',
    data: nopatGroupattuna,
  });

  piirraRumaTagipilvi(suositutSanat);

  drawGraphs({
    stuff,
    keskiarvot,
    keskiarvotPerusopinnoista,
    keskiarvotAineopinnoista,
  }); // 📈

  piirräDonitsit({ stuff, aineOpinnot, perusOpinnot }); // 🍩

  piirräLuennoitsijaListat(luennoitsijat); // 👩‍🏫👨‍🏫

  piirteleVuosiJuttujaJookosKookosHaliPus(stuff);
  piirteleKuukausittaisetJututJookosKookosHaliPusJaAdios({
    kuukausiGroups,
    kumulatiivisetKuukaudetGroups,
  });

  piirraRandomStatistiikkaa({
    maxKuukausi,
    keskiarvo,
    painotettuKeskiarvo,
    aineJaPerusopintojenSuoritukset: sum(
      map(aineJaPerusopintojenSuoritukset, 'op'),
    ),
    kurssimaara: stuff.length,
    pääaine: pääaineenMenestys,
    sivuaineet: sivuaineidenMenestys,
    luennoitsijamaara: luennoitsijat.length,
    op: sum(map(stuff, 'op')),
    openUniMaara: map(stuff, 'kurssi')
      .map(toLowerCase)
      .filter(nameIncludesAvoinYo).length,
    openUniOp: stuff
      .filter(({ kurssi }) => nameIncludesAvoinYo(toLowerCase(kurssi)))
      .map(({ op }) => op)
      .reduce(add, 0),
    hyvMaara: map(stuff, 'arvosana').filter(isNaN).length,
    hyvOp: sum(map(stuff.filter(({ arvosana }) => isNaN(arvosana)), 'op')),
  });

  kuunteleAsijoita({ start, kurssitietokanta }); // 👂
};

start();
