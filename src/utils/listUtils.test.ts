import 'mocha';

import { expect } from 'chai';

import { ConvertedCourse } from '../interfaces/Interfaces';
import {
  atleastThreeItemsInList,
  contains,
  createCoursesArray,
  findFromKurssiTietokanta,
  findOpintoByLyhenne,
  findPvm,
  laskeStuffistaHalututJutut,
  map,
  mapInvoke,
  max,
  min,
  notEmpty,
  partition,
  sort,
  sorttaaStuffLukukausienMukaan,
  takeUntil,
} from './listUtils';
import { isTruthy } from './validators';

describe('List utils', () => {
  describe('notEmpty()', () => {
    describe('String', () => {
      it('Should return false if a string is empty', () => {
        expect(notEmpty('')).to.equal(false);
      });

      it('Should return true if a string is not empty', () => {
        expect(notEmpty('Hello')).to.equal(true);
      });
    });

    describe('List', () => {
      it('Should return false if a list is empty', () => {
        expect(notEmpty([])).to.equal(false);
      });

      it('Should return true if a list is not empty', () => {
        expect(notEmpty(['a'])).to.equal(true);
      });
    });
  });

  describe('map()', () => {
    it('Should return correct object values #1', () => {
      expect(map([{ moi: 1 }, { moi: 2 }], 'moi')).to.eql([1, 2]);
    });

    it('Should return correct object values #2', () => {
      expect(map([{ moi: 1 }, { moi: '2' }], 'moi')).to.eql([1, '2']);
    });

    it('Should return correct object values #3', () => {
      expect(map([{ moi: 2 }, { ok: 3, jou: 4 }], 'moi')).to.eql([
        2,
        undefined,
      ]);
    });

    it('Should return correct object values #4', () => {
      expect(map([{ moi: 2 }, { ok: 3, jou: 4 }], ['moi', 'jou'])).to.eql([
        2,
        undefined,
        undefined,
        4,
      ]);
    });
  });

  describe('max()', () => {
    it('Should return correct maximum value #1', () => {
      expect(max([1, 2, 3])).to.equal(3);
    });

    it('Should return correct maximum value #2', () => {
      expect(max([-1, 20, 3])).to.equal(20);
    });

    it('Should return correct maximum value #3', () => {
      expect(max([0, 0, 0])).to.equal(0);
    });

    it('Should return correct maximum value #3', () => {
      expect(max([999, 0, -100])).to.equal(999);
    });
    it('Should return correct maximum value #4', () => {
      expect(max([1, 2, 3.2])).to.equal(3.2);
    });
  });

  describe('min()', () => {
    it('Should return correct minimum value #1', () => {
      expect(min([1, 2, 3])).to.equal(1);
    });

    it('Should return correct minimum value #2', () => {
      expect(min([-1, 20, 3])).to.equal(-1);
    });

    it('Should return correct minimum value #3', () => {
      expect(min([0, 0, 0])).to.equal(0);
    });

    it('Should return correct minimum value #3', () => {
      expect(min([999, 0, -100])).to.equal(-100);
    });

    it('Should return correct minimum value #4', () => {
      expect(min([1, 2, 0.2])).to.equal(0.2);
    });
  });

  describe('contains()', () => {
    it('Should return return true when list contains a value', () => {
      expect(contains([1, 2, 3], 1)).to.equal(true);
    });

    it('Should return return false when list does not contain a value', () => {
      expect(contains([1, 2, 3], 10)).to.equal(false);
    });
  });

  describe('mapInvoke()', () => {
    it('Should return list of uppercase strings', () => {
      expect(mapInvoke(['one', 'two'], 'toUpperCase')).to.eql(['ONE', 'TWO']);
    });

    it('Should iterate list of objects and call their methods', () => {
      expect(
        mapInvoke(
          [{ doCoolStuff: () => 1 }, { doCoolStuff: () => 2 }],
          'doCoolStuff',
        ),
      ).to.eql([1, 2]);
    });
  });

  describe('sort()', () => {
    it('Should return a sorted list', () => {
      expect(sort([{ a: 1 }, { a: -1 }, { a: 10 }], 'a')).to.eql([
        { a: 10 },
        { a: 1 },
        { a: -1 },
      ]);
    });

    it('Should not mutate original list', () => {
      const list = [{ a: 1 }, { a: -1 }, { a: 10 }];
      expect(sort(list, 'a')).not.to.eql(list);
    });
  });

  const pvmTestData = {
    pvm: '2019',
    kurssi: '',
    op: 0,
    lyhenne: '',
    arvosana: 0,
    luennoitsija: '',
    pvmDate: new Date(),
  };

  describe('findPvm()', () => {
    it('Should find a value', () => {
      expect(findPvm([pvmTestData], '2019')).to.eql({
        pvm: '2019',
      });
    });

    it('Should not find a value', () => {
      expect(findPvm([pvmTestData], '2020')).to.eql(undefined);
    });
  });

  describe('atleastThreeItemsInList()', () => {
    it('Should return true when there are more than three items in list', () => {
      expect(atleastThreeItemsInList([1, 2, 3, 4])).to.equal(true);
    });

    it('Should return false when there are three items in list', () => {
      expect(atleastThreeItemsInList([1, 2, 3])).to.equal(false);
    });

    it('Should return false when there are less than three items in list', () => {
      expect(atleastThreeItemsInList([1, 2])).to.equal(false);
    });

    it('Should return false when the list is empty', () => {
      expect(atleastThreeItemsInList([])).to.equal(false);
    });
  });

  describe('findOpintoByLyhenne()', () => {
    it('Should find a row', () => {
      expect(
        findOpintoByLyhenne({ opinnot: [{ lyhenne: 'jep' }], lyhenne: 'jep' }),
      ).to.eql({ lyhenne: 'jep' });
    });

    it('Should not find a row', () => {
      expect(
        findOpintoByLyhenne({ opinnot: [{ lyhenne: 'juu' }], lyhenne: 'jep' }),
      ).to.equal(undefined);
    });

    it('Should not find anything from an empty list', () => {
      expect(findOpintoByLyhenne({ opinnot: [], lyhenne: 'jep' })).to.equal(
        undefined,
      );
    });
  });

  describe('partition()', () => {
    it('Should partion a list with isTruthy', () => {
      expect(partition([true, false], isTruthy)).to.eql([[false], [true]]);
    });
  });

  describe('takeUntil()', () => {
    it('Should return first three items from list', () => {
      expect(takeUntil([1, 2, 3, 4, 5], 3)).to.eql([1, 2, 3]);
    });
  });

  const daa = {
    arvosana: 0,
    op: 0,
    cumulativeOp: 0,
    kurssi: '',
    lyhenne: '',
    luennoitsija: '',
    pvm: '',
    painotettuKeskiarvo: 0,
    keskiarvo: 0,
  };

  describe('sorttaaStuffLukukausienMukaan()', () => {
    it('Should do something here', () => {
      expect(
        sorttaaStuffLukukausienMukaan(
          {
            pvmDate: new Date(1551294958470),
            ...daa,
          },
          {
            pvmDate: new Date(1551294933470),
            ...daa,
          },
        ),
      ).to.equal(25000);
    });
  });

  describe('laskeStuffistaHalututJutut()', () => {
    it('Should do something with this too', () => {
      expect(
        laskeStuffistaHalututJutut({
          stuff: [{ op: 1 }, { op: 2 }, { op: 2 }],
          key: 'op',
        }),
      ).to.eql({ 1: 1, 2: 2 });
    });
  });

  describe('createCoursesArray()', () => {
    it('Should create a list based on given values separated by a comma', () => {
      expect(createCoursesArray({ value: 'jepa, jee' })).to.eql([
        'jepa',
        'jee',
      ]);
    });
  });

  describe('findFromKurssiTietokanta()', () => {
    it('Should find a course name based on the code', () => {
      expect(
        findFromKurssiTietokanta({
          db: {
            tkt: {
              perusopinnot: [
                {
                  name: 'Johdatus tietojenkäsittelytieteeseen',
                  keys: ['TKT10001', 'AYTKT10001', '582102', 'A582102'],
                },
              ],
            },
          },
          lyhenne: 'TKT10001',
        }),
      ).to.equal('Johdatus tietojenkäsittelytieteeseen');
    });

    it('Should not find a course name based on the code that does not exist', () => {
      expect(
        findFromKurssiTietokanta({
          db: {
            tkt: {
              perusopinnot: [
                {
                  name: 'Johdatus tietojenkäsittelytieteeseen',
                  keys: ['TKT10001', 'AYTKT10001', '582102', 'A582102'],
                },
              ],
            },
          },
          lyhenne: 'SOMETHING_ELSE',
        }),
      ).to.equal('');
    });
  });
});
