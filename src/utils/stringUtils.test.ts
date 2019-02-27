import 'mocha';

import { expect } from 'chai';

import {
  getLaitos,
  luoKivaAvainReducelle,
  nameIncludesAvoinYo,
  poistaAvoinKurssiNimestä,
  poistaKaksoispisteet,
  poistaLiianLyhyetNimet,
  poistaPilkut,
  poistaSulut,
  putsaaTeksti,
  toLowerCase,
} from './stringUtils';

describe('String utils', () => {
  describe('toLowerCase()', () => {
    it('Should lowercase a string correctly #1', () => {
      expect(toLowerCase('HelloWorld')).to.equal('helloworld');
    });

    it('Should return correct sum #2', () => {
      expect(toLowerCase('ABCDEF')).to.equal('abcdef');
    });

    it('Should return correct sum #3', () => {
      expect(toLowerCase('A')).to.equal('a');
    });
  });

  describe('poistaAvoinKurssiNimestä()', () => {
    it('Should remove open university name from finnish name', () => {
      expect(poistaAvoinKurssiNimestä('Avoin yo: Testaan')).to.equal('Testaan');
    });

    it('Should remove open university name from english name', () => {
      expect(poistaAvoinKurssiNimestä('Open uni: Testaan')).to.equal('Testaan');
    });
  });

  describe('poistaSulut()', () => {
    it('Should remove brackets from string', () => {
      expect(poistaSulut('jepa(jee)')).to.equal('jepajee');
    });
  });

  describe('poistaPilkut()', () => {
    it('Should remove commas from string', () => {
      expect(poistaPilkut('jepa, jee')).to.equal('jepa jee');
    });
  });

  describe('poistaKaksoispisteet()', () => {
    it('Should remove colon from string', () => {
      expect(poistaKaksoispisteet('jepa: jee')).to.equal('jepa jee');
    });
  });

  describe('poistaLiianLyhyetNimet()', () => {
    it('Should return true when too short name', () => {
      expect(poistaLiianLyhyetNimet('jee')).to.equal(true);
    });

    it('Should return false when long enough name', () => {
      expect(poistaLiianLyhyetNimet('jeepulis jee')).to.equal(true);
    });
  });

  describe('nameIncludesAvoinYo()', () => {
    it('Should return true if string contains finnish open uni name', () => {
      expect(nameIncludesAvoinYo('Avoin yo: Testaan')).to.equal(true);
    });

    it('Should return true if string contains english open uni name', () => {
      expect(nameIncludesAvoinYo('Open uni: Testaan')).to.equal(true);
    });

    it('Should return false if string does not contain open uni name', () => {
      expect(nameIncludesAvoinYo('Testaan')).to.equal(false);
    });
  });

  describe('luoKivaAvainReducelle()', () => {
    it('Should return key for reduce :D', () => {
      expect(luoKivaAvainReducelle(new Date(1551294958470))).to.equal(
        'February 2019',
      );
    });
  });

  describe('putsaaTeksti()', () => {
    it('Should not remove anything when string is ok', () => {
      expect(putsaaTeksti('jee')).to.equal('jee');
    });

    it('Should trim whitespace from text', () => {
      expect(putsaaTeksti('jee ')).to.equal('jee');
      expect(putsaaTeksti(' jee ')).to.equal('jee');
      expect(putsaaTeksti(' jee')).to.equal('jee');
    });

    it('Should remove &nbsp; from text', () => {
      expect(putsaaTeksti('jee&nbsp;jee')).to.equal('jee jee');
    });

    it('Should remove &nbsp; from text beginning', () => {
      expect(putsaaTeksti('&nbsp;jee')).to.equal('jee');
    });

    it('Should remove &nbsp; from text end', () => {
      expect(putsaaTeksti('jee&nbsp;')).to.equal('jee');
    });

    it('Should remove &nbsp; from text beginning and end', () => {
      expect(putsaaTeksti('&nbsp;jee&nbsp;')).to.equal('jee');
    });

    it('Should remove &nbsp; from text beginning, end and middle', () => {
      expect(putsaaTeksti('&nbsp;jepa&nbsp;jee&nbsp;')).to.equal('jepa jee');
    });

    it('Should return empty string when invalid value is passed', () => {
      expect(putsaaTeksti('')).to.equal('');
      expect(putsaaTeksti(0)).to.equal('');
      expect(putsaaTeksti(undefined)).to.equal('');
      expect(putsaaTeksti(null)).to.equal('');
      expect(putsaaTeksti([])).to.equal('');
    });
  });

  describe('getLaitos()', () => {
    it('Should not find department based on course code which does not exist in the course db', () => {
      expect(getLaitos('-100000000000')).to.equal('EMT');
    });

    it('Should find tkt', () => {
      expect(getLaitos('TKT1000')).to.equal('TKT');
    });

    it('Should find department from course name which does not have letters', () => {
      expect(getLaitos('581305')).to.equal('TKT');
    });
  });
});
