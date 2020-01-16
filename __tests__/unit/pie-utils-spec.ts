import { getEndPoint, getCenter, getOverlapArea } from '../../src/plots/pie/component/label/utils';

describe('test utils of pie label', () => {
  it('getEndPoint', () => {
    expect(getEndPoint({ x: 0, y: 0 }, 0, 4)).toEqual({ x: 4, y: 0 });
    expect(getEndPoint({ x: 0, y: 0 }, Math.PI, 4).x).toEqual(-4);
  });

  it('getCenter', () => {
    expect(getCenter({ x: 0, y: 0, width: 10, height: 10 })).toEqual({ x: 5, y: 5 });
    expect(getCenter({ x: -5, y: -5, width: 10, height: 10 })).toEqual({ x: 0, y: 0 });
  });

  it('getOverlapArea', () => {
    const box1 = { x: 0, y: 0, width: 30, height: 30 };
    const box2 = { x: 10, y: 10, width: 30, height: 30 };
    const box3 = { x: 40, y: 0, width: 30, height: 30 };
    const box4 = { x: -10, y: 0, width: 30, height: 30 };
    expect(getOverlapArea(box1, box2)).toBeGreaterThan(0);
    expect(getOverlapArea(box1, box3)).toBe(0);
    expect(getOverlapArea(box2, box3)).toBe(0);
    expect(getOverlapArea(box2, box4)).toBe(200);
  });
});
