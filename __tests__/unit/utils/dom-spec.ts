import { getContainerSize } from '../../../src/utils/dom';
import { createDiv } from '../../utils/dom';

const minDiv = createDiv();
minDiv.setAttribute('style', 'display: inline-block; width: 30px; height: 30px');

const maxDiv = createDiv();
maxDiv.id = 'max';
maxDiv.setAttribute('style', 'display: inline-block; width: 500px; height: 500px');

describe('util dom', () => {
  it('getChartSize', () => {
    expect(getContainerSize(minDiv)).toEqual({ width: 30, height: 30 });
    expect(getContainerSize(maxDiv)).toEqual({ width: 500, height: 500 });
    expect(getContainerSize(null)).toEqual({ width: 0, height: 0 });
  });
});
