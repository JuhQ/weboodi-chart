import { ConvertedCourse } from '../interfaces/Interfaces';
import { setHtmlContent } from './dom';
import { map, max, min } from './listUtils';
import {
  poistaAvoinKurssiNimestä,
  poistaKaksoispisteet,
  poistaLiianLyhyetNimet,
  poistaPilkut,
  poistaSulut,
} from './stringUtils';

const minFontSize = 7;
const maxFontSize = 28;

interface Tags {
  val: number;
  minValue: number;
  maxValue: number;
}

const countFontSize = ({ val, minValue, maxValue }: Tags): number =>
  val > minValue ? (maxFontSize * (val - minValue)) / (maxValue - minValue) : 0;

export const piirraRumaTagipilvi = (words: { [x: string]: number }) => {
  const values = Object.values(words);
  const minValue = min(values);
  const maxValue = max(values);

  const content = Object.keys(words)
    .map(key => ({
      key,
      fontSize:
        countFontSize({ minValue, maxValue, val: words[key] }) + minFontSize,
      count: words[key],
    }))
    .map(
      ({ fontSize, key, count }) =>
        `<span style="font-size: ${fontSize}px;" title="${key} on mainittu ${count} kertaa suorituksissasi">
          ${key}
        </span>`,
    )
    .join(' ');

  setHtmlContent({
    content,
    id: 'tagipilvi',
  });
};

// TODO: Typings
export const haluanRakentaaSanapilvenJa2008SoittiJaHalusiSanapilvenTakaisin = (
  stuff: ConvertedCourse[],
) =>
  (map(stuff, 'kurssi') as string[])
    .map(poistaAvoinKurssiNimestä)
    .map(poistaSulut)
    .reduce(
      (list: string[], kurssi: string) => [...list, ...kurssi.split(' ')],
      [],
    )
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
