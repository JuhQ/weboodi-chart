import 'mocha';

import { expect } from 'chai';

import { add, average, sum } from './numberUtils';

describe('Number utils', () => {
  describe('add()', () => {
    it('Should return correct add #1', () => {
      expect(add(1, 2)).to.equal(3);
    });

    it('Should return correct add #2', () => {
      expect(add(0, 2)).to.equal(2);
    });

    it('Should return correct add #2', () => {
      expect(add(2, 0)).to.equal(2);
    });
  });

  describe('sum()', () => {
    it('Should sum values together', () => {
      expect(sum([1, 2])).to.equal(3);
      expect(sum([1, 2, 3])).to.equal(6);
    });
  });

  describe('average()', () => {
    it('Should return correct average #1', () => {
      expect(average([1, 2, 3])).to.equal(2);
    });

    it('Should return correct average #2', () => {
      expect(average([1, 0, 0])).to.equal(1 / 3);
    });
  });
});
