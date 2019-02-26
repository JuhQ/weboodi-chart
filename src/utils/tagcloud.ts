import { max, min } from './listUtils';
import { setHtmlContent } from './setHtmlContent';

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
export const piirraRumaTagipilvi = (words: { [x: string]: number }) => {
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
