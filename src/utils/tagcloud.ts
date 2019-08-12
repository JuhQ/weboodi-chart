import { setHtmlContent } from './dom';
import { max, min } from './listUtils';

const minFontSize = 7;
const maxFontSize = 28;

interface Tags {
  val: number;
  minValue: number;
  maxValue: number;
}

const countFontSize = ({ val, minValue, maxValue }: Tags): number =>
  val > minValue
    ? (maxFontSize * (val - minValue)) / (maxValue - minValue) + minFontSize
    : 1;

// TODO: Typings
export const piirraRumaTagipilvi = (words: { [x: string]: number }) => {
  const values = Object.values(words);
  const minValue = min(values);
  const maxValue = max(values);

  const content = Object.keys(words)
    .map(key => ({
      key,
      fontSize: countFontSize({ minValue, maxValue, val: words[key] }),
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
