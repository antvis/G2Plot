import { ABSOLUTE_FIELD, DIFF_FIELD, IS_TOTAL, Y_FIELD } from '../../../../src/plots/waterfall/constants';
import { processData, transformData } from '../../../../src/plots/waterfall/utils';

describe('utils of waterfall', () => {
  it('processData: normal', () => {
    const data = [
      { type: '1', value: 10 },
      { type: '2', value: 5 },
    ];
    expect(processData(data, 'type', 'value', '$$value$$')).toEqual([
      { type: '1', value: 10, $$value$$: [0, 10] },
      { type: '2', value: 5, $$value$$: [10, 15] },
    ]);
    expect(processData(data, 'type', 'value', 'value', { label: '累计值' })).toEqual([
      { type: '1', value: [0, 10] },
      { type: '2', value: [10, 15] },
      { type: '累计值', value: [0, 15] },
    ]);
    expect(processData([...data, { type: '3', value: -25 }], 'type', 'value', 'value')).toEqual([
      { type: '1', value: [0, 10] },
      { type: '2', value: [10, 15] },
      { type: '3', value: [15, -10] },
    ]);
  });

  it('processData: with nil data', () => {
    const data = [
      { type: '1', value: 10 },
      { type: '2', value: 5 },
    ];
    expect(processData(data, 'type', 'value', 'value')).toEqual([
      { type: '1', value: [0, 10] },
      { type: '2', value: [10, 15] },
    ]);
    data.push({ type: '3', value: null });
    expect(processData(data, 'type', 'value', 'value')).toEqual([
      { type: '1', value: [0, 10] },
      { type: '2', value: [10, 15] },
      { type: '3', value: [15, 15] },
    ]);
    data[2].value = undefined;
    expect(processData(data, 'type', 'value', 'value')).toEqual([
      { type: '1', value: [0, 10] },
      { type: '2', value: [10, 15] },
      { type: '3', value: [15, 15] },
    ]);
  });

  it('transformData: without total', () => {
    const data = [
      { type: '1', value: 10 },
      { type: '2', value: 5 },
    ];
    expect(transformData(data, 'type', 'value')).toEqual([
      { type: '1', value: 10, [Y_FIELD]: [0, 10], [ABSOLUTE_FIELD]: 10, [DIFF_FIELD]: 10, [IS_TOTAL]: false },
      { type: '2', value: 5, [Y_FIELD]: [10, 15], [ABSOLUTE_FIELD]: 15, [DIFF_FIELD]: 5, [IS_TOTAL]: false },
    ]);
  });

  it('transformData: with total', () => {
    const data = [
      { type: '1', value: 10 },
      { type: '2', value: 5 },
    ];
    expect(transformData(data, 'type', 'value', { label: 'sum' })).toEqual([
      { type: '1', value: 10, [Y_FIELD]: [0, 10], [ABSOLUTE_FIELD]: 10, [DIFF_FIELD]: 10, [IS_TOTAL]: false },
      { type: '2', value: 5, [Y_FIELD]: [10, 15], [ABSOLUTE_FIELD]: 15, [DIFF_FIELD]: 5, [IS_TOTAL]: false },
      { type: 'sum', value: 15, [Y_FIELD]: [0, 15], [ABSOLUTE_FIELD]: 15, [DIFF_FIELD]: 15, [IS_TOTAL]: true },
    ]);
  });
});
