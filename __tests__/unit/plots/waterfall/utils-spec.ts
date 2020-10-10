import { processData } from '../../../../src/plots/waterfall/utils';

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
    expect(processData(data, 'type', 'value', 'value', '累计值')).toEqual([
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
});
