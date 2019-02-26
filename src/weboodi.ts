import Chart from 'chart.js';

import { css, style, styleBlue, styleGreen } from './css';
import { kurssitietokanta } from './data/courses';
import yolohtml from './html';
import {
  ConvertedCourse,
  Course,
  CourseArrToObjParams,
  DOMParams,
  DrawLuennoitsijatParams,
  DrawParams,
  DrawPieParams,
  LecturerRowParams,
} from './interfaces/Interfaces';
import chartColors from './utils/chartColors';
import {
  contains,
  findPvm,
  map,
  mapInvoke,
  max,
  min,
  notEmpty,
  notEmptyList,
  sort,
} from './utils/listUtils';
import {
  getListFromLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from './utils/localStorage';
import { average, sum } from './utils/numberUtils';
import { toLowerCase } from './utils/stringUtils';
import { isArray, isFloat, isTruthy } from './utils/validators';

const setDuplikaattiKurssit = setLocalStorage<string[]>('duplikaattiKurssit');
const setPerusOpinnot = setLocalStorage<string[]>('perusOpinnot');
const setAineOpinnot = setLocalStorage<string[]>('aineOpinnot');
const setPääaine = setLocalStorage<string>('pääaine');
const setSivuaineet = setLocalStorage<string[]>('sivuaineet');

const getDuplikaattiKurssit = () =>
  getListFromLocalStorage('duplikaattiKurssit');
const getPerusOpinnot = () => getListFromLocalStorage('perusOpinnot');
const getAineOpinnot = () => getListFromLocalStorage('aineOpinnot');
const getPääaineFromLokaali = () =>
  getLocalStorage<string | null>('pääaine', 'null');
const getSivuaineetFromLokaali = () => getListFromLocalStorage('sivuaineet');

const setHtmlContent = ({ id, content }: { id: string; content: string }) => {
  const element = document.getElementById(id);
  if (element !== null) {
    element.innerHTML = content;
  } else {
    console.error('setHtmlContent(): Element with id %s is null', id);
  }
};

const findFromKurssiTietokantaRecurse = ({ db, lyhenne }) =>
  Object.keys(db).reduce((acc, key) => {
    const courseFound =
      !acc.length &&
      isArray(db[key]) &&
      db[key].find(({ keys }) =>
        keys.map(toLowerCase).includes(toLowerCase(lyhenne)),
      );

    return (
      acc ||
      (isArray(db[key])
        ? courseFound
          ? courseFound.name
          : acc
        : findFromKurssiTietokantaRecurse({ db: db[key], lyhenne }))
    );
  }, '');

const findFromKurssiTietokanta = lyhenne =>
  findFromKurssiTietokantaRecurse({ db: kurssitietokanta, lyhenne });

const teeHienoTooltip = () => ({
  tooltips: {
    callbacks: {
      label: (tooltipItem, data) => {
        const label = data.datasets[tooltipItem.datasetIndex].label || '';
        const value = Math.round(tooltipItem.yLabel * 100) / 100;

        // datasetIndex = bar chart, values are multiplied by ten to show larger bars
        const labelValue =
          tooltipItem.datasetIndex || isFloat(value / 10) ? value : value / 10;

        return `${label}: ${labelValue}`;
      },
    },
  },
});

const draw = ({
  id,
  labels,
  datasets,
  type = 'bar',
  customTooltip = false,
  customTicks = false,
}: DrawParams) => {
  const stepSize = 55;
  const maxValue =
    Math.ceil(max(map(datasets, 'data').map(max)) / stepSize) * stepSize;

  const elem = document.getElementById(id);

  if (elem === null) {
    throw new Error(`draw(): Element with id ${id} is null`);
  }

  new Chart(elem as HTMLCanvasElement, {
    type,
    data: { labels, datasets },
    options: {
      ...(customTooltip && teeHienoTooltip()),
      scales: {
        yAxes: [
          {
            ...(customTicks && {
              gridLines: {
                drawBorder: false,
                color: chartColors,
              },
            }),
            ticks: {
              beginAtZero: true,
              ...(customTicks && {
                max: maxValue,
                stepSize,
              }),
            },
          },
        ],
      },
    },
  });
};

const drawPie = ({ id, labels, datasets, backgroundColor }: DrawPieParams) => {
  const elem = document.getElementById(`${id}-container`);
  if (elem === null) {
    throw new Error(`drawPie(): Element with id ${id}-container is null`);
  }
  elem.style.display = 'block';

  const elem2 = document.getElementById(id);

  if (elem2 === null) {
    throw new Error(`drawPie(): Element with id ${id} is null`);
  }

  new Chart(elem2 as HTMLCanvasElement, {
    type: 'pie',
    data: {
      datasets: [{ data: datasets, backgroundColor }],
      labels,
    },
  });
};

const suoritusTableSelector = '[name=suoritus] + table + table';

const pitäisköDomRakentaa = () =>
  !!document.querySelector(suoritusTableSelector);

const createDom = ({
  duplikaattiKurssit,
  aineOpinnot,
  perusOpinnot,
  pääaine,
  sivuaineet,
}: DOMParams) => {
  const listaTaulukko = document.querySelector(suoritusTableSelector);
  const nuggetsExist = document.querySelector('#nuggets');
  const yolo = yolohtml({
    duplikaattiKurssit,
    aineOpinnot,
    perusOpinnot,
    pääaine,
    sivuaineet,
  });

  if (!listaTaulukko) {
    return false;
  }

  if (nuggetsExist) {
    nuggetsExist.outerHTML = yolo;
  } else {
    listaTaulukko.outerHTML = listaTaulukko.outerHTML + css + yolo;
  }

  return true;
};

const createCoursesArray = target =>
  target.value
    .split(',')
    .map(putsaaTeksti)
    .filter(notEmpty);

const luoInputKuuntelijaJokaAsettaaArraynCallbackiin = ({
  name,
  callback,
}: {
  name: string;
  callback: (params: string[]) => void;
}) => {
  const input = document.querySelector(`input[name='${name}']`);

  if (input === null) {
    throw new Error(
      'luoInputKuuntelijaJokaAsettaaArraynCallbackiin(): Input is null',
    );
  }

  input.addEventListener('input', ({ target }) => {
    if (target !== null) {
      callback(createCoursesArray(target));
    } else {
      throw new Error(
        'createCoursesArray(): Cannot create a course array if the target is null',
      );
    }
  });
};

const kuunteleDuplikaattiInputtia = () => {
  luoInputKuuntelijaJokaAsettaaArraynCallbackiin({
    name: 'duplikaattiKurssit',
    callback: setDuplikaattiKurssit,
  });
};

const kuunteleppaNiitäPerusopintoja = () => {
  luoInputKuuntelijaJokaAsettaaArraynCallbackiin({
    name: 'perusOpinnot',
    callback: setPerusOpinnot,
  });
};

const tahtoisinVaanKuunnellaAineopintoja = () => {
  luoInputKuuntelijaJokaAsettaaArraynCallbackiin({
    name: 'aineOpinnot',
    callback: setAineOpinnot,
  });
};

const jepulisKuuntelePääaineenMuutoksia = () => {
  const input = document.querySelector("input[name='pääaine']");

  if (input === null) {
    throw new Error('jepulisKuuntelePääaineenMuutoksia(): Input is null');
  }

  input.addEventListener('input', ({ target }) => {
    if (target === null) {
      throw new Error('jepulisKuuntelePääaineenMuutoksia(): Target is null');
    }
    // TODO: Fix typing
    // @ts-ignore
    setPääaine(target.value.trim());
  });
};

const kuunteleSivuaineListanMuutoksia = () => {
  luoInputKuuntelijaJokaAsettaaArraynCallbackiin({
    name: 'sivuaineet',
    callback: setSivuaineet,
  });
};

const kuunteleppaNapinpainalluksiaJuu = () => {
  const input = document.querySelector('button#kliketi-klik');
  if (input === null) {
    throw new Error('kuunteleppaNapinpainalluksiaJuu(): Input is null');
  }
  input.addEventListener('click', start);
};

const luoKurssiAvainListaTietokannasta = opinnot =>
  // @ts-ignore
  map(kurssitietokanta.tkt[opinnot], 'keys').reduce((a, b) => [...a, ...b], []);

const kuunteleJaEsitäytäAsijoitamme = ({ name, perusopinnot, aineopinnot }) => {
  const input = document.querySelector(`button#${name}`);
  if (input === null) {
    throw new Error(
      `kuunteleJaEsitäytäAsijoitamme(): Input with id "button#${name}" is null`,
    );
  }
  input.addEventListener('click', () => {
    // @ts-ignore
    setPerusOpinnot(luoKurssiAvainListaTietokannasta(perusopinnot));
    // @ts-ignore
    setAineOpinnot(luoKurssiAvainListaTietokannasta(aineopinnot));
    start();
  });
};

const kuunteleEsitäyttönapinKliksutteluja2017 = () => {
  kuunteleJaEsitäytäAsijoitamme({
    name: 'kliketi-klik-esitäyttö-2017',
    perusopinnot: 'perusopinnot',
    aineopinnot: 'aineopinnot',
  });
};

const kuunteleEsitäyttönapinKliksutteluja2016 = () => {
  kuunteleJaEsitäytäAsijoitamme({
    name: 'kliketi-klik-esitäyttö-pre-2017',
    perusopinnot: 'perusopinnotPre2017',
    aineopinnot: 'aineopinnotPre2017',
  });
};

const kuunteleAsijoita = () => {
  kuunteleDuplikaattiInputtia();
  kuunteleppaNiitäPerusopintoja();
  tahtoisinVaanKuunnellaAineopintoja();
  jepulisKuuntelePääaineenMuutoksia();
  kuunteleSivuaineListanMuutoksia();
  kuunteleppaNapinpainalluksiaJuu();
  kuunteleEsitäyttönapinKliksutteluja2017();
  kuunteleEsitäyttönapinKliksutteluja2016();
};

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
const groupThemCourses = stuff =>
  stuff
    .reduce(
      (initial, item) =>
        findPvm(initial, item.pvm)
          ? initial.map(setDailyCumulativeNoppas(item))
          : [...initial, item],
      [],
    )
    .map(item => ({
      ...item,
      op: item.op <= 10 ? item.op * 10 : item.op,
      realOp: item.op,
    }));

const putsaaTeksti = (str: unknown) => {
  if (typeof str === 'string') {
    return str.replace(/&nbsp;/g, ' ').trim();
  }
  return '';
};

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
const lasketaanpaLopuksiKumulatiivisetNopat = (initial, item, i) => [
  ...initial,
  {
    ...item,
    cumulativeOp: item.op + (i && initial[i - 1].cumulativeOp),
  },
];

const hommaaMeilleListaAsijoistaDommista = () => [
  ...Array.from(
    document.querySelectorAll(
      '[name=suoritus] + table + table:not(.eisei) table.eisei tbody tr',
    ),
  ),
];

// TODO: Typings
const makeSomeStuff = (duplikaattiKurssit: string[]) =>
  hommaaMeilleListaAsijoistaDommista()
    .map(item => [...Array.from(item.querySelectorAll('td'))])
    .filter(elementArray => notEmptyList(elementArray)) // Filter empty lists
    .map(item => map(item, 'textContent').map(putsaaTeksti)) // Return type is string[]
    .filter(([lyhenne]) => !duplikaattiKurssit.includes(lyhenne))
    .reverse()
    .filter(item => item.length > 3)
    // @ts-ignore
    .map(muutaArrayKivaksiObjektiksi)
    .filter(({ op }) => !isNaN(op))
    .sort((a, b) => {
      // TODO: Replace with filtering function
      return a.pvmDate.getTime() - b.pvmDate.getTime();
    })
    .reduce(lasketaanpaLopuksiKumulatiivisetNopat, []);

// TODO: Typings
const takeUntil = (list, n) =>
  list.reduce((initial, item, i) => (i < n ? [...initial, item] : initial), []);

// TODO: Typings
const annaMulleKeskiarvotKursseista = stuff =>
  stuff
    .filter(item => !isNaN(item.arvosana))
    .map((item, i, list) => ({
      ...item,
      keskiarvo: average(takeUntil(map(list, 'arvosana'), i + 1)).toFixed(2),
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
    .map(luennoitsija => ({ ...item, luennoitsija })),
];

// TODO: Typings
const haluaisinTietääLuennoitsijoista = stuff =>
  stuff
    .reduce(rakennaListaLuennoitsijoista, [])
    .map((item, i, arr) => {
      const luennot = arr.filter(
        ({ luennoitsija }) => luennoitsija === item.luennoitsija,
      );

      const arvosanat = map(
        luennot.filter(item => !isNaN(item.arvosana)),
        'arvosana',
      );

      const keskiarvo = average(arvosanat);

      return {
        ...item,
        kurssimaara: luennot.length,
        luennot: {
          arvosanat,
          keskiarvo: keskiarvo ? keskiarvo.toFixed(2) : 'hyv',
          op: map(luennot, 'op'),
          totalOp: map(luennot, 'op').reduce(sum, 0),
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

const poistaAvoinKurssiNimestä = (kurssi: string) =>
  kurssi
    .replace('Avoin yo:', '')
    .replace('Open uni:', '')
    .trim();

const poistaSulut = (str: string) => str.replace(/\(|\)/g, '').trim();

const poistaPilkut = (str: string) => str.replace(',', '').trim();

const liianLyhytNimiSanaPilveen = 2;

const poistaLiianLyhyetNimet = (str: string) =>
  str.length > liianLyhytNimiSanaPilveen;

// TODO: Typings
const haluanRakentaaSanapilvenJa2008SoittiJaHalusiSanapilvenTakaisin = stuff =>
  map(stuff, 'kurssi')
    .map(poistaAvoinKurssiNimestä)
    .map(poistaSulut)
    // @ts-ignore
    .reduce((list, kurssi) => [...list, ...kurssi.split(' ')], [])
    .filter(poistaLiianLyhyetNimet)
    .map(poistaPilkut)
    .reduce(
      (list, kurssi) => ({
        ...list,
        [kurssi]: list[kurssi] ? list[kurssi] + 1 : 1,
      }),
      {},
    );

const createLuennoitsijaRivi = ({
  luennoitsija,
  kurssimaara,
  luennot,
}: LecturerRowParams) => `<p>
    ${luennoitsija},
    kursseja ${kurssimaara},
    keskiarvo: ${luennot.keskiarvo},
    noppia: ${luennot.totalOp}
  </p>`;

const drawLuennoitsijat = ({
  title,
  lista,
  luennoitsijatElement,
}: DrawLuennoitsijatParams) => {
  const html = `
    <div class="luennoitsijat pull-left">
      <p><strong>${title}</strong></p>
      ${lista.map(createLuennoitsijaRivi).join('')}
    </div>
  `;
  if (luennoitsijatElement !== undefined) {
    luennoitsijatElement.innerHTML = luennoitsijatElement.innerHTML + html;
  }
};

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
  kurssi: item.kurssi.replace('Avoin yo: ', '').replace('Open uni: ', ''),
});

// TODO: Typings
const negate = callback => item => !callback(item);

// TODO: Typings
const partition = (list, predicate) => [
  list.filter(negate(predicate)),
  list.filter(predicate),
];

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
      kurssi: findFromKurssiTietokanta(lyhenne) || lyhenne,
      done,
    }))
    .reduce(removeDuplicateCourses(coursesDone), [])
    .map(removeAvoinFromKurssiNimi);

  const greatSuccess =
    coursesDone.length === opintoData.length ? 'All done, nice!' : '';

  setHtmlContent({
    id: `${id}-progress`,
    content: `${coursesDone.length}/${opintoData.length} ${greatSuccess}`,
  });

  drawPie({
    id,
    labels: map(opintoData, 'kurssi'),
    datasets: opintoData.map(() => (1 / opintoData.length) * 100),
    backgroundColor: opintoData.map(({ done }) =>
      done ? 'lightgreen' : 'lightgray',
    ),
  });
};

// TODO: Typings
const findOpintoByLyhenne = ({ opinnot, lyhenne }) =>
  opinnot.find(item => lyhenne === item.lyhenne);

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
  keskiarvot,
  keskiarvotPerusopinnoista,
  keskiarvotAineopinnoista,
}) =>
  [
    notEmpty(keskiarvot) && {
      label: 'Kurssien keskiarvo',
      data: map(keskiarvot, 'keskiarvo'),
      ...style,
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
  ].filter(isTruthy);

// TODO: Typings
const rakenteleDataSetitNoppaChartille = grouped =>
  [
    {
      label: 'Päivän opintopisteet',
      data: map(grouped, 'op'),
    },
    {
      label: 'Suoritukset',
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
  notEmpty(grouped) &&
    draw({
      id: 'chart-nopat',
      customTooltip: true,
      customTicks: true,
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
  throw new Error('getPvmArray(): Parsing date failed');
};

const sorttaaStuffLukukausienMukaan = (a: Course, b: Course) =>
  a.pvmDate.getTime() - b.pvmDate.getTime();

const isInBetween = ({
  value,
  values: [start, end],
}: {
  value: Date;
  values: [Date, Date];
}) => value.getTime() >= start.getTime() && value.getTime() <= end.getTime();

const luoLukuvuodelleKivaAvain = ({
  vuosi,
  pvmIsCurrentSemester,
  pvmIsNextSemester,
}: {
  vuosi: number;
  pvmIsCurrentSemester: boolean;
  pvmIsNextSemester: boolean;
}) => {
  let vuosiJuttu = 0;
  if (pvmIsCurrentSemester) {
    vuosiJuttu = vuosi;
  } else if (pvmIsNextSemester) {
    // If it's not between the current semester, it must be the next one
    vuosiJuttu = vuosi + 1;
  } else {
    vuosiJuttu = vuosi - 1;
  }
  return vuosiJuttu;
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

const luoKivaAvainReducelle = (pvmDate: Date) => {
  const vuosi = pvmDate.getFullYear();
  const kuukausi = pvmDate.toLocaleString('fi', { month: 'long' });

  return `${kuukausi} ${vuosi}`;
};

// TODO: Remove any & extract interface
const laskeKuukausienNopat = (
  prev: any,
  {
    pvmDate,
    op,
  }: {
    pvmDate: Date;
    op: number;
  },
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
}: {
  id: string;
  label: string;
  labels: string[];
  data: any[]; // TODO: Remove any[]
  secondDataSet: {
    label: string;
    data: any[]; // TODO: Remove any[]
  };
}) =>
  draw({
    id,
    labels,
    type: secondDataSet ? 'bar' : 'line',
    datasets: hemmettiSentäänTeeDataSetti({ label, data, secondDataSet }),
  });

// TODO: Typings
const piirteleVuosiJuttujaJookosKookosHaliPus = stuff => {
  const lukukausiGroups = ryhmitteleStuffKivasti({
    stuff,
    fn: laskeLukukausienNopat,
  });
  const lukukausiKeys = Object.keys(lukukausiGroups);
  const lukukausiData = Object.values(lukukausiGroups);
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

  // @ts-ignore
  piirräPerusGraafiNopille({
    labels,
    data,
    id: 'chart-nopat-vuosi',
    label: 'Noppia per lukuvuosi',
  });
};

// TODO: Typings
const piirteleKuukausittaisetJututJookosKookosHaliPusJaAdios = ({
  kuukausiGroups,
  kumulatiivisetKuukaudetGroups,
}) => {
  piirräPerusGraafiNopille({
    id: 'chart-nopat-kuukaudet',
    label: 'Noppia per kuukausi',
    labels: Object.keys(kuukausiGroups),
    data: Object.values(kuukausiGroups),
    secondDataSet: {
      label: 'Kumulatiiviset nopat',
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
    // @ts-ignore
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
const piirraAvoimenSuorituksia = ({ kurssimaara, openUniMaara, openUniOp }) => {
  const openUniPercentage = ((openUniMaara / kurssimaara) * 100).toFixed(2);
  setHtmlContent({
    id: 'open-uni-maara',
    content: `Olet suorittanut ${openUniMaara} avoimen kurssia, joka on ${openUniPercentage}% opinnoistasi. Yhteensä ${openUniOp} op.`,
  });
};

// TODO: Typings
const laitaHyvaksytytSuorituksetDomiinJeps = ({
  kurssimaara,
  hyvMaara,
  hyvOp,
}) => {
  const hyvPercentage = ((hyvMaara / kurssimaara) * 100).toFixed(2);
  setHtmlContent({
    id: 'hyv-maara',
    content: `Olet saanut ${hyvMaara} hyv merkintää, joka on ${hyvPercentage}% opinnoistasi. Yhteensä ${hyvOp} op.`,
  });
};

// TODO: Typings
const arvioidaanOpintoVuodetDomiin = op => {
  const vuodet = (op / 60).toFixed(2);
  setHtmlContent({
    id: 'vuodet-arvio',
    content: `Opintopistemäärän mukaan arvioin sinun suorittaneen ${vuodet} vuotta opintojasi. Laskukaava = <span title="Opintopistemäärä / vuoden tavoiteopintopistemäärä">${op} / 60</span>.`,
  });
};

// TODO: Typings
const arvioidaanKäytetytOpiskelutunnit = op => {
  const tunnit = (op * 27).toFixed(2);
  setHtmlContent({
    id: 'tunnit-arvio',
    content: `Opintopistemäärän mukaan arvioin sinun käyttäneen ${tunnit} tehokasta opiskelutuntia. Laskukaava = <span title="Opintopistemäärä * 27 tuntia per opintopiste">${op} * 27</span>.`,
  });
};

// TODO: Typings
const luoTilastoaAineidenKeskiarvoista = ({ key, data }) =>
  `${key} ${data.laitos} keskiarvo on ${
    isNaN(data.keskiarvo) ? 'hyv' : data.keskiarvo
  } ja painotettu keskiarvo on ${
    isNaN(data.painotettuKeskiarvo) ? 'hyv' : data.painotettuKeskiarvo
  }`;

// TODO: Typings
const piirraRandomStatistiikkaa = ({
  kurssimaara,
  luennoitsijamaara,
  op,
  openUniMaara,
  openUniOp,
  hyvMaara,
  hyvOp,
  maxKuukausi,
  keskiarvo,
  painotettuKeskiarvo,
  pääaine,
  sivuaineet,
}) => {
  setHtmlContent({
    id: 'opintojen-maara',
    content: `Olet suorittanut huimat ${kurssimaara} erilaista kurssia! Good for you!`,
  });

  const [kuukausi, vuosi] = maxKuukausi[0].split(' ');

  setHtmlContent({
    id: 'max-kuukausi-nopat',
    content: `Olit tulessa ${kuukausi}ssa ${vuosi}! Suoritit silloin ${
      maxKuukausi[1]
    } noppaa! Whoah!`,
  });

  setHtmlContent({
    id: 'keskiarvo',
    content: `Opintojen keskiarvo: ${keskiarvo}. Painotettu keskiarvo: ${painotettuKeskiarvo}.`,
  });

  setHtmlContent({
    id: 'luennoitsijoiden-maara',
    content: `Olet käynyt ${luennoitsijamaara} eri luennoitsijan kursseilla, ${(
      kurssimaara / luennoitsijamaara
    ).toFixed(2)} kurssia per luennoitsija, ${(op / luennoitsijamaara).toFixed(
      2,
    )} op per luennoitsija.`,
  });
  setHtmlContent({
    id: 'keskiarvo-op-maara',
    content: `Keskiarvolta ${(op / kurssimaara).toFixed(2)} noppaa per kurssi.`,
  });
  if (openUniMaara) {
    piirraAvoimenSuorituksia({ kurssimaara, openUniMaara, openUniOp });
  }

  if (hyvMaara) {
    laitaHyvaksytytSuorituksetDomiinJeps({ kurssimaara, hyvMaara, hyvOp });
  }

  if (pääaine) {
    setHtmlContent({
      id: 'pääaine-data',
      content: luoTilastoaAineidenKeskiarvoista({
        key: 'Pääaineesi',
        data: pääaine,
      }),
    });
  }

  if (sivuaineet) {
    setHtmlContent({
      id: 'sivuaineet-data',
      content: sivuaineet
        .map(data =>
          luoTilastoaAineidenKeskiarvoista({ key: 'Sivuaineesi', data }),
        )
        .join('<br>'),
    });
  }

  arvioidaanOpintoVuodetDomiin(op);
  arvioidaanKäytetytOpiskelutunnit(op);
};

const minFontSize = 7;
const maxFontSize = 28;

const countFontSize = ({
  val,
  minValue,
  maxValue,
}: {
  val: number;
  minValue: number;
  maxValue: number;
}) =>
  val > minValue
    ? (maxFontSize * (val - minValue)) / (maxValue - minValue) + minFontSize
    : 1;

// TODO: Typings
const piirraRumaTagipilvi = (words: { [x: string]: number }) => {
  const minValue = min(Object.values(words));
  const maxValue = max(Object.values(words));

  const content = Object.keys(words)
    .map(key => ({
      key,
      fontSize: countFontSize({ minValue, maxValue, val: words[key] }),
      count: words[key],
    }))
    .map(
      ({ fontSize, key, count }) =>
        `<span style="font-size: ${fontSize}px;" title="${key} on mainittu ${count} kertaa suorituksissasi">${key}</span>`,
    )
    .join(' ');

  setHtmlContent({
    content,
    id: 'tagipilvi',
  });
};

// TODO: Typings
const undefinedStuffFilter = (item: Course) => item.luennoitsija !== undefined;

const nameIncludesAvoinYo = (name: string) =>
  name.includes('avoin yo') || name.includes('open uni');

// TODO: Typings
const laskePainotettuKeskiarvo = data => {
  const arvosanallisetOpintosuoritukset = data.filter(
    ({ arvosana }) => !isNaN(arvosana),
  );

  return (
    arvosanallisetOpintosuoritukset.reduce(
      (acc, { op, arvosana }) => acc + arvosana * op,
      0,
    ) / map(arvosanallisetOpintosuoritukset, 'op').reduce(sum, 0)
  ).toFixed(2);
};

// TODO: Typings
const laskeStuffistaHalututJutut = ({ stuff, key }) =>
  stuff.reduce(
    (acc, item) => ({
      ...acc,
      [item[key]]: acc[item[key]] ? acc[item[key]] + 1 : 1,
    }),
    {},
  );

// TODO: Typings
const laskeKuinkaMontaMitäkinNoppaaOnOlemassa = stuff =>
  laskeStuffistaHalututJutut({ stuff, key: 'op' });

// TODO: Typings
const laskeKuinkaMontaMitäkinArvosanaaOnOlemassa = stuff =>
  laskeStuffistaHalututJutut({ stuff, key: 'arvosana' });

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

const parsiLaitoksenKoodi = (lyhenne: string) =>
  lyhenne
    .replace(/^(ay|a)/i, '')
    .replace(/(-|_)[\d\D]+/i, '')
    .replace(/[\d]+/, '');

// TODO: Typings
const grouppaaEriLaitostenKurssit = stuff =>
  stuff.reduce((acc, kurssi) => {
    const { lyhenne, op, arvosana } = kurssi;
    const laitoksenKoodi = parsiLaitoksenKoodi(lyhenne);
    const laitos = (laitoksenKoodi.length
      ? laitoksenKoodi
      : 'emt'
    ).toUpperCase();
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
        ...styleGreen,
      },
    ],
  });
};

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
  const stuff = makeSomeStuff(duplikaattiKurssit).filter(undefinedStuffFilter);

  // prevent division with 0
  if (!stuff.length) {
    return;
  }

  const keskiarvot = annaMulleKeskiarvotKursseista(stuff);

  const {
    keskiarvotPerusopinnoista,
    keskiarvotAineopinnoista,
  } = laskeKeskiarvot({ stuff, keskiarvot, perusOpinnot, aineOpinnot });

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

  const { keskiarvo } = [...keskiarvot].pop();
  const painotettuKeskiarvo = laskePainotettuKeskiarvo(stuff);

  const arvosanatGroupattuna = laskeKuinkaMontaMitäkinArvosanaaOnOlemassa(
    stuff,
  );
  const nopatGroupattuna = laskeKuinkaMontaMitäkinNoppaaOnOlemassa(stuff);

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
    kurssimaara: stuff.length,
    pääaine: pääaineenMenestys,
    sivuaineet: sivuaineidenMenestys,
    luennoitsijamaara: luennoitsijat.length,
    op: map(stuff, 'op').reduce(sum, 0),
    openUniMaara: map(stuff, 'kurssi')
      .map(toLowerCase)
      .filter(nameIncludesAvoinYo).length,
    openUniOp: stuff
      .filter(({ kurssi }) => nameIncludesAvoinYo(toLowerCase(kurssi)))
      .map(({ op }) => op)
      .reduce(sum, 0),
    hyvMaara: map(stuff, 'arvosana').filter(isNaN).length,
    hyvOp: map(stuff.filter(({ arvosana }) => isNaN(arvosana)), 'op').reduce(
      sum,
      0,
    ),
  });

  kuunteleAsijoita(); // 👂
};

start();
