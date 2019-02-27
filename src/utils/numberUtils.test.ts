import 'mocha';

import { expect } from 'chai';

import { add, average, laskePainotettuKeskiarvo, sum } from './numberUtils';

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

  describe('laskePainotettuKeskiarvo()', () => {
    it('Should count painotettu keskiarvo when every entry has a grade', () => {
      expect(
        laskePainotettuKeskiarvo([
          { arvosana: 1, op: 5 },
          { arvosana: 2, op: 5 },
          { arvosana: 3, op: 5 },
          { arvosana: 4, op: 5 },
          { arvosana: 3, op: 5 },
        ]),
      ).to.equal('2.60');
    });

    it('Should count painotettu keskiarvo when every entry has a grade and one entry has 10 op', () => {
      expect(
        laskePainotettuKeskiarvo([
          { arvosana: 1, op: 5 },
          { arvosana: 2, op: 5 },
          { arvosana: 3, op: 5 },
          { arvosana: 4, op: 5 },
          { arvosana: 3, op: 10 },
        ]),
      ).to.equal('2.67');
    });

    it('Should count painotettu keskiarvo when one of the entries has hyv grade', () => {
      expect(
        laskePainotettuKeskiarvo([
          { arvosana: 1, op: 5 },
          { arvosana: 2, op: 5 },
          { arvosana: 'hyv', op: 5 },
          { arvosana: 4, op: 5 },
          { arvosana: 3, op: 5 },
        ]),
      ).to.equal('2.50');
    });

    it('Should return NaN when every grade is hyv', () => {
      expect(
        laskePainotettuKeskiarvo([
          { arvosana: 'hyv', op: 5 },
          { arvosana: 'hyv', op: 5 },
          { arvosana: 'hyv', op: 5 },
          { arvosana: 'hyv', op: 5 },
          { arvosana: 'hyv', op: 5 },
        ]),
      ).to.eql(NaN);
    });
  });
});
