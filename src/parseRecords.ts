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

const muutaArrayKivaksiObjektiksi = ([
  lyhenne,
  kurssi,
  op,
  arvosana,
  pvm = '01.01.1970',
  luennoitsija,
]: string[]): ConvertedCourse => ({
  pvm,
  kurssi,
  lyhenne,
  luennoitsija,
  op: Number(poistaSulut(op)), // paketoitu kandi tms
  arvosana: Number(arvosana),
  pvmDate: rakenteleDateObjekti(getPvmArray(pvm)),
});

const rakenteleDateObjekti = ([paiva, kuukausi, vuosi]: [
  number,
  number,
  number
]) => new Date(vuosi, kuukausi - 1, paiva);

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

const getPvmArray = (pvm: string) => {
  const splitted = pvm.split('.');
  if (splitted.length === 3) {
    return splitted.map(Number) as [number, number, number];
  }
  // Failsafe
  throw new Error(`getPvmArray(): Parsing date failed: ${JSON.stringify(pvm)}`);
};

const hanskaaAvatutPaketit = (row: string[]): boolean =>
  !row[0].includes('   ');

const makeSomeStuff = (duplikaattiKurssit: string[]) =>
  hommaaMeilleListaAsijoistaDommista()
    .map(item => [...Array.from(item.querySelectorAll('td'))])
    .filter(notEmpty)
    .map(item => map(item, 'textContent').map(putsaaTeksti))
    .filter(([lyhenne]) => !duplikaattiKurssit.includes(lyhenne))
    .reverse()
    .filter(hanskaaAvatutPaketit)
    .filter(atleastThreeItemsInList)
    .map(muutaArrayKivaksiObjektiksi)
    .filter(({ op }) => !isNaN(op))
    .sort((a, b) => a.pvmDate.getTime() - b.pvmDate.getTime())
    .reduce(lasketaanpaLopuksiKumulatiivisetNopat, []);

export default makeSomeStuff;
