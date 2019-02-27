import { kurssitietokanta } from '../data/courses';
import { isArray } from './validators';

const toLowerCase = (str: string) => str.toLowerCase();

// TODO: add tests
const putsaaTeksti = (str: unknown) =>
  typeof str === 'string' ? str.replace(/&nbsp;/g, ' ').trim() : '';

export const searchForCourseFromList = ({ acc, db, key, lyhenne }) =>
  !acc.length &&
  isArray(db[key]) &&
  db[key].find(({ keys }) =>
    keys.map(toLowerCase).includes(toLowerCase(lyhenne)),
  );

const findLaitos = ({ db, lyhenne, initial = '', parentKey = '' }) =>
  Object.keys(db).reduce((acc, key) => {
    const courseFound = searchForCourseFromList({ acc, db, key, lyhenne });

    return (
      acc ||
      (courseFound || isArray(db[key])
        ? courseFound
          ? parentKey
          : acc
        : findLaitos({
          db: db[key],
          lyhenne,
          initial: acc,
          parentKey: key,
        }))
    );
  }, initial);

// TODO: add tests
const parsiLaitoksenKoodi = (lyhenne: string) => {
  const lyhennettyLyhenne = lyhenne
    .replace(/^(ay|a)/i, '')
    .replace(/(-|_)[\d\D]+/i, '')
    .replace(/[\d]+/, '');

  if (!lyhennettyLyhenne.length) {
    const hakutulos = findLaitos({
      db: kurssitietokanta,
      lyhenne,
    });
    if (!hakutulos) {
      console.info('ei hakutulosta lyhenteelle', lyhenne);
    }
    return hakutulos || '';
  }

  return lyhennettyLyhenne;
};

// TODO: add tests
const getLaitos = lyhenne => {
  const laitoksenKoodi = parsiLaitoksenKoodi(lyhenne);

  return (laitoksenKoodi.length ? laitoksenKoodi : 'emt').toUpperCase();
};

// TODO: add tests
const luoKivaAvainReducelle = (pvmDate: Date) => {
  const vuosi = pvmDate.getFullYear();
  const kuukausi = pvmDate.toLocaleString('fi', { month: 'long' });

  return `${kuukausi} ${vuosi}`;
};

// TODO: add tests
const poistaAvoinKurssiNimestä = (kurssi: string) =>
  kurssi
    .replace('Avoin yo:', '')
    .replace('Open uni:', '')
    .trim();

// TODO: add tests
const poistaSulut = (str: string) => str.replace(/\(|\)/g, '').trim();

// TODO: add tests
const poistaPilkut = (str: string) => str.replace(',', '').trim();
// TODO: add tests
const poistaKaksoispisteet = (str: string) => str.replace(':', '').trim();

const liianLyhytNimiSanaPilveen = 2;

// TODO: add tests
const poistaLiianLyhyetNimet = (str: string) =>
  str.length > liianLyhytNimiSanaPilveen;

// TODO: add tests
const nameIncludesAvoinYo = (name: string) =>
  name.includes('avoin yo') || name.includes('open uni');

export {
  toLowerCase,
  putsaaTeksti,
  poistaAvoinKurssiNimestä,
  poistaSulut,
  nameIncludesAvoinYo,
  getLaitos,
  poistaPilkut,
  poistaKaksoispisteet,
  poistaLiianLyhyetNimet,
  luoKivaAvainReducelle,
};
