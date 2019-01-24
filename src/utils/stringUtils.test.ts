import 'mocha';

import { expect } from 'chai';

import { toLowerCase } from './stringUtils';

describe('String utils', () => {
  describe('toLowerCase()', () => {
    it('Should lowercase a string correctly #!', () => {
      const result = toLowerCase('HelloWorld');
      expect(result).to.equal('helloworld');
    });

    it('Should return correct sum #2', () => {
      const result = toLowerCase('ABCDEF');
      expect(result).to.equal('abcdef');
    });

    it('Should return correct sum #3', () => {
      const result = toLowerCase('A');
      expect(result).to.equal('a');
    });
  });
});
