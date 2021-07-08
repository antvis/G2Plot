import { getScaleMax, getScaleIsStackMax } from '../../../../src/plots/radial-bar/utils';
import { antvStar } from '../../../data/antv-star';
import { populationMovementData as popData } from '../../../data/chord-population';

const yField = 'star';

const popField = {
  yField: 'value',
  xField: 'source',
};

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

  const popArr = popData
    .reduce((value, item) => {
      const valueItem = value.find((v) => v[popField.xField] === item[popField.xField]);
      if (valueItem) {
        valueItem[popField.yField] += item[popField.yField];
      } else {
        value.push({ ...item });
      }
      return value;
    }, [])
    .map((item) => item[popField.yField]);

  const isStackMaxValue = Math.max(...popArr);

  it('getScaleIsStackMax: normal', () => {
    expect(getScaleIsStackMax(360, popField.yField, popField.xField, popData)).toBe(isStackMaxValue);
    expect(getScaleIsStackMax(-300, popField.yField, popField.xField, popData)).toBe((isStackMaxValue * 360) / 300);
    expect(getScaleIsStackMax(660, popField.yField, popField.xField, popData)).toBe((isStackMaxValue * 360) / 300);
  });

  it('getScaleIsStackMax: existed nil value', () => {
    expect(
      getScaleIsStackMax(-300, popField.yField, popField.xField, [...popData, { source: 'c', value: undefined }])
    ).toBe((isStackMaxValue * 360) / 300);
    expect(getScaleIsStackMax(-300, popField.yField, popField.xField, [...popData, { source: 'c', value: null }])).toBe(
      (isStackMaxValue * 360) / 300
    );
  });

  it('getScaleIsStackMax: empty array', () => {
    expect(getScaleIsStackMax(360, popField.yField, popField.xField, [])).toBe(0);
  });
});
