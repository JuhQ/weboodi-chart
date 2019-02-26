import 'mocha';

import { expect } from 'chai';

import {
  contains,
  findPvm,
  map,
  mapInvoke,
  max,
  min,
  notEmpty,
  notEmptyList,
  sort,
} from './listUtils';

describe('List utils', () => {
  describe('notEmpty()', () => {
    it('Should return false if a string is empty', () => {
      expect(notEmpty('')).to.equal(false);
    });

    it('Should return true if a string is not empty', () => {
      expect(notEmpty('Hello')).to.equal(true);
    });
  });

  describe('notEmptyList()', () => {
    it('Should return false if a list is empty', () => {
      expect(notEmptyList([])).to.equal(false);
    });

    it('Should return true if a list is not empty', () => {
      expect(notEmptyList(['a'])).to.equal(true);
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

  describe('findPvm()', () => {
    it('Should find a value', () => {
      expect(findPvm([{ pvm: '2019' }], '2019')).to.eql({ pvm: '2019' });
    });

    it('Should not find a value', () => {
      expect(findPvm([{ pvm: '2019' }], '2020')).to.eql(undefined);
    });
  });
});
