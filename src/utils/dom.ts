import { css } from '../css';
import yolohtml from '../html';
import {
  Course,
  DOMParams,
  DrawLuennoitsijatParams,
  LecturerRowParams,
} from '../interfaces/Interfaces';

const suoritusTableSelector = '[name=suoritus] + h2 + table + table';

export const setHtmlContent = ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => {
  const element = document.getElementById(id);
  if (element !== null) {
    element.innerHTML = content;
  } else {
    console.error('setHtmlContent(): Element with id %s is null', id);
  }
};

export const hommaaMeilleListaAsijoistaDommista = () => [
  ...Array.from(
    document.querySelectorAll(
      '[name=suoritus] + h2 + table + table:not(.eisei) table.eisei tbody tr',
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
}: DOMParams): boolean => {
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

const createLuennoitsijaRivi = ({
  luennoitsija,
  kurssimaara,
  luennot,
}: LecturerRowParams): string => `<p>
    ${luennoitsija},
    kursseja ${kurssimaara},
    keskiarvo: ${luennot.keskiarvo},
    noppia: ${luennot.totalOp}
  </p>`;

export const drawLuennoitsijat = ({
  title,
  lista,
  luennoitsijatElement,
}: DrawLuennoitsijatParams) => {
  if (!luennoitsijatElement) {
    return;
  }

  const html = `
    <div class="luennoitsijat pull-left">
      <p><strong>${title}</strong></p>
      ${lista.map(createLuennoitsijaRivi).join('')}
    </div>
  `;

  luennoitsijatElement.innerHTML = luennoitsijatElement.innerHTML + html;
};

// TODO: Typings
const piirraAvoimenSuorituksia = ({ kurssimaara, openUniMaara, openUniOp }) => {
  const openUniPercentage = ((openUniMaara / kurssimaara) * 100).toFixed(2);
  setHtmlContent({
    id: 'open-uni-maara',
    content: `Olet suorittanut ${openUniMaara} avoimen kurssia, joka on ${openUniPercentage}% opinnoistasi.
    Yhteensä ${openUniOp} op.
    `,
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
const arvioidaanOpintoVuodetDomiin = (op: number) => {
  const vuodet = (op / 60).toFixed(2);
  setHtmlContent({
    id: 'vuodet-arvio',
    content: `Opintopistemäärän mukaan arvioin sinun suorittaneen ${vuodet} vuotta opintojasi.
    Laskukaava = <span title="Opintopistemäärä / vuoden tavoiteopintopistemäärä">${op} / 60</span>.
    `,
  });
};

const prosentitKandilleTaiGradulle = (op: number) => {
  const kandi = ((op / 180) * 100).toFixed(2);
  const gradu = (((op - 180) / 120) * 100).toFixed(2);
  const graduIlmanKandia = ((op / 120) * 100).toFixed(2);
  setHtmlContent({
    id: 'kandi-gradu-prosentit',
    content: `Jos opiskelet kandia, arvioin sinun suorittaneen ${kandi}% opinnoistasi.
    <span title="((nopat - 180 op kandista) / 120) * 100">Jos opiskelet maisteria, arvioin sinun suorittaneen ${gradu}% opinnoistasi.</span>
    <span title="(nopat / 120) * 100">Jos opiskelet maisteria, eikä alla ole kandia täältä, arvioin sinun suorittaneen ${graduIlmanKandia}% opinnoistasi.</span>
    `,
  });
};

// TODO: Typings
const arvioidaanKäytetytOpiskelutunnit = (op: number) => {
  const tunnit = (op * 27).toFixed(2);
  setHtmlContent({
    id: 'tunnit-arvio',
    content: `Opintopistemäärän mukaan arvioin sinun käyttäneen ${tunnit} tehokasta opiskelutuntia.
    Laskukaava = <span title="Opintopistemäärä * 27 tuntia per opintopiste">${op} * 27</span>.
    `,
  });
};

interface JepulisData {
  laitos: string;
  keskiarvo: number;
  painotettuKeskiarvo: number;
  kurssit: Course[];
  op: number;
}

interface Jepulis {
  key: string;
  data: JepulisData;
}

const monikko = (n: number, s1: string, s2: string) => (n == 1 ? s1 : s2);

const luoTilastoaAineidenKeskiarvoista = ({ key, data }: Jepulis) =>
  `${key} ${data.laitos} keskiarvo on ${
    isNaN(data.keskiarvo) ? 'hyv' : data.keskiarvo
  } ja painotettu keskiarvo on ${
    isNaN(data.painotettuKeskiarvo) ? 'hyv' : data.painotettuKeskiarvo
  }. ${data.op} op, ${data.kurssit.length} ${monikko(
    data.kurssit.length,
    'kurssi',
    'kurssia',
  )}.`;

// TODO: Typings
export const piirraRandomStatistiikkaa = ({
  kurssimaara,
  luennoitsijamaara,
  op,
  aineJaPerusopintojenSuoritukset,
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
    content: `Olit tulessa ${kuukausi}ssa ${vuosi}! Suoritit silloin ${maxKuukausi[1]} noppaa! Whoah!`,
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
  setHtmlContent({
    id: 'ainejaperusopintoja',
    content: `Olet suorittanut aine- ja perusopintoja ${aineJaPerusopintojenSuoritukset} noppaa.`,
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
        .map((data) =>
          luoTilastoaAineidenKeskiarvoista({ key: 'Sivuaineesi', data }),
        )
        .join('<br>'),
    });
  }

  arvioidaanOpintoVuodetDomiin(op);
  arvioidaanKäytetytOpiskelutunnit(op);
  prosentitKandilleTaiGradulle(op);
};
