import { template } from '../../../src/utils/template';

describe('template', () => {
  it('template', () => {
    const data = { name: 'item1', value: 1, percentage: 0.23 };
    expect(template('{name}: {value}', data)).toBe('item1: 1');
    expect(template('{name}\n{value}', data)).toBe('item1\n1');
    expect(template('{name {value}', data)).toBe('{name 1');
    expect(template('{name} value}', data)).toBe('item1 value}');
    expect(template('{name}: {value}({percentage})', data)).toBe('item1: 1(0.23)');
    // 没有 match 的 data 原路返回
    expect(template('{name}: {value}({percentage1})', data)).toBe('item1: 1({percentage1})');
  });
});
