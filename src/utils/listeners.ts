import { createCoursesArray, map } from './listUtils';
import { setLocalStorage } from './localStorage';

const setDuplikaattiKurssit = setLocalStorage<string[]>('duplikaattiKurssit');
const setPerusOpinnot = setLocalStorage<string[]>('perusOpinnot');
const setAineOpinnot = setLocalStorage<string[]>('aineOpinnot');
const setPääaine = setLocalStorage<string>('pääaine');
const setSivuaineet = setLocalStorage<string[]>('sivuaineet');

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

const kuunteleppaNapinpainalluksiaJuu = start => {
  const input = document.querySelector('button#kliketi-klik');
  if (input === null) {
    throw new Error('kuunteleppaNapinpainalluksiaJuu(): Input is null');
  }
  input.addEventListener('click', start);
};

const luoKurssiAvainListaTietokannasta = ({ kurssitietokanta, opinnot }) =>
  map(kurssitietokanta.tkt[opinnot], 'keys').reduce((a, b) => [...a, ...b], []);

const kuunteleJaEsitäytäAsijoitamme = ({
  name,
  kurssitietokanta,
  perusopinnot,
  aineopinnot,
  start,
}) => {
  const input = document.querySelector(`button#${name}`);
  if (input === null) {
    throw new Error(
      `kuunteleJaEsitäytäAsijoitamme(): Input with id "button#${name}" is null`,
    );
  }
  input.addEventListener('click', () => {
    setPerusOpinnot(
      luoKurssiAvainListaTietokannasta({
        kurssitietokanta,
        opinnot: perusopinnot,
      }),
    );
    setAineOpinnot(
      luoKurssiAvainListaTietokannasta({
        kurssitietokanta,
        opinnot: aineopinnot,
      }),
    );
    start();
  });
};

const kuunteleEsitäyttönapinKliksutteluja2017 = ({
  start,
  kurssitietokanta,
}) => {
  kuunteleJaEsitäytäAsijoitamme({
    start,
    kurssitietokanta,
    name: 'kliketi-klik-esitäyttö-2017',
    perusopinnot: 'perusopinnot',
    aineopinnot: 'aineopinnot',
  });
};

const kuunteleEsitäyttönapinKliksutteluja2016 = ({
  start,
  kurssitietokanta,
}) => {
  kuunteleJaEsitäytäAsijoitamme({
    start,
    kurssitietokanta,
    name: 'kliketi-klik-esitäyttö-pre-2017',
    perusopinnot: 'perusopinnotPre2017',
    aineopinnot: 'aineopinnotPre2017',
  });
};

export const kuunteleAsijoita = ({ start, kurssitietokanta }) => {
  kuunteleDuplikaattiInputtia();
  kuunteleppaNiitäPerusopintoja();
  tahtoisinVaanKuunnellaAineopintoja();
  jepulisKuuntelePääaineenMuutoksia();
  kuunteleSivuaineListanMuutoksia();
  kuunteleppaNapinpainalluksiaJuu(start);
  kuunteleEsitäyttönapinKliksutteluja2017({ start, kurssitietokanta });
  kuunteleEsitäyttönapinKliksutteluja2016({ start, kurssitietokanta });
};
