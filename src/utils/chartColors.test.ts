import 'mocha';

import { expect } from 'chai';

import chartColors from './chartColors';

describe('Chart colors', () => {
  it('Should return list of correct colors', () => {
    expect(chartColors).to.eql([
      'pink',
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'indigo',
      'purple',
    ]);
  });
});
