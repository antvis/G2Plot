import { getScaleMax, getStackedData } from '../../../../src/plots/radial-bar/utils';
import { antvStar } from '../../../data/antv-star';
import { populationMovementData as popData } from '../../../data/chord-population';

const yField = 'star';

describe('utils of radial-bar', () => {
  const starArr = antvStar.map((item) => item[yField]);
  const maxValue = Math.max(...starArr);

  it('getScaleMax: normal', () => {
    expect(getScaleMax(360, yField, antvStar)).toBe(maxValue);
    expect(getScaleMax(-300, yField, antvStar)).toBe((maxValue * 360) / 300);
    expect(getScaleMax(660, yField, antvStar)).toBe((maxValue * 360) / 300);
  });

  it('getScaleMax: existed nil value', () => {
    expect(getScaleMax(-300, yField, [...antvStar, { name: 'c', star: undefined }])).toBe((maxValue * 360) / 300);
    expect(getScaleMax(-300, yField, [...antvStar, { name: 'c', star: null }])).toBe((maxValue * 360) / 300);
  });

  it('getScaleMax: empty array', () => {
    expect(getScaleMax(360, yField, [])).toBe(0);
  });

  const data2 = [
    { date: '01-01', value: 10, type: 'type1' },
    { date: '01-02', value: 9, type: 'type1' },
    { date: '01-01', value: 5, type: 'type2' },
    { date: '01-02', value: 7, type: 'type2' },
  ];

  it('getStackedData: normal', () => {
    const stackedData = getStackedData(data2, 'date', 'value');
    expect(stackedData.length).toBe(2);
    expect(stackedData[0].date).toBe(data2[0].date);
    expect(stackedData[1].date).toBe(data2[1].date);
    expect(stackedData[0].value).toBe(15);
    expect(stackedData[1].value).toBe(16);
  });

  it('getScaleIsStackMax: existed nil value', () => {
    data2[2].value = null;
    let stackedData = getStackedData(data2, 'date', 'value');

    expect(stackedData.length).toBe(2);
    expect(stackedData[0].date).toBe(data2[0].date);
    expect(stackedData[1].date).toBe(data2[1].date);
    expect(stackedData[0].value).toBe(10);
    expect(stackedData[1].value).toBe(16);

    data2[2].value = undefined;
    stackedData = getStackedData(data2, 'date', 'value');

    expect(stackedData.length).toBe(2);
    expect(stackedData[0].value).toBe(10);
  });

  it('getScaleIsStackMax: empty array', () => {
    expect(getStackedData([], 'date', 'value').length).toBe(0);
  });
});
