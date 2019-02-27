import 'mocha';

import { expect } from 'chai';

import {
  isArray,
  isFloat,
  isInBetween,
  isString,
  isTruthy,
} from './validators';

describe('Validators', () => {
  describe('isString()', () => {
    it('Should return true if the parameter is a string', () => {
      expect(isString('Hello')).to.equal(true);
    });

    it('Should return false when a number is passed', () => {
      expect(isString(42)).to.equal(false);
    });

    it('Should return false an object is passed', () => {
      expect(isString({})).to.equal(false);
    });

    it('Should return false when undefined is passed', () => {
      expect(isString(undefined)).to.equal(false);
    });
  });

  describe('isFloat()', () => {
    it('Should return true if the parameter is a float', () => {
      expect(isFloat(0.25)).to.equal(true);
    });

    it('Should return false if the parameter is not a float', () => {
      expect(isFloat(42)).to.equal(false);
    });
  });
  describe('isArray()', () => {
    it('Should return true if the parameter is an array', () => {
      expect(isArray([1, 2, 3, 4])).to.equal(true);
    });

    it('Should return true when an empty array is passed', () => {
      expect(isArray([])).to.equal(true);
    });

    it('Should return false when an object is passed', () => {
      expect(isArray({})).to.equal(false);
    });

    it('Should return false when number is passed', () => {
      expect(isArray(42)).to.equal(false);
    });

    it('Should return false when undefined is passed', () => {
      expect(isArray(undefined)).to.equal(false);
    });
  });
  describe('isTruthy()', () => {
    it('Should return true if the parameter is truthy', () => {
      expect(isTruthy(true)).to.equal(true);
    });

    it('Should return false if the parameter is falsy', () => {
      expect(isTruthy(false)).to.equal(false);
      expect(isTruthy(undefined)).to.equal(false);
      expect(isTruthy(0)).to.equal(false);
    });

    it('Should return true if the parameter is truthy #1', () => {
      expect(['jee'].filter(isTruthy)).to.eql(['jee']);
    });

    it('Should return true if the parameter is truthy #2', () => {
      expect([true].filter(isTruthy)).to.eql([true]);
    });

    it('Should return false if the parameter is not truthy #1', () => {
      expect([false].filter(isTruthy)).to.eql([]);
    });

    it('Should return false if the parameter is not truthy #2', () => {
      expect([undefined].filter(isTruthy)).to.eql([]);
    });

    it('Should return false if the parameter is not truthy #3', () => {
      expect([0].filter(isTruthy)).to.eql([]);
    });
  });

  describe('isInBetween()', () => {
    it('Should return true when given date objects are between given date', () => {
      expect(
        isInBetween({
          value: new Date(1551294958470),
          values: [new Date(1551294910000), new Date(1551295000000)],
        }),
      ).to.equal(true);
    });

    it('Should return false when given date objects are not between given date', () => {
      expect(
        isInBetween({
          value: new Date(551294958470),
          values: [new Date(1551294910000), new Date(1551295000000)],
        }),
      ).to.equal(false);
    });
  });
});
