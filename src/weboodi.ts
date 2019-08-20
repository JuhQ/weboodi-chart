import {
  annaMulleKeskiarvotKursseista,
  laskeKeskiarvot,
  rakenteleDataSetitKeskiarvoChartille,
} from './averages';
import { style, styleBlue, styleGreen, styleGreen2 } from './css';
import { kurssitietokanta } from './data/courses';
import { ConvertedCourse, Course } from './interfaces/Interfaces';
import {
  haluaisinTietääLuennoitsijoista,
  piirräLuennoitsijaListat,
} from './luennoitsijat';
import makeSomeStuff from './parseRecords';
import {
  createDom,
  piirraRandomStatistiikkaa,
  pitäisköDomRakentaa,
  setHtmlContent,
} from './utils/dom';
import { draw, drawPie } from './utils/draw';
import { negate } from './utils/helpers';
import { kuunteleAsijoita } from './utils/listeners';
import {
  contains,
  findFromKurssiTietokanta,
  findPvm,
  laskeStuffistaHalututJutut,
  map,
  mapInvoke,
  max,
  notEmpty,
  partition,
  sort,
  sorttaaStuffLukukausienMukaan,
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
  toLowerCase,
} from './utils/stringUtils';
import {
  haluanRakentaaSanapilvenJa2008SoittiJaHalusiSanapilvenTakaisin,
  piirraRumaTagipilvi,
} from './utils/tagcloud';
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

// TODO: Typings
const courseNamesMatch = (kurssi: string) => row => row.kurssi === kurssi;

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

interface CoolBeans {
  id: string;
  stuff: any[];
  data: string[];
}

const drawOpintoDonitsi = ({ id, stuff, data }: CoolBeans) => {
  const [coursesDone, coursesNotDone]: Array<CoolBeans['data']> = partition(
    data,
    (lyhenne: string) => !stuff.find(course => lyhenne === course.lyhenne),
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
const getLukuvuosi = (vuosi: number): [Date, Date] => [
  new Date(vuosi, 7, 1),
  new Date(vuosi + 1, 6, 31, 23, 59, 59),
];

interface LukuvuodenKivaAvainData {
  vuosi: number;
  pvmIsCurrentSemester: boolean;
  pvmIsNextSemester: boolean;
}

const luoLukuvuodelleKivaAvain = ({
  vuosi,
  pvmIsCurrentSemester,
  pvmIsNextSemester,
}: LukuvuodenKivaAvainData): number =>
  vuosi + (Number(pvmIsCurrentSemester) - Number(pvmIsNextSemester));

interface LukukausiNopat {
  pvmDate: Date;
  op: number;
}

const laskeLukukausienNopat = (
  prev: LukukausiNopat,
  { pvmDate, op }: LukukausiNopat,
): LukukausiNopat => {
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

interface CumulativeNopat {
  pvmDate: Date;
  cumulativeOp: number;
}

const laskeKumulatiivisetKuukausienNopat = (
  prev: CumulativeNopat,
  { pvmDate, cumulativeOp }: CumulativeNopat,
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

interface PerusGraafiNopat {
  id: string;
  label: string;
  labels: string[];
  data: number[];
  secondDataSet: {
    label: string;
    data: number[];
  };
  type?: string;
}

const piirräPerusGraafiNopille = ({
  id,
  label,
  labels,
  data,
  secondDataSet,
  type = secondDataSet ? 'bar' : 'line',
}: PerusGraafiNopat) =>
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

interface Donitsi {
  stuff: any[];
  aineOpinnot: string[];
  perusOpinnot: string[];
}
// TODO: Typings
const piirräDonitsit = ({ stuff, aineOpinnot, perusOpinnot }: Donitsi) => {
  notEmpty(aineOpinnot) &&
    drawOpintoDonitsi({ id: 'aineopinnot', stuff, data: aineOpinnot });

  notEmpty(perusOpinnot) &&
    drawOpintoDonitsi({ id: 'perusopinnot', stuff, data: perusOpinnot });
};

const hommaaMatskutLocalStoragesta = () => ({
  duplikaattiKurssit: getDuplikaattiKurssit(),
  perusOpinnot: getPerusOpinnot(),
  aineOpinnot: getAineOpinnot(),
  pääaine: getPääaineFromLokaali(),
  sivuaineet: getSivuaineetFromLokaali(),
});

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
