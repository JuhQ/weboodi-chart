const toLowerCase = (str: string) => str.toLowerCase();

// TODO: add tests
const putsaaTeksti = (str: unknown) => {
  if (typeof str === 'string') {
    return str.replace(/&nbsp;/g, ' ').trim();
  }
  return '';
};

// TODO: add tests
const parsiLaitoksenKoodi = (lyhenne: string) =>
  lyhenne
    .replace(/^(ay|a)/i, '')
    .replace(/(-|_)[\d\D]+/i, '')
    .replace(/[\d]+/, '');

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

export {
  toLowerCase,
  putsaaTeksti,
  parsiLaitoksenKoodi,
  poistaAvoinKurssiNimestä,
  poistaSulut,
  poistaPilkut,
  poistaKaksoispisteet,
  poistaLiianLyhyetNimet,
  luoKivaAvainReducelle,
};
