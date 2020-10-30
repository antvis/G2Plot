import { getScaleMax } from '../../../../src/plots/radial-bar/utils';
import { antvStar } from '../../../data/antv-star';

const yField = 'star';

describe('utils of radial-bar', () => {
  const starArr = antvStar.map((item) => item[yField]);
  const maxValue = Math.max(...starArr);
  it('getScaleMax: normal', () => {
    expect(getScaleMax(300, yField, antvStar)).toBe((maxValue * 360) / 300);
    expect(getScaleMax(-300, yField, antvStar)).toBe((maxValue * 360) / 300);
    expect(getScaleMax(660, yField, antvStar)).toBe((maxValue * 360) / 300);
  });
});
