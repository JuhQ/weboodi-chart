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

export {
  toLowerCase,
  putsaaTeksti,
  parsiLaitoksenKoodi,
  luoKivaAvainReducelle,
};
