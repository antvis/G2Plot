import { getScaleMax } from '../../../../src/plots/radial-bar/utils';

describe('utils of radial-bar', () => {
  const data = [
    { question: '问题 1', percent: 0.2 },
    { question: '问题 2', percent: 0.4 },
    { question: '问题 3', percent: 0.49 },
    { question: '问题 4', percent: 0.52 },
    { question: '问题 5', percent: 0.53 },
    { question: '问题 6', percent: 0.84 },
    { question: '问题 7', percent: 1.0 },
    { question: '问题 8', percent: 1.2 },
  ];
  it('getScaleMax: normal', () => {
    expect(getScaleMax(null, 'percent', data)).toBe((1.2 * 360) / 240);
    expect(getScaleMax(300, 'percent', data)).toBe((1.2 * 360) / 300);
    expect(getScaleMax(-300, 'percent', data)).toBe((1.2 * 360) / 300);
    expect(getScaleMax(660, 'percent', data)).toBe((1.2 * 360) / 300);
  });
});
