import { getTotalValue } from '../../../../src/plots/pie/utils';

describe('utils of pie plot', () => {
  const data = [
    { type: 'item1', value: 10 },
    { type: 'item2', value: 10 },
    { type: 'item3', value: 10 },
  ];
  it('getTotalValue: normal', () => {
    expect(getTotalValue(data, 'value')).toBe(30);
    expect(getTotalValue([...data, { type: 'item4', value: -1 }], 'value')).toBe(29);
  });

  it('getTotalValue: with string', () => {
    expect(getTotalValue([...data.slice(0, 2), { type: 'item3', value: '10' }], 'value')).toBe(20);
  });

  it('getTotalValue: with null or undefined', () => {
    expect(getTotalValue([...data.slice(0, 2), { type: 'item3', value: null }], 'value')).toBe(20);
    expect(getTotalValue([...data.slice(0, 2), { type: 'item3', value: undefined }], 'value')).toBe(20);
    expect(
      getTotalValue(
        [
          { type: 'item1', value: null },
          { type: 'item3', value: null },
        ],
        'value'
      )
    ).toBe(null);
    expect(
      getTotalValue(
        [
          { type: 'item1', value: undefined },
          { type: 'item3', value: undefined },
        ],
        'value'
      )
    ).toBe(null);
    expect(
      getTotalValue(
        [
          { type: 'item1', value: null },
          { type: 'item3', value: undefined },
        ],
        'value'
      )
    ).toBe(null);
  });
});
