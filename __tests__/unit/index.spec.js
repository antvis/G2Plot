import { expect } from 'chai';
import { Radar } from '../../src';

describe('Index', () => {
  it('export', () => {
    expect(Radar).to.be.a('function');
  });
});
