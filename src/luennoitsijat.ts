import { ConvertedCourse, LecturerRowParams } from './interfaces/Interfaces';
import { drawLuennoitsijat } from './utils/dom';
import { filterArvosana } from './utils/helpers';
import { map, notEmpty, sort } from './utils/listUtils';
import { average, sum } from './utils/numberUtils';
import { putsaaTeksti } from './utils/stringUtils';

const rakennaListaLuennoitsijoista = (
  initial: ConvertedCourse[],
  item: ConvertedCourse,
) => [
  ...initial,
  ...item.luennoitsija
    .split(',')
    .map(putsaaTeksti)
    .filter(notEmpty)
    .map((luennoitsija: string) => ({ ...item, luennoitsija })),
];

const getArvosanat = (luennot: ConvertedCourse[]): number[] =>
  map(luennot.filter(filterArvosana), 'arvosana') as number[];

export const haluaisinTietääLuennoitsijoista = (stuff: ConvertedCourse[]) =>
  stuff
    .reduce(rakennaListaLuennoitsijoista, [])
    .map(item => {
      const luennot = stuff.filter(
        ({ luennoitsija }) => luennoitsija === item.luennoitsija,
      );

      const arvosanat = getArvosanat(luennot);
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
      (initial: ConvertedCourse[], item: ConvertedCourse) =>
        initial.find(({ luennoitsija }) => luennoitsija === item.luennoitsija)
          ? initial
          : [...initial, item],
      [],
    );

const sorttaaLuennoitsijatKeskiarvonMukaan = (
  a: LecturerRowParams,
  b: LecturerRowParams,
) => b.luennot.keskiarvo - a.luennot.keskiarvo || b.kurssimaara - a.kurssimaara;

export const piirräLuennoitsijaListat = luennoitsijat => {
  const luennoitsijatElement = document.querySelector('#luennoitsijat');
  if (luennoitsijatElement === null) {
    throw new Error('piirräLuennoitsijaListat(): Element is null');
  }

  luennoitsijatElement.innerHTML = '';

  drawLuennoitsijat({
    luennoitsijatElement,
    title: 'Luennoitsijoiden top lista by kurssimaara',
    lista: sort(luennoitsijat, 'kurssimaara'),
  });

  drawLuennoitsijat({
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
    luennoitsijatElement,
    title: 'Luennoitsijoiden top lista by nopat',
    lista: luennoitsijat.sort((a, b) => b.luennot.totalOp - a.luennot.totalOp),
  });
};
