import 'mocha';

import { expect } from 'chai';

import { average, sum } from './numberUtils';

describe('Number utils', () => {
  describe('sum()', () => {
    it('Should return correct sum #1', () => {
      expect(sum(1, 2)).to.equal(3);
    });

    it('Should return correct sum #2', () => {
      expect(sum(0, 2)).to.equal(2);
    });

    it('Should return correct sum #2', () => {
      expect(sum(2, 0)).to.equal(2);
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
