import { processData } from '../../../../src/plots/waterfall/utils';

describe('utils of waterfall plot', () => {
  const data = [
    { type: 'item1', value: 100 },
    { type: 'item2', value: 200 },
    { type: 'item3', value: 300 },
  ];

  const itemWithString = { type: 'item4', value: '400' };
  const itemWithUndefined = { type: 'item4', value: undefined };

  it("get processData: normal, don't show totalLabel", () => {
    expect(processData(data, 'type', 'value', false, undefined)).toStrictEqual([
      { type: 'item1', value: [0, 100] },
      { type: 'item2', value: [100, 300] },
      { type: 'item3', value: [300, 600] },
    ]);
  });

  it('get processData: normal, show totalLabel', () => {
    expect(processData(data, 'type', 'value', true, '总费用')).toStrictEqual([
      { type: 'item1', value: [0, 100] },
      { type: 'item2', value: [100, 300] },
      { type: 'item3', value: [300, 600] },
      { type: '总费用', value: [0, 600] },
    ]);
  });

  it('get processData: with string, show totalLabel', () => {
    expect(processData([...data, itemWithString], 'type', 'value', true, '总费用')).toStrictEqual([]);
  });

  it('get processData: with undefined, show totalLabel', () => {
    expect(processData([...data, itemWithUndefined], 'type', 'value', true, '总费用')).toStrictEqual([]);
  });
});
