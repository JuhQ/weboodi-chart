import { css } from '../css';
import yolohtml from '../html';
import { DOMParams } from '../interfaces/Interfaces';

const suoritusTableSelector = '[name=suoritus] + table + table';

export const hommaaMeilleListaAsijoistaDommista = () => [
  ...Array.from(
    document.querySelectorAll(
      '[name=suoritus] + table + table:not(.eisei) table.eisei tbody tr',
    ),
  ),
];

export const pitäisköDomRakentaa = () =>
  !!document.querySelector(suoritusTableSelector);

export const createDom = ({
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
