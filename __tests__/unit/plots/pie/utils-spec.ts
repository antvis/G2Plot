import { adaptOffset, getTotalValue, isAllZero } from '../../../../src/plots/pie/utils';
import { processIllegalData } from '../../../../src/utils';

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

  it('offset adaptor', () => {
    expect(adaptOffset('inner', '-30%')).toBe('-30%');
    expect(parseFloat(adaptOffset('inner', '30%') as string)).toBeLessThan(0);
    expect(adaptOffset('inner', NaN)).not.toBe(NaN);
    expect(parseFloat(adaptOffset('inner', NaN) as string)).toBeLessThan(0);
    expect(adaptOffset('outer', '-30%')).not.toBe('-30%');
    expect(parseFloat(adaptOffset('outer', '-30%') as string)).not.toBeLessThan(0);
    expect(adaptOffset('spider', '30%')).toBe('30%');
    expect(adaptOffset('spider', NaN)).toBe(NaN);
  });

  it('过滤非法数据', () => {
    const data = [{ type: '1', value: 0 }];
    expect(processIllegalData(data, 'value')).toEqual(data);
    data.push({ type: '2', value: 1 });
    expect(processIllegalData(data, 'value')).toEqual(data);
    data.push({ type: '3', value: null });
    expect(processIllegalData(data, 'value')).toEqual(data);
    data.push({ type: '4', value: undefined });
    expect(processIllegalData(data, 'value')).toEqual(data.slice(0, 3));
    data.push({ type: '5', value: NaN });
    expect(processIllegalData(data, 'value')).toEqual(data.slice(0, 3));
  });

  it('判断是否全 0', () => {
    const data = [{ type: '1', value: 0 }];
    expect(isAllZero(data, 'value')).toBe(true);
    data.push({ type: '2', value: 0 });
    expect(isAllZero(data, 'value')).toBe(true);
    data.push({ type: '3', value: null });
    expect(isAllZero(data, 'value')).toBe(false);
    data.push({ type: '4', value: undefined });
    expect(isAllZero(data, 'value')).toBe(false);
  });
});
