import { distBetweenPoints } from '../../src/util/math';

describe('math 相关方法', () => {
  it.skip('计算两点间距离', () => {
    expect(distBetweenPoints({ x: 0, y: 10 }, { x: 0, y: 20 })).toBe(10);
    expect(distBetweenPoints({ x: 10, y: 10 }, { x: 0, y: 10 })).toBe(10);
    expect(distBetweenPoints({ x: 0, y: 3 }, { x: 4, y: 0 })).toBe(5);
  });
});
