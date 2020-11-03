import { getSplinePath } from '../../../src/utils/path';

describe('PathUtil', () => {
  test('getSplinePath(), two points', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 0.1, y: 0.1 },
    ];
    const path = getSplinePath(points);
    expect(path).toEqual([
      ['M', 0, 0],
      ['L', 0.1, 0.1],
    ]);
  });

  test('getSplinePath(), two points isInCircle', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 0.1, y: 0.1 },
    ];
    const path = getSplinePath(points, true);
    expect(path).toEqual([['M', 0, 0], ['L', 0.1, 0.1], ['Z']]);
  });

  test('getSplinePath(), more than two points', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 0.1, y: 0.5 },
      { x: 0.2, y: 0.1 },
    ];
    const path = getSplinePath(points);
    expect(path.length).toBe(3);
  });

  test('getSplinePath(), more than two points isInCircle', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 0.1, y: 0.1 },
      { x: 0.1, y: 0.3 },
    ];
    const path = getSplinePath(points, true);
    expect(path.length).toBe(4);
  });
});
