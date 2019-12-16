import {
  annaMulleKeskiarvotKursseista,
  laskeKeskiarvot,
  rakenteleDataSetitKeskiarvoChartille,
} from './averages';
import { style, styleBlue, styleGreen, styleGreen2 } from './css';
import { kurssitietokanta } from './data/courses';
import { piirräDonitsit } from './donitsi';
import kuukausihistografi from './histografit/kuukausihistografi';
import viikkohistografi from './histografit/viikkohistografi';
import {
  ConvertedCourse,
  ConvertedCourseWithKeskiarvo,
  Course,
  DrawParams,
  Laitos,
} from './interfaces/Interfaces';
import { grouppaaEriLaitostenKurssit, piirräLaitosGraafit } from './laitos';
import {
  haluaisinTietääLuennoitsijoista,
  piirräLuennoitsijaListat,
} from './luennoitsijat';
import makeSomeStuff from './parseRecords';
import {
  createDom,
  piirraRandomStatistiikkaa,
  pitäisköDomRakentaa,
} from './utils/dom';
import { draw } from './utils/draw';
import { filterArvosana, negate } from './utils/helpers';
import { kuunteleAsijoita } from './utils/listeners';
import {
  contains,
  findPvm,
  laskeStuffistaHalututJutut,
  map,
  mapInvoke,
  max,
  notEmpty,
  sorttaaStuffLukukausienMukaan,
} from './utils/listUtils';
import { getListFromLocalStorage, getLocalStorage } from './utils/localStorage';
import { add, laskePainotettuKeskiarvo, sum } from './utils/numberUtils';
import {
  luoKivaAvainReducelle,
  nameIncludesAvoinYo,
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
      op: item.op <= 15 ? item.op * 10 : item.op,
      realOp: item.op,
    }));

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
  keskiarvotPääaineesta,
  keskiarvotPerusJaAineopinnoista,
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
        keskiarvotPääaineesta,
        keskiarvotPerusJaAineopinnoista,
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

interface ChartinData {
  label: string;
  data: number[];
}

interface SecondDataSet extends ChartinData {
  backgroundColor?: string;
}

interface HemmetinDataSetti extends ChartinData {
  secondDataSet: SecondDataSet;
}

const hemmettiSentäänTeeDataSetti = ({
  label,
  data,
  secondDataSet,
}: HemmetinDataSetti) =>
  [
    {
      label,
      data,
      ...styleBlue,
    },
    secondDataSet && {
      ...secondDataSet,
      type: 'line',
      ...styleGreen,
      ...(secondDataSet.backgroundColor && {
        backgroundColor: secondDataSet.backgroundColor,
      }),
    },
  ].filter(isTruthy);

interface PerusGraafiNopat {
  id: string;
  label: string;
  labels: string[];
  data: number[];
  secondDataSet: SecondDataSet;
  type?: DrawParams['type'];
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
      backgroundColor: 'transparent',
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

  const laitostenKurssit = grouppaaEriLaitostenKurssit(stuff);

  const sivuaineidenMenestys = (Object.values(
    laitostenKurssit,
  ) as Laitos[]).filter(({ laitos }) =>
    contains(mapInvoke(sivuaineet, 'toUpperCase'), laitos.toUpperCase()),
  );

  const pääaineenMenestys = pääaine
    ? laitostenKurssit[pääaine.toUpperCase()]
    : null;

  const {
    keskiarvotPerusopinnoista,
    keskiarvotAineopinnoista,
    keskiarvotPääaineesta,
    keskiarvotPerusJaAineopinnoista,
  } = laskeKeskiarvot({
    stuff,
    keskiarvot,
    perusOpinnot,
    aineOpinnot,
    pääaineopinnot:
      pääaineenMenestys &&
      pääaineenMenestys.kurssit.map(({ lyhenne }) => lyhenne),
  });

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

  const keskiarvoObj: ConvertedCourseWithKeskiarvo | undefined = [
    ...keskiarvot,
  ].pop();

  const keskiarvo = keskiarvoObj ? keskiarvoObj.keskiarvo : undefined;

  const painotettuKeskiarvo = laskePainotettuKeskiarvo(stuff);

  const arvosanatGroupattuna = laskeStuffistaHalututJutut({
    stuff,
    key: 'arvosana',
  });
  const nopatGroupattuna = laskeStuffistaHalututJutut({ stuff, key: 'op' });

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
    keskiarvotPääaineesta,
    keskiarvotPerusJaAineopinnoista,
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
    aineJaPerusopintojenSuoritukset: sum(map(
      aineJaPerusopintojenSuoritukset,
      'op',
    ) as number[]),
    kurssimaara: stuff.length,
    pääaine: pääaineenMenestys,
    sivuaineet: sivuaineidenMenestys,
    luennoitsijamaara: luennoitsijat.length,
    op: sum(map(stuff, 'op') as number[]),
    openUniMaara: (map(stuff, 'kurssi') as string[])
      .map(toLowerCase)
      .filter(nameIncludesAvoinYo).length,
    openUniOp: stuff
      .filter(({ kurssi }) => nameIncludesAvoinYo(toLowerCase(kurssi)))
      .map(({ op }) => op)
      .reduce(add, 0),
    hyvMaara: (map(stuff, 'arvosana') as number[]).filter(isNaN).length,
    hyvOp: sum(map(stuff.filter(negate(filterArvosana)), 'op') as number[]),
  });

  viikkohistografi(stuff);
  kuukausihistografi(stuff);

  kuunteleAsijoita({ start, kurssitietokanta }); // 👂
};

start();
